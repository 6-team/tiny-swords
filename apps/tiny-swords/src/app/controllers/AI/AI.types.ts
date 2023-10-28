import { Observable } from 'rxjs';
import { MovingDirection } from '@shared';
import { IMovingCharacter } from '../../abilities/moving/moving.types';
import { IFightingCharacter } from '../../abilities/fighting/fighting.types';
import { TCollisionArea } from '../../abilities';

export interface IAIControllerProps {
  heroes$: Observable<Array<IMovingCharacter & IFightingCharacter>>;
  hero$: Observable<IMovingCharacter & IFightingCharacter>;
  bounds$: Observable<Array<TCollisionArea>>;
  id: string | number;
  character: IMovingCharacter & IFightingCharacter;
  chaser?: boolean;
  streamDecorator?: (movements$: Observable<MovingDirection>) => Observable<MovingDirection>;
}
