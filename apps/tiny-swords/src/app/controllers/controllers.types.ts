import { Observable } from 'rxjs';
import { AttackingForce } from '../abilities/abilities.const';
import { MovingDirection } from '@shared';

export interface IController {
  movement$: Observable<MovingDirection>;
  attack$: Observable<AttackingForce>;
  setDirection(direction: MovingDirection): void;
}
