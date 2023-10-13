import { Observable } from 'rxjs';
import { MovingDirection } from '@shared';
import { AttackingType } from '../abilities/abilities.const';

export interface IController {
  movement$: Observable<MovingDirection>;
  animation$: Observable<MovingDirection>;
  attack$: Observable<AttackingType>;
}
