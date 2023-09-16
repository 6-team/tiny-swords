import { IAttacking, IMovable } from '../../abilities';
import { TNumberOfPixels, TTilePosition } from '../../common/common.types';
import { IController } from '../../controllers';

export type EnemyAbilities = {
  movable: IMovable;
  attacking: IAttacking;
};

export interface EnemyConfig {
  controller: IController;
  height: TNumberOfPixels;
  width: TNumberOfPixels;
  initialX: TTilePosition;
  initialY: TTilePosition;
}
