import { MovingDirection } from '@shared';
import { Observable } from 'rxjs';
import { IMovingCharacter } from '../../abilities/moving/moving.types';
import { IFightingCharacter } from '../../abilities/fighting/fighting.types';

export interface IKeyboardControllerProps {
  character: IMovingCharacter & IFightingCharacter;
  streamDecorator?: (movements$: Observable<MovingDirection>) => Observable<MovingDirection>;
}
