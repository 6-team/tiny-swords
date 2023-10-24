import { IFightingCharacter } from '../../abilities/fighting/fighting.types';
import { IMovingCharacter } from '../../abilities/moving/moving.types';

export interface IServerControllerProps {
  id: number | string;
  character: IMovingCharacter & IFightingCharacter;
}
