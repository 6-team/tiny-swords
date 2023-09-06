import { TTilePosition } from '../../common/common.types';

export interface IMovableProps {
  initialX: TTilePosition;
  initialY: TTilePosition;
  initialHeight: number;
  initialWidth?: number;
}
