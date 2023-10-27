import { TPixelsCoords } from '../../abilities/abilities.types';
import { SIZE_X, SIZE_Y, SPRITE_SIZE } from '../../common/common.const';
import { IGrid, TNumberOfSprites, TPixelsPosition, TSpritePosition } from '../../common/common.types';

export class Grid implements IGrid {
  #spriteSize: number;
  #maxX: TNumberOfSprites;
  #maxY: TNumberOfSprites;

  constructor({ spriteSize, maxX, maxY }: { spriteSize: number; maxX: TNumberOfSprites; maxY: TNumberOfSprites }) {
    this.#spriteSize = spriteSize;
    this.#maxX = maxX;
    this.#maxY = maxY;
  }

  get spriteSize() {
    return this.#spriteSize;
  }

  transformToPixels(
    x: TSpritePosition,
    y: TSpritePosition,
    height: number,
    width: number,
  ): [pxX: number, pxY: number, pxHeight: number, pxWidth: number] {
    return [x, y, height, width].map((dimention) => dimention * this.#spriteSize) as [number, number, number, number];
  }

  transformToSprites(x: TPixelsPosition, y: TPixelsPosition, height: number, width: number): TPixelsCoords {
    return [x, y, height, width].map((dimention) => dimention / this.#spriteSize) as TPixelsCoords;
  }

  getPrevPixels(dimention: TPixelsPosition): TPixelsPosition {
    return dimention - this.#spriteSize;
  }

  getNextPixels(dimention: TPixelsPosition): TPixelsPosition {
    return dimention + this.#spriteSize;
  }
}

export const grid64 = new Grid({ spriteSize: SPRITE_SIZE, maxX: SIZE_X, maxY: SIZE_Y });
