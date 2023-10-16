import { directionKeys, attackKeys } from './keyboard.conts';
import { IController } from '../controllers.types';
import { BehaviorSubject, Subject, filter, fromEvent, map } from 'rxjs';
import { MovingDirection, AttackingType } from '@shared';
import { actions } from '../../core';
import { CoordsTuple } from '../../entities/tile/tile.types';

export default class KeyboardController implements IController {
  private _pushedMovementKeys$ = new BehaviorSubject<MovingDirection[]>([]);
  private _pushedAttackKeys$ = new BehaviorSubject<AttackingType[]>([]);
  private _movement$ = new Subject<MovingDirection>();
  private _animation$ = new Subject<MovingDirection>();
  private _attack$ = new Subject<AttackingType>();
  private _coords$ = new Subject<CoordsTuple>();

  readonly movement$ = this._movement$.asObservable();
  readonly animation$ = this._animation$.asObservable();
  readonly attack$ = this._attack$.asObservable();
  readonly coords$ = this._coords$.asObservable();
  readonly pushedMovementKeys$ = this._pushedMovementKeys$
    .asObservable()
    .pipe(map((directions) => directions.at(-1) ?? MovingDirection.IDLE));

  constructor({ id }: { id: string | number }) {
    actions
      .updatePlayerListener()
      .pipe(filter((player) => player.id === id))
      .subscribe((player) => {
        if (player.direction) {
          this._movement$.next(player.direction);
          this._animation$.next(player.direction);
        }
      });

    this._addListeners();

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
