import {
  Observable,
  Subscription,
  delay,
  distinctUntilChanged,
  filter,
  first,
  map,
  skip,
  switchMap,
  withLatestFrom,
} from 'rxjs';
import { MovingDirection, CharacterDirection } from '@shared';

import { actions } from '@core/actions';
import { grid64 } from '@core/grid';
import { collisions } from '@core/collisions';
import { IFightingCharacter } from '@abilities/fighting';
import { PathFinder } from '@core/pathfinder';
import { SIZE_X, SIZE_Y } from '@common/common.const';
import { EnemyState, Errors } from './AI.const';

import type { IMovingCharacter } from '@abilities/moving';
import type { TCollisionArea, TPixelsCoords } from '@abilities/abilities.types';
import type { TTiledCoords } from '@common/common.types';
import type { IAIControllerProps } from './AI.types';

export class AIController {
  private _id: string | number;
  private _character: IMovingCharacter & IFightingCharacter;
  private _heroes$: Observable<Array<IMovingCharacter & IFightingCharacter>>;
  private _hero$: Observable<IMovingCharacter & IFightingCharacter>;
  private _bounds$: Observable<Array<TCollisionArea>>;
  private _boundsTiledCoords$: Observable<Array<TTiledCoords>>;
  private _enemyArea$: Observable<TTiledCoords>;
  private _ignoreMovements = false;
  private _state: EnemyState = EnemyState.IDLING;

  private _partollingSubscription: Subscription;
  private _chasingSubscription: Subscription;
  private _heroMovementSubscription: Subscription;

  private _pathFinder: PathFinder;

  constructor({
    heroes$,
    hero$,
    bounds$,
    chaser,
    id,
    character,
    streamDecorator = (movements$: Observable<MovingDirection>) => movements$,
  }: IAIControllerProps) {
    this._id = id;
    this._heroes$ = heroes$;
    this._character = character;
    this._hero$ = hero$;
    this._bounds$ = bounds$;
    this._boundsTiledCoords$ = this._bounds$.pipe(
      map((coords: Array<TPixelsCoords>) => coords.map((coords: TPixelsCoords) => grid64.transformToTiles(...coords))),
    );
    this._enemyArea$ = this._character.moving.breakpoints$.pipe(
      map(() => grid64.transformToTiles(...this._character.moving.getCollisionArea())),
    );

    if (chaser) {
      this._state = EnemyState.CHASING;
    }

    this._initPathFinder();
    this._initDeathListener();
    this._initHeroesUpdateListener();

    this._partollingSubscription = streamDecorator(this._getDirectionsStream()).subscribe(
      (direction: MovingDirection) => {
        this._character.moving.moveTo(direction);
      },
    );

    this._heroMovementSubscription = this._getHeroMovementsStream()
      .pipe(withLatestFrom(this._enemyArea$))
      .subscribe(this._handleHeroMovement);
  }

  /**
   * Stops previous character's chasing and starts new chasing
   *
   * @param {[TTiledCoords, TTiledCoords]} params — Array of values from streams: hero areas, enemy areas
   * @returns {this} Current AIController instance
   */
  private _handleHeroMovement = ([heroArea, enemyArea]: [TTiledCoords, TTiledCoords]) => {
    if (this._chasingSubscription) {
      this._chasingSubscription.unsubscribe();
    }

    /**
     * Wait until character stops moving to calculate path correctly
     */
    this._character.moving.breakpoints$.pipe(first(), delay(1000)).subscribe(() => {
      this._chasingSubscription = this._chase(heroArea, enemyArea);
    });

    return this;
  };

  /**
   * Creates stream of directions from server for this specific character
   *
   * @returns {Observable<MovingDirection>} Stream of directions from server
   */
  private _getDirectionsStream(): Observable<MovingDirection> {
    return actions.updateEnemyListener().pipe(
      filter(() => this._state === EnemyState.IDLING),
      filter((enemy) => enemy.id === this._id && enemy.hasOwnProperty('direction') && !this._ignoreMovements),
      map((enemy) => enemy.direction),
    );
  }

  /**
   * Creates a stream chased hero fighting areas, which are update on every movement
   *
   * @returns {Observable<TTiledCoords>} Stream of chased hero fighting areas
   */
  private _getHeroMovementsStream(): Observable<TTiledCoords> {
    return this._hero$.pipe(
      filter(() => this._state === EnemyState.CHASING),
      switchMap((hero: IMovingCharacter) => hero.moving.breakpoints$),
      distinctUntilChanged(),
      skip(1),
      switchMap(() => this._hero$),
      map((hero: IFightingCharacter) => grid64.transformToTiles(...hero.fighting.getAffectedArea())),
    );
  }

  /**
   * Subscribes to heroes updates and handles it
   *
   * @returns {Subscription} Heroes updates subscription
   */
  private _initHeroesUpdateListener(): Subscription {
    return this._heroes$.subscribe((heroes) => {
      for (const hero of heroes) {
        hero.moving.breakpoints$.subscribe(() => {
          this._handleHeroFighting(hero);
        });
      }
    });
  }

  /**
   * Initialize listener of character's death, unsubscribing all subscriptions
   *
   * @returns {Subscription} Character's death subscription
   */
  private _initDeathListener(): Subscription {
    return this._character.fighting.isDied$.pipe(first()).subscribe(() => {
      this._partollingSubscription.unsubscribe();
      this._heroMovementSubscription.unsubscribe();
      this._chasingSubscription.unsubscribe();
    });
  }

  /**
   * Initialize PathFinder module when bounds are changed
   *
   * @returns {Subscription} Bounds changing subscription
   */
  private _initPathFinder(): Subscription {
    return this._boundsTiledCoords$.subscribe((bounds: Array<TTiledCoords>) => {
      this._pathFinder = new PathFinder({ width: SIZE_X, height: SIZE_Y, bounds });
    });
  }

  /**
   * Makes character to start chasing hero until hero is reached
   *
   * @param {TTiledCoords} heroArea — Hero's fighting tiled area
   * @param {TTiledCoords} enemyArea — Character's collision tiled area
   * @returns {Subscription} Character's breakpoints subscription
   */
  private _chase(heroArea: TTiledCoords, enemyArea: TTiledCoords): Subscription | undefined {
    const enemy = this._character;
    const commands = this._getPathDirections(enemyArea, heroArea);

    if (!commands) {
      return;
    }

    this._state = EnemyState.CHASING;

    return enemy.moving.breakpoints$.pipe(distinctUntilChanged()).subscribe(() => {
      if (commands.length === 0) {
        return;
      }

      const command = commands.shift()!;

      enemy.moving.moveTo(command);
      /**
       * Когда герой двигается, посылаем команду остановиться, чтобы он не ушел дальше следующего тайла
       */
      setTimeout(() => enemy.moving.moveTo(MovingDirection.IDLE), 50);
    });
  }

  /**
   * Creates an array of commands to reach the destination tile
   *
   * @param {TTiledCoords} from — Start tile
   * @param {TTiledCoords} to — Destination tile
   * @returns Array of directions to reach the destination tile or null
   */
  private _getPathDirections(from: TTiledCoords, to: TTiledCoords): Array<MovingDirection> {
    try {
      if (!this._pathFinder) {
        throw new Error(Errors.NO_PATH_FINDER);
      }

      return this._pathFinder.getDirections(from, to);
    } catch {
      return null;
    }
  }

  /**
   * Check if there's collision with the hero and makes character to attack him
   *
   * @param {IMovingCharacter} hero — Heroes, who are intended to be defeated
   * @returns {this}Current AIController instance
   */
  private _handleHeroFighting(hero: IMovingCharacter): this {
    this._ignoreMovements = false;

    const enemy = this._character;
    const enemyHasAttackCollision = collisions.hasCollision(
      enemy.fighting.getAffectedArea(),
      hero.moving.getCollisionArea(),
    );

    if (enemyHasAttackCollision) {
      this._ignoreMovements = true;
      this._attackWithDelay(enemy, 500);

      return this;
    }

    const enemyArea = enemy.moving.getCollisionArea();
    const enemyBackArea: TPixelsCoords = [
      enemy.moving.isRightDirection ? grid64.getPrevPixels(enemyArea[0]) : grid64.getNextPixels(enemyArea[0]),
      enemyArea[1],
      enemyArea[2],
      enemyArea[3],
    ];

    const enemyHasBackCollision = collisions.hasCollision(enemyBackArea, hero.moving.getCollisionArea());

    if (enemyHasBackCollision) {
      this._character.moving.moveTo(MovingDirection.IDLE);
      enemy.moving.setCharacterDirection(
        enemy.moving.isRightDirection ? CharacterDirection.LEFT : CharacterDirection.RIGHT,
      );
      this._ignoreMovements = true;
      this._attackWithDelay(enemy, 500);
    }

    return this;
  }

  /**
   * Makes current character attack with a delay
   *
   * @param {IFightingCharacter} enemy — Current enemy
   * @param {number} ms — Delay time
   */
  private _attackWithDelay(enemy: IFightingCharacter, ms: number) {
    setTimeout(() => enemy.fighting.attack(), ms);
  }
}
