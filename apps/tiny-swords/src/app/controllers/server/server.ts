import { Subject, filter } from 'rxjs';
import { AttackingType } from '../../abilities/abilities.const';
import { IController } from '../controllers.types';
import { MovingDirection } from '@shared';
import { actions } from '../../core';

export default class ServerController implements IController {
  private _movement$ = new Subject<MovingDirection>();
  private _attack$ = new Subject<AttackingType>();

  readonly movement$ = this._movement$.asObservable();
  readonly attack$ = this._attack$.asObservable();

  constructor({ id }: { id: string }) {
    actions
      .updatePlayerListener()
      .pipe(filter((player) => player.id === id))
      .subscribe((player) => {
        this._movement$.next(player.direction);
      });
  }
}
