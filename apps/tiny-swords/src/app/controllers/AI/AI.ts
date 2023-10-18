import { MovingDirection, AttackingType } from '@shared';
import { BehaviorSubject, Observable, Subject, filter, first } from 'rxjs';
import { IAttackingCharacter, IMovableCharacter } from '../../common/common.types';
import { IController } from '../controllers.types';
import { collisions } from '../../core/collisions';

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
    const enemyAttacking = this._character.getAbility('attacking');

    this._heroes$.subscribe((heroes) => {
      for (const hero of heroes) {
        const heroMovable = hero.getAbility('movable');
        const heroAttacking = hero.getAbility('attacking');

        heroMovable.breakpoints$.subscribe(() => {
          const enemyHasAttackCollision = collisions.hasCollision(
            enemyAttacking.getAffectedArea(),
            heroMovable.getCollisionArea(),
          );

          if (enemyHasAttackCollision) {
            enemyAttacking
              .attack()
              .isAttacking$.pipe(
                filter((isAttacking) => !isAttacking),
                first(),
              )
              .subscribe(() => {
                heroAttacking.takeDamage();
              });
          }
        });
      }
    });

    return this;
  }
}
