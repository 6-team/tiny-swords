import { Observable, Subscription, filter, first, map } from 'rxjs';
import { MovingDirection, CharacterDirection } from '@shared';

import { IMovingCharacter } from '@abilities/moving';
import { IFightingCharacter } from '@abilities/fighting';
import { TPixelsCoords } from '@abilities/abilities.types';
import { actions } from '@core/actions';
import { grid64 } from '@core/grid';
import { collisions } from '@core/collisions';

import { IAIControllerProps } from './AI.types';

export class AIController {
  private _character: IMovingCharacter & IFightingCharacter;
  private _heroes$: Observable<Array<IMovingCharacter & IFightingCharacter>>;
  private _ignoreMovements = false;
  private _subscription: Subscription;

  constructor({
    heroes$,
    id,
    character,
    streamDecorator = (movements$: Observable<MovingDirection>) => movements$,
  }: IAIControllerProps) {
    this._heroes$ = heroes$;
    this._character = character;

    this._heroes$.subscribe((heroes) => {
      for (const hero of heroes) {
        this._handleHeroCreation(hero);
      }
    });

    const movements$ = actions.updateEnemyListener().pipe(
      filter((enemy) => enemy.id === id && enemy.hasOwnProperty('direction') && !this._ignoreMovements),
      map((enemy) => enemy.direction),
    );

    this._subscription = streamDecorator(movements$).subscribe((direction: MovingDirection) => {
      this._character.moving.moveTo(direction);
    });

    this._character.fighting.isDied$.pipe(first()).subscribe(() => this._subscription.unsubscribe());
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
