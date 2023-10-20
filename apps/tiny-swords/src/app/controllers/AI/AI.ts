import { MovingDirection, AttackingType, StandingDirection } from '@shared';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { IAttackingCharacter, IMovableCharacter } from '../../common/common.types';
import { IController } from '../controllers.types';
import { collisions } from '../../core/collisions';
import { grid64 } from '../../core';
import { TPixelsCoords } from '../../abilities/abilities.types';

export class AIController implements IController {
  private _movement$ = new BehaviorSubject<MovingDirection>(MovingDirection.IDLE);
  private _animation$ = new BehaviorSubject<MovingDirection>(MovingDirection.IDLE);
  private _attack$ = new Subject<AttackingType>();
  private _character: IMovableCharacter & IAttackingCharacter;
  private _heroes$: Observable<Array<IMovableCharacter & IAttackingCharacter>>;

  readonly movement$ = this._movement$.asObservable();
  readonly animation$ = this._animation$.asObservable();
  readonly attack$ = this._attack$.asObservable();

  constructor({ heroes$ }: { heroes$: Observable<Array<IMovableCharacter & IAttackingCharacter>> }) {
    this._heroes$ = heroes$;
  }

  setCharacter(character: IMovableCharacter & IAttackingCharacter) {
    this._character = character;

    return this;
  }

  /**
   * @TODO Убрать это безобразие, когда будем прокидывать персонажа в контроллер, а не наоборот
   */
  init() {
    this._heroes$.subscribe((heroes) => {
      for (const hero of heroes) {
        hero.moving.breakpoints$.subscribe(() => {
          const enemy = this._character;
          const enemyHasAttackCollision = collisions.hasCollision(
            enemy.fighting.getAffectedArea(),
            hero.moving.getCollisionArea(),
          );

          if (enemyHasAttackCollision) {
            this._attackWithDelay(enemy, 300);

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
            enemy.moving.setStandingDirection(
              enemy.moving.isRightDirection ? StandingDirection.LEFT : StandingDirection.RIGHT,
            );
            this._attackWithDelay(enemy, 300);
          }
        });
      }
    });

    return this;
  }

  private _attackWithDelay(enemy: IAttackingCharacter, ms: number) {
    setTimeout(() => enemy.fighting.attack(), ms);
  }
}
