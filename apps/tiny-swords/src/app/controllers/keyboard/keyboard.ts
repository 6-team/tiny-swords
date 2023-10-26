import { directionKeys, attackKeys } from './keyboard.conts';
import { BehaviorSubject, Observable, fromEvent, map } from 'rxjs';
import { MovingDirection, AttackingType } from '@shared';
import { IKeyboardControllerProps } from './keyboard.types';
import { IMovingCharacter } from '../../abilities/moving/moving.types';
import { IFightingCharacter } from '../../abilities/fighting/fighting.types';

export default class KeyboardController {
  private _pushedMovementKeys$ = new BehaviorSubject<MovingDirection[]>([]);
  private _lastPushedMovementKey$ = this._pushedMovementKeys$.pipe(map((directions) => directions.at(-1)));
  private _character: IMovingCharacter & IFightingCharacter;

  constructor({
    character,
    streamDecorator = (movements$: Observable<MovingDirection>) => movements$,
  }: IKeyboardControllerProps) {
    this._character = character;
    this._addListeners();

    streamDecorator(this._lastPushedMovementKey$).subscribe((direction: MovingDirection) => {
      this._character.moving.moveTo(direction ?? MovingDirection.IDLE);
    });

    this._lastPushedMovementKey$.subscribe((direction: MovingDirection) => {
      this._character.moving.animate(direction ?? MovingDirection.IDLE);
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

    this._character.fighting.attack(attack);
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
