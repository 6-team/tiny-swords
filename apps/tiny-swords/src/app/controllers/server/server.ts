import { Subject, filter } from 'rxjs';
import { IController } from '../controllers.types';
import { MovingDirection, AttackingType } from '@shared';
import { actions } from '../../core';

export default class ServerController implements IController {
  private _movement$ = new Subject<MovingDirection>();
  private _attack$ = new Subject<AttackingType>();

  readonly movement$ = this._movement$.asObservable();
  readonly attack$ = this._attack$.asObservable();

  constructor({ id }: { id: string | number }) {
    actions
      .updatePlayerListener()
      .pipe(filter((player) => player.id === id))
      .subscribe((player) => {
        if (player.hasOwnProperty('attackingType')) {
          this._attack$.next(player.attackingType);
        }

        if (player.direction) {
          this._movement$.next(player.direction);
        }
      });
  }
}
