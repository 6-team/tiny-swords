import { Observable } from 'rxjs';
import { MovingDirection, AttackingType } from '@shared';

export interface IController {
  movement$: Observable<MovingDirection>;
  attack$: Observable<AttackingType>;
}
