import { Observable } from 'rxjs';
import { IAttackingCharacter, IMovableCharacter } from '../../common/common.types';
import { MovingDirection } from '@shared';

export interface IAIControllerProps {
  heroes$: Observable<Array<IMovableCharacter & IAttackingCharacter>>;
  id: string | number;
  character: IMovableCharacter & IAttackingCharacter;
  streamDecorator?: (movements$: Observable<MovingDirection>) => Observable<MovingDirection>;
}
