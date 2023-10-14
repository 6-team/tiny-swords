import { directionKeys, attackKeys } from './keyboard.conts';
import { IController } from '../controllers.types';
import { BehaviorSubject, Subject, fromEvent, map } from 'rxjs';
import { MovingDirection, AttackingType } from '@shared';

export default class KeyboardController implements IController {
  private _pushedMovementKeys$ = new BehaviorSubject<MovingDirection[]>([]);
  private _pushedAttackKeys$ = new BehaviorSubject<AttackingType[]>([]);
  private _movement$ = new Subject<MovingDirection>();
  private _attack$ = new Subject<AttackingType>();

  readonly movement$ = this._movement$.asObservable();
  readonly attack$ = this._attack$.asObservable();

  constructor() {
    this._addListeners();

    this._pushedMovementKeys$
      .pipe(map((directions) => directions.at(-1)))
      .subscribe((direction) => this._movement$.next(direction ?? MovingDirection.IDLE));

    this._pushedAttackKeys$.pipe(map((attacks) => attacks.at(-1))).subscribe((attack) => {
      this._attack$.next(attack);
    });
  }

  private _addPushedDirectionKey(direction: MovingDirection | undefined): void {
    const keys = [...this._pushedMovementKeys$.getValue()];

    if (direction !== undefined && keys.indexOf(direction) === -1) {
      keys.push(direction);
      this._pushedMovementKeys$.next(keys);

      return;
    }
  }

  private _removePushedDirectionKey(direction: MovingDirection | undefined): void {
    const keys = [...this._pushedMovementKeys$.getValue()];
    const index = keys.indexOf(direction);

    if (index > -1) {
      keys.splice(index, 1);
      this._pushedMovementKeys$.next(keys);
    }
  }

  private _handleAttackKey(attack: AttackingType | undefined): void {
    if (attack === undefined) {
      return;
    }

    this._attack$.next(attack);
  }

  private _addListeners(): void {
    fromEvent(document, 'keydown').subscribe((event: KeyboardEvent) => {
      this._addPushedDirectionKey(directionKeys[event.code]);
      this._handleAttackKey(attackKeys[event.code]);
    });

    fromEvent(document, 'keyup').subscribe((event: KeyboardEvent) => {
      this._removePushedDirectionKey(directionKeys[event.code]);
    });
  }
}
