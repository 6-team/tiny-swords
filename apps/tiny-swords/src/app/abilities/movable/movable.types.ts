import { TNumberOfPixels } from '../../common/common.types';
import { IMovable } from '../abilities.types';

export interface MovableProps {
  initialX: TNumberOfPixels;
  initialY: TNumberOfPixels;
  height: TNumberOfPixels;
  width?: TNumberOfPixels;
  getCollisionArea?: (
    movable: IMovable,
  ) => [x1: TNumberOfPixels, y1: TNumberOfPixels, x2: TNumberOfPixels, y2: TNumberOfPixels];
}
