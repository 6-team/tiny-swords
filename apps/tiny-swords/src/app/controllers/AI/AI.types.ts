import { Observable } from 'rxjs';
import { MovingDirection } from '@shared';
import { IMovingCharacter } from '../../abilities/moving/moving.types';
import { IFightingCharacter } from '../../abilities/fighting/fighting.types';

export interface IAIControllerProps {
  heroes$: Observable<Array<IMovingCharacter & IFightingCharacter>>;
  id: string | number;
  character: IMovingCharacter & IFightingCharacter;
  streamDecorator?: (movements$: Observable<MovingDirection>) => Observable<MovingDirection>;
}
