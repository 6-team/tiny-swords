import { IAttacking, IMovable } from '../../abilities';
import { IAttackingCharacter, IMovableCharacter, TNumberOfPixels, TTilePosition } from '../../common/common.types';
import { IController } from '../../controllers';

export type EnemyAbilities = {
  movable: IMovable;
  attacking: IAttacking;
};

export interface EnemyConfig {
  controllerCreator: (enemy: IMovableCharacter & IAttackingCharacter) => IController;
  height: TNumberOfPixels;
  width: TNumberOfPixels;
  initialX: TTilePosition;
  initialY: TTilePosition;
  id: string;
}
