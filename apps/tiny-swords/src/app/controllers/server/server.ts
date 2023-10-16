import { Subject, filter } from 'rxjs';
import { IController } from '../controllers.types';
import { MovingDirection, AttackingType } from '@shared';
import { actions } from '../../core';
import { CoordsTuple } from '../../entities/tile/tile.types';

export default class ServerController implements IController {
  private _movement$ = new Subject<MovingDirection>();
  private _animation$ = new Subject<MovingDirection>();
  private _attack$ = new Subject<AttackingType>();
  private _coords$ = new Subject<CoordsTuple>();

  readonly movement$ = this._movement$.asObservable();
  readonly animation$ = this._animation$.asObservable();
  readonly attack$ = this._attack$.asObservable();
  readonly coords$ = this._coords$.asObservable();

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
          this._coords$.next(player.coords);
        }
      });
  }
}
