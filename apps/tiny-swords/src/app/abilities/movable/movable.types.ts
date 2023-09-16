import { Observable } from 'rxjs';
import { TNumberOfPixels } from '../../common/common.types';
import { MovingDirection } from '../abilities.const';

export interface MovableProps {
  stream$: Observable<MovingDirection>;
  initialX: TNumberOfPixels;
  initialY: TNumberOfPixels;
  height: TNumberOfPixels;
  width?: TNumberOfPixels;
}
