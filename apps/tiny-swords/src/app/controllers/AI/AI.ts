import { MovingDirection, AttackingType } from '@shared';
import { BehaviorSubject, Subject } from 'rxjs';

export class AIController {
  private _movement$ = new BehaviorSubject<MovingDirection>(MovingDirection.IDLE);
  private _animation$ = new BehaviorSubject<MovingDirection>(MovingDirection.IDLE);
  private _attack$ = new Subject<AttackingType>();

  readonly movement$ = this._movement$.asObservable();
  readonly animation$ = this._animation$.asObservable();
  readonly attack$ = this._attack$.asObservable();
}
