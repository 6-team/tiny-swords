import { TNumberOfPixels } from '../../common/common.types';
import { IMovable } from '../abilities.types';
import { IController } from '../../controllers';

export interface MovableProps {
  controller: IController;
  initialX: TNumberOfPixels;
  initialY: TNumberOfPixels;
  height: TNumberOfPixels;
  width?: TNumberOfPixels;
  getCollisionArea?: (
    movable: IMovable,
  ) => [x1: TNumberOfPixels, y1: TNumberOfPixels, x2: TNumberOfPixels, y2: TNumberOfPixels];
}
