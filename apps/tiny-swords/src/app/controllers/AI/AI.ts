import { MovingDirection, CharacterDirection } from '@shared';
import {
  Observable,
  Subscription,
  distinctUntilChanged,
  filter,
  first,
  map,
  skip,
  switchMap,
  withLatestFrom,
} from 'rxjs';
import { collisions } from '../../core/collisions';
import { actions, grid64 } from '../../core';
import { TCollisionArea, TPixelsCoords } from '../../abilities/abilities.types';
import { IAIControllerProps } from './AI.types';
import { IMovingCharacter } from '../../abilities/moving/moving.types';
import { IFightingCharacter } from '../../abilities/fighting/fighting.types';
import { EnemyState } from './AI.const';
import { TTiledCoords } from '../../common/common.types';
import { PathFinder } from '../../core/pathfinder';
import { SIZE_X, SIZE_Y } from '../../common/common.const';

export class AIController {
  private _character: IMovingCharacter & IFightingCharacter;
  private _heroes$: Observable<Array<IMovingCharacter & IFightingCharacter>>;
  private _hero$: Observable<IMovingCharacter & IFightingCharacter>;
  private _bounds$: Observable<Array<TCollisionArea>>;
  private _boundsTiledCoords$: Observable<Array<TTiledCoords>>;
  private _enemyArea$: Observable<TTiledCoords>;
  private _ignoreMovements = false;
  private _state: EnemyState = EnemyState.IDLE;

  private _idlingSubscription: Subscription;
  private _chasingSubscription: Subscription;

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
    this._heroes$ = heroes$;
    this._character = character;
    this._hero$ = hero$;
    this._bounds$ = bounds$;
    this._boundsTiledCoords$ = this._bounds$.pipe(
      map((coords: Array<TPixelsCoords>) => coords.map((coords: TPixelsCoords) => grid64.transformToTiles(...coords))),
    );

    if (chaser) {
      this._state = EnemyState.CHASING;
    }

    this._boundsTiledCoords$.subscribe((bounds: Array<TTiledCoords>) => {
      this._pathFinder = new PathFinder({ width: SIZE_X, height: SIZE_Y, bounds });
    });

    this._enemyArea$ = this._character.moving.breakpoints$.pipe(
      map(() => grid64.transformToTiles(...this._character.moving.getCollisionArea())),
    );

    this._heroes$.subscribe((heroes) => {
      for (const hero of heroes) {
        this._handleHeroCreation(hero);
      }
    });

    const movements$ = actions.updateEnemyListener().pipe(
      filter((enemy) => enemy.id === id && enemy.hasOwnProperty('direction') && !this._ignoreMovements),
      filter(() => this._state === EnemyState.IDLE),
      map((enemy) => enemy.direction),
    );

    this._idlingSubscription = streamDecorator(movements$).subscribe((direction: MovingDirection) => {
      this._character.moving.moveTo(direction);
    });

    this._character.fighting.isDied$.pipe(first()).subscribe(() => {
      this._idlingSubscription.unsubscribe();
      // this._chasingSubscription.unsubscribe(); // Отписаться от chasing
    });

    this._hero$
      .pipe(
        filter(() => this._state === EnemyState.CHASING),
        switchMap((hero: IMovingCharacter) => hero.moving.breakpoints$),
        distinctUntilChanged(),
        skip(1),
        switchMap(() => this._hero$),
        map((hero: IFightingCharacter) => grid64.transformToTiles(...hero.fighting.getAffectedArea())),
        withLatestFrom(this._enemyArea$, this._boundsTiledCoords$),
      )
      .subscribe(([heroArea, enemyArea, bounds]: [TTiledCoords, TTiledCoords, Array<TTiledCoords>]) => {
        this._chase(heroArea, enemyArea, bounds);
      });
  }

  private _chase(heroArea: TTiledCoords, enemyArea: TTiledCoords, bounds: Array<TTiledCoords>) {
    if (!this._pathFinder) {
      console.log('No Path Finder!');

      return;
    }

    const enemy = this._character;
    const commands = this._pathFinder.getDirections(enemyArea, heroArea);

    console.log(commands);

    this._state = EnemyState.CHASING;

    if (this._chasingSubscription) {
      this._chasingSubscription.unsubscribe();
    }

    this._chasingSubscription = enemy.moving.breakpoints$.pipe(distinctUntilChanged()).subscribe(() => {
      if (commands.length > 0) {
        const command = commands.shift()!;

        enemy.moving.moveTo(command);
        /**
         * Когда герой двигается, посылаем команду остановиться, чтобы он не ушел дальше следующего тайла
         */
        setTimeout(() => enemy.moving.moveTo(MovingDirection.IDLE), 50);
      } else {
        this._chasingSubscription.unsubscribe();
      }
    });
  }

  private _handleHeroCreation(hero: IMovingCharacter & IFightingCharacter) {
    hero.moving.breakpoints$.subscribe(() => {
      this._ignoreMovements = false;

      const enemy = this._character;
      const enemyHasAttackCollision = collisions.hasCollision(
        enemy.fighting.getAffectedArea(),
        hero.moving.getCollisionArea(),
      );

      if (enemyHasAttackCollision) {
        this._ignoreMovements = true;
        this._attackWithDelay(enemy, 500);

        return;
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
    });
  }

  private _attackWithDelay(enemy: IFightingCharacter, ms: number) {
    setTimeout(() => enemy.fighting.attack(), ms);
  }
}
