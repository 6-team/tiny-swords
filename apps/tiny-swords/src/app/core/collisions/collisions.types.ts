import { Observable } from 'rxjs';
import { IMovableCharacter } from '../../common/common.types';
import { TCollisionArea } from '../../abilities/abilities.types';
import { MovingDirection } from '@shared';

export interface IPreventBoundsDecoratorProps {
  character: IMovableCharacter;
  otherCharacters$: Observable<Array<IMovableCharacter>>;
  bounds$: Observable<Array<TCollisionArea>>;
  originalStream$: Observable<MovingDirection>;
}
