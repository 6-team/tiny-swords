import { pushedKeys } from './keyboard.conts';
import { IController } from '../controllers.types';
import { AttackingForce } from '../../abilities/abilities.const';
import { BehaviorSubject, Subject, fromEvent, map } from 'rxjs';
import { MovingDirection } from '@shared';

export default class KeyboardController implements IController {
  private _pushedKeys$ = new BehaviorSubject<MovingDirection[]>([]);
  private _movement$ = new Subject<MovingDirection>();
  private _attack$ = new Subject<AttackingForce>();

  readonly movement$ = this._movement$.asObservable();
  readonly attack$ = this._attack$.asObservable();

  constructor() {
    this._addListeners();

    this._pushedKeys$
      .pipe(map((directions) => directions.at(-1)))
      .subscribe((direction) => this._movement$.next(direction ?? MovingDirection.IDLE));
  }

  private _addPushedKey(code: string): void {
    const direction = pushedKeys[code];
    const keys = [...this._pushedKeys$.getValue()];

    if (direction && keys.indexOf(direction) === -1) {
      keys.push(direction);
      this._pushedKeys$.next(keys);
    }
  }

  private _removePushedKey(code: string): void {
    const direction = pushedKeys[code];
    const keys = [...this._pushedKeys$.getValue()];
    const directionIdx = keys.indexOf(direction);

    if (directionIdx > -1) {
      keys.splice(directionIdx, 1);
      this._pushedKeys$.next(keys);
    }
  }

  private _addListeners(): void {
    fromEvent(document, 'keydown').subscribe((event: KeyboardEvent) => {
      this._addPushedKey(event.code);
    });

    fromEvent(document, 'keyup').subscribe((event: KeyboardEvent) => {
      this._removePushedKey(event.code);
    });
  }
}
