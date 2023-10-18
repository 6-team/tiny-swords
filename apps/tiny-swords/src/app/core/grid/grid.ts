import { SIZE_X, SIZE_Y, TILE_SIZE } from '../../common/common.const';
import { IGrid, TNumberOfTiles, TTilePosition } from '../../common/common.types';

export class Grid implements IGrid {
  #tileSize: number;
  #maxX: TNumberOfTiles;
  #maxY: TNumberOfTiles;

  constructor({ tileSize, maxX, maxY }: { tileSize: number; maxX: TNumberOfTiles; maxY: TNumberOfTiles }) {
    this.#tileSize = tileSize;
    this.#maxX = maxX;
    this.#maxY = maxY;
  }

  get tileSize() {
    return this.#tileSize;
  }

  transformToPixels(
    x: TTilePosition,
    y: TTilePosition,
    height: number,
    width: number,
  ): [pxX: number, pxY: number, pxHeight: number, pxWidth: number] {
    return [x, y, height, width].map((dimention) => dimention * this.#tileSize) as [number, number, number, number];
  }
}

export const grid64 = new Grid({ tileSize: TILE_SIZE, maxX: SIZE_X, maxY: SIZE_Y });
