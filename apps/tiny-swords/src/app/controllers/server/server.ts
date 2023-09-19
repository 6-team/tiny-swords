import { Subject } from 'rxjs';
import { AttackingForce } from '../../abilities/abilities.const';
import { IController } from '../controllers.types';
import { MovingDirection } from '@shared';

export default class ServerController implements IController {
  private _movement$ = new Subject<MovingDirection>();
  private _attack$ = new Subject<AttackingForce>();

  readonly movement$ = this._movement$.asObservable();
  readonly attack$ = this._attack$.asObservable();

  setDirection(direction: MovingDirection): void {
    this._movement$.next(direction);
  }
}
