import { SIZE_X, SIZE_Y, TILE_SIZE } from '../../common/common.const';
import { IGrid, TNumberOfTiles, TPixelsPosition, TTilePosition, TTiledCoords } from '../../common/common.types';

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

  transformToTiles(x: TPixelsPosition, y: TPixelsPosition, height: number, width: number): TTiledCoords {
    return [x, y, height, width].map((dimention) => dimention / this.#tileSize) as TTiledCoords;
  }

  getPrevPixels(dimention: TPixelsPosition): TPixelsPosition {
    return dimention - this.#tileSize;
  }

  getNextPixels(dimention: TPixelsPosition): TPixelsPosition {
    return dimention + this.#tileSize;
  }
}

export const grid64 = new Grid({ tileSize: TILE_SIZE, maxX: SIZE_X, maxY: SIZE_Y });
