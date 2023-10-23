import { IAttackingCharacter, IMovableCharacter } from '../../common/common.types';

export interface IServerControllerProps {
  id: number | string;
  character: IMovableCharacter & IAttackingCharacter;
}
