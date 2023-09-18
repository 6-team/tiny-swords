import { Observable } from 'rxjs';
import { TNumberOfPixels } from '../../common/common.types';
import { MovingDirection } from '../abilities.const';
import { IMovable } from '../abilities.types';

export interface MovableProps {
  stream$: Observable<MovingDirection>;
  initialX: TNumberOfPixels;
  initialY: TNumberOfPixels;
  height: TNumberOfPixels;
  width?: TNumberOfPixels;
  getCollisionArea?: (
    movable: IMovable,
  ) => [x1: TNumberOfPixels, y1: TNumberOfPixels, x2: TNumberOfPixels, y2: TNumberOfPixels];
}
