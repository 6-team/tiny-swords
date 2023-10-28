import { TNumberOfSprites, TTiledCoords } from '@common/common.types';

export interface IPathFinderProps {
  width: TNumberOfSprites;
  height: TNumberOfSprites;
  bounds: Array<TTiledCoords>;
}
