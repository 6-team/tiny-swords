import { MovingDirection } from '@shared';
import { IAttackingCharacter, IMovableCharacter } from '../../common/common.types';
import { Observable } from 'rxjs';

export interface IKeyboardControllerProps {
  character: IMovableCharacter & IAttackingCharacter;
  streamDecorator?: (movements$: Observable<MovingDirection>) => Observable<MovingDirection>;
}
