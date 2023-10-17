import { Observable } from 'rxjs';
import { TPixelsCoords } from '../../abilities/abilities.types';
import { IMovableCharacter } from '../../common/common.types';

export interface AIControllerProps {
  bounds$: Observable<Array<TPixelsCoords>>;
  character: IMovableCharacter;
}
