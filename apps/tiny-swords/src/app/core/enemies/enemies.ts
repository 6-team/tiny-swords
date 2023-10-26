import { BehaviorSubject, Observable, Subject, concatAll, filter, map, merge, mergeMap } from 'rxjs';

import { IEntity, CharacterDirection, MovingDirection } from '@shared';

import { AIController } from '@controllers/AI';
import { IMovingCharacter } from '@abilities/moving';
import { IFightingCharacter } from '@abilities/fighting';
import { grid64 } from '@core/grid';
import { collisions } from '@core/collisions';
import { TCollisionArea, TPixelsCoords } from '@abilities/abilities.types';
import { Enemy } from '@entities/enemy';

/**
 * Represents a collection of enemy characters.
 */
export class Enemies {
  private readonly _enemies = new BehaviorSubject<Enemy[]>([]);
  private readonly _newEnemy = new Subject<Enemy>();

  readonly enemies$ = this._enemies.asObservable();
  readonly enemiesBoundaries$ = this.initEnemiesBoundaries();
  readonly newEnemy$ = this._newEnemy.asObservable();

  get enemies(): Enemy[] {
    return this._enemies.getValue();
  }

  /**
   * Initializes an enemy character.
   * @param {IEntity} entity - The entity information for the enemy.
   * @param {Observable<Array<TCollisionArea>>} bounds$ - Observable of collision boundaries.
   * @param {Observable<Array<IMovableCharacter & IAttackingCharacter>} heroes$ - Observable of hero characters.
   * @returns {Enemy} - The newly initialized enemy character.
   */
  initEnemy(
    { id, coords }: IEntity,
    bounds$: Observable<Array<TCollisionArea>>,
    heroes$: Observable<Array<IMovingCharacter & IFightingCharacter>>,
  ): Enemy {
    const [x, y] = coords;
    const [initialX, initialY, height, width] = grid64.transformToPixels(x - 1, y - 1, 3, 3);

    const enemy = new Enemy({
      initialDirection: CharacterDirection.LEFT,
      initialX,
      initialY,
      height,
      width,
      id,
    });

    new AIController({
      id,
      heroes$,
      character: enemy,
      streamDecorator: (originalStream$: Observable<MovingDirection>) =>
        collisions.preventBoundsDecorator({ character: enemy, otherCharacters$: heroes$, bounds$, originalStream$ }),
    });

    this.addEnemy(enemy);

    return enemy;
  }

  /**
   * Retrieves an enemy character by its ID.
   * @param {string|number} id - The ID of the enemy to retrieve.
   * @returns {Enemy|undefined} - The enemy character or undefined if not found.
   */
  getEnemy(id: string | number): Enemy | undefined {
    return this.enemies.find((enemy) => enemy.id === id);
  }

  /**
   * Adds an enemy character to the collection.
   * @param {Enemy} enemy - The enemy character to add.
   */
  addEnemy(enemy: Enemy): void {
    const enemies = this.enemies.concat(enemy);

    this._newEnemy.next(enemy);
    this.setEnemies(enemies);
  }

  /**
   * Removes an enemy character from the collection by ID.
   * @param {string|number} id - The ID of the enemy to remove.
   */
  removeEnemy(id: string | number): void {
    const enemies = this.enemies.filter((enemy) => enemy.id !== id);

    this.setEnemies(enemies);
  }

  /**
   * Clears all enemy characters from the collection.
   */
  clearEnemies(): void {
    this.setEnemies([]);
  }

  /**
   * Sets the enemy collection to the provided array of enemies.
   * @param {Enemy[]} enemies - The array of enemy characters.
   * @private
   */
  private setEnemies(enemies: Enemy[]): void {
    this._enemies.next(enemies);
  }

  /**
   * Initializes and updates the collision boundaries of enemy characters.
   * @returns {Observable<TPixelsCoords[]>} - An observable of pixel coordinates representing boundaries.
   * @private
   */
  private initEnemiesBoundaries(): Observable<TPixelsCoords[]> {
    const boundaries$ = this.enemies$.pipe(
      filter((enemies) => !!enemies.length),
      concatAll(),
      mergeMap((enemy) => enemy.moving.coords$),
      map(() => this.enemies.map((enemy) => enemy.moving.getCollisionArea())),
    );
    const emptyBoundary$ = this.enemies$.pipe(
      filter((enemies) => !enemies.length),
      map(() => []),
    );

    return merge(boundaries$, emptyBoundary$);
  }
}

/**
 * Represents an instance of the Enemies class for use.
 * @type {Enemies}
 */
export const enemies = new Enemies();
