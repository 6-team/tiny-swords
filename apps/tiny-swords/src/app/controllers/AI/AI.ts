import { MovingDirection, CharacterDirection } from '@shared';
import { Observable, Subscription, filter, first, map } from 'rxjs';
import { IAttackingCharacter, IMovableCharacter } from '../../common/common.types';
import { collisions } from '../../core/collisions';
import { actions, grid64 } from '../../core';
import { TPixelsCoords } from '../../abilities/abilities.types';
import { IAIControllerProps } from './AI.types';

export class AIController {
  private _character: IMovableCharacter & IAttackingCharacter;
  private _heroes$: Observable<Array<IMovableCharacter & IAttackingCharacter>>;
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

  private _handleHeroCreation(hero: IMovableCharacter & IAttackingCharacter) {
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

  private _attackWithDelay(enemy: IAttackingCharacter, ms: number) {
    setTimeout(() => enemy.fighting.attack(), ms);
  }
}
