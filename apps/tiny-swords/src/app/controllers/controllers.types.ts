import { Observable } from 'rxjs';
import { MovingDirection, AttackingType } from '@shared';
import { CoordsTuple } from '../entities/tile/tile.types';

export interface IController {
  movement$: Observable<MovingDirection>;
  animation$: Observable<MovingDirection>;
  attack$: Observable<AttackingType>;
  coords$: Observable<CoordsTuple>;
}
