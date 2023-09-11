import { TNumberOfTiles, TTilePosition } from '../../common/common.types';

export interface MovableProps {
  initialX: TTilePosition;
  initialY: TTilePosition;
  initialHeight: TNumberOfTiles;
  initialWidth?: TNumberOfTiles;
}
