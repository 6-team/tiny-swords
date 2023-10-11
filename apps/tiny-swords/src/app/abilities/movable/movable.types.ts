import { TNumberOfPixels } from '../../common/common.types';
import { IMovable, TCollisionArea } from '../abilities.types';

export interface MovableProps {
  initialX: TNumberOfPixels;
  initialY: TNumberOfPixels;
  height: TNumberOfPixels;
  width?: TNumberOfPixels;
  getCollisionArea?: (movable: IMovable) => TCollisionArea;
}
