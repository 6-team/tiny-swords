import { Observable } from 'rxjs';
import { TCollisionArea } from '../../abilities/abilities.types';
import { MovingDirection } from '@shared';
import { IMovingCharacter } from '../../abilities/moving/moving.types';

export interface IPreventBoundsDecoratorProps {
  character: IMovingCharacter;
  otherCharacters$: Observable<Array<IMovingCharacter>>;
  bounds$: Observable<Array<TCollisionArea>>;
  originalStream$: Observable<MovingDirection>;
}
