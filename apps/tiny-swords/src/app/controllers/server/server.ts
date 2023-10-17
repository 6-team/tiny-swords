import { BehaviorSubject, Subject, filter } from 'rxjs';
import { IController } from '../controllers.types';
import { MovingDirection, AttackingType } from '@shared';
import { actions } from '../../core';
import { IMovableCharacter, IAttackingCharacter } from '../../common/common.types';

export default class ServerController implements IController {
  private _movement$ = new BehaviorSubject<MovingDirection>(MovingDirection.IDLE);
  private _animation$ = new BehaviorSubject<MovingDirection>(MovingDirection.IDLE);
  private _attack$ = new Subject<AttackingType>();
  private _character: IMovableCharacter & IAttackingCharacter;

  readonly movement$ = this._movement$.asObservable();
  readonly animation$ = this._animation$.asObservable();
  readonly attack$ = this._attack$.asObservable();

  setCharacter(character: IMovableCharacter & IAttackingCharacter) {
    this._character = character;

    return this;
  }

  constructor({ id }: { id: string | number }) {
    actions
      .updatePlayerListener()
      .pipe(filter((player) => player.id === id))
      .subscribe((player) => {
        if (player.hasOwnProperty('attackingType')) {
          this._attack$.next(player.attackingType);
        }

        if (player.hasOwnProperty('direction')) {
          this._movement$.next(player.direction);
          this._animation$.next(player.direction);
        }

        if (player.hasOwnProperty('breakpoint')) {
          const movable = this._character.getAbility('movable');

          if (movable.coords[0] !== player.breakpoint[0] || movable.coords[1] !== player.breakpoint[1]) {
            /**
             * @TODO Убрать это безобразие, когда будем прокидывать персонажа в контроллер, а не наоборот
             */
            movable.setCoords(player.breakpoint);
          }
        }
      });
  }
}
