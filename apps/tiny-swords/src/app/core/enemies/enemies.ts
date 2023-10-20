import { IPlayer, StandingDirection } from '@shared';
import { BehaviorSubject, Observable, concatAll, filter, map, merge, mergeMap, tap } from 'rxjs';
import { TPixelsCoords } from '../../abilities/abilities.types';
import { grid64 } from '../grid';
import { Enemy } from '../../entities/enemy';
import { AIController } from '../../controllers/AI';
import { IAttackingCharacter, IMovableCharacter } from '../../common/common.types';

class Enemies {
  readonly #enemiesSubject = new BehaviorSubject<Enemy[]>([]);

  readonly enemies$ = this.#enemiesSubject.asObservable();
  readonly enemiesBoundaries$ = this.#initEnemiesBoundaries();

  get enemies(): Enemy[] {
    return this.#enemiesSubject.getValue();
  }

  initEnemy({ id, coords }: IPlayer, heroes$: Observable<Array<IMovableCharacter & IAttackingCharacter>>): Enemy {
    const [x, y] = coords;
    const [initialX, initialY, height, width] = grid64.transformToPixels(x - 1, y - 1, 3, 3);

    const enemy = new Enemy({
      controllerCreator: () => new AIController({ heroes$, id }),
      initialDirection: StandingDirection.LEFT,
      initialX,
      initialY,
      height,
      width,
      id,
    });

    this.addEnemy(enemy);

    return enemy;
  }

  getEnemy(id: string): Enemy | undefined {
    return this.enemies.find((enemy) => enemy.id === id);
  }

  addEnemy(enemy: Enemy): void {
    const enemies = this.enemies.concat(enemy);

    this.#enemiesSubject.next(enemies);
  }

  removeEnemy(id: string | number): void {
    const enemies = this.enemies.filter((enemy) => enemy.id !== id);

    this.#enemiesSubject.next(enemies);
  }

  clearEnemies(): void {
    this.#enemiesSubject.next([]);
  }

  #initEnemiesBoundaries(): Observable<TPixelsCoords[]> {
    const boundaries$ = this.enemies$.pipe(
      filter((enemies) => !!enemies.length),
      concatAll(),
      mergeMap((enemy) => enemy.getAbility('movable').coords$),
      map(() => this.enemies.map((enemy) => enemy.getAbility('movable').getCollisionArea())),
    );
    const emptyBoundary$ = this.enemies$.pipe(
      filter((enemies) => !enemies.length),
      map(() => []),
    );

    return merge(boundaries$, emptyBoundary$);
  }
}

export const enemies = new Enemies();
