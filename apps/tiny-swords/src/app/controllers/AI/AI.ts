import { MovingDirection, AttackingType } from '@shared';
import { Subject } from 'rxjs';

export class AIController {
  private _movement$ = new Subject<MovingDirection>();
  private _animation$ = new Subject<MovingDirection>();
  private _attack$ = new Subject<AttackingType>();

  readonly movement$ = this._movement$.asObservable();
  readonly animation$ = this._animation$.asObservable();
  readonly attack$ = this._attack$.asObservable();
}
