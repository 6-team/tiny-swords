import { TNumberOfTiles, TTiledCoords } from '@common/common.types';

export interface IPathFinderProps {
  width: TNumberOfTiles;
  height: TNumberOfTiles;
  bounds: Array<TTiledCoords>;
}
