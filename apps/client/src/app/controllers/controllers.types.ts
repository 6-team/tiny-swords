import { Observable } from 'rxjs';
import { MovingDirection, AttackingType } from '@shared';

export interface IController {
  movement$: Observable<MovingDirection>;
  animation$: Observable<MovingDirection>;
  attack$: Observable<AttackingType>;
}
