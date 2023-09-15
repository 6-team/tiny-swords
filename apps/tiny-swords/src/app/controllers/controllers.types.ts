import { Observable } from 'rxjs';
import { AttackingForce, MovingDirection } from '../abilities/abilities.const';

export interface IController {
  movement$: Observable<MovingDirection>;
  attack$: Observable<AttackingForce>;
}
