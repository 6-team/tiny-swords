import { TNumberOfPixels } from '../../common/common.types';
import { IController } from '../../controllers';

export interface MovableProps {
  controller: IController;
  initialX: TNumberOfPixels;
  initialY: TNumberOfPixels;
  height: TNumberOfPixels;
  width?: TNumberOfPixels;
}
