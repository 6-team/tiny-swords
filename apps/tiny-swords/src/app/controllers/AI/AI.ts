import { MovingDirection, AttackingType } from '@shared';
import { BehaviorSubject, Subject, filter } from 'rxjs';
import { actions } from '../../core';

export class AIController {
  private _movement$ = new BehaviorSubject<MovingDirection>(MovingDirection.IDLE);
  private _animation$ = new BehaviorSubject<MovingDirection>(MovingDirection.IDLE);
  private _attack$ = new Subject<AttackingType>();

  readonly movement$ = this._movement$.asObservable();
  readonly animation$ = this._animation$.asObservable();
  readonly attack$ = this._attack$.asObservable();

  constructor({ id }: { id: string }) {
    actions
      .updateEnemyListener()
      .pipe(filter((enemy) => enemy.id === id))
      .subscribe((enemy) => {
        if (enemy.hasOwnProperty('direction')) {
          this._movement$.next(enemy.direction);
        }
      });
  }
}
