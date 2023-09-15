import { IAttacking, IMovable } from '../../abilities';
import { TNumberOfPixels, TTilePosition } from '../../common/common.types';
import { IController } from '../../controllers';

export type HeroAbilities = {
  movable: IMovable;
  attacking: IAttacking;
};

export interface HeroConfig {
  controller: IController;
  height: TNumberOfPixels;
  width: TNumberOfPixels;
  initialX: TTilePosition;
  initialY: TTilePosition;
}
