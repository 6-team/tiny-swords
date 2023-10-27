import { TPixelsCoords } from '../../abilities/abilities.types';
import { SIZE_X, SIZE_Y, SPRITE_SIZE } from '../../common/common.const';
import { IGrid, TNumberOfSprites, TPixelsPosition, TSpritePosition } from '../../common/common.types';

/**
 * Represents a grid for sprite-based graphics.
 * 
 * @implements {IGrid}
 */
export class Grid implements IGrid {
  #spriteSize: number;
  #maxX: TNumberOfSprites;
  #maxY: TNumberOfSprites;

  /**
   * Creates an instance of the Grid class.
   *
   * @param {number} spriteSize - The size of each sprite in pixels.
   * @param {TNumberOfSprites} maxX - The maximum number of sprites in the X direction.
   * @param {TNumberOfSprites} maxY - The maximum number of sprites in the Y direction.
   */
  constructor({ spriteSize, maxX, maxY }: { spriteSize: number; maxX: TNumberOfSprites; maxY: TNumberOfSprites }) {
    this.#spriteSize = spriteSize;
    this.#maxX = maxX;
    this.#maxY = maxY;
  }

  /**
   * Gets the size of each sprite in pixels.
   *
   * @type {number}
   */
  get spriteSize() {
    return this.#spriteSize;
  }

  /**
   * Transforms sprite coordinates to pixel coordinates.
   *
   * @param {TSpritePosition} x - The X-coordinate of the sprite.
   * @param {TSpritePosition} y - The Y-coordinate of the sprite.
   * @param {number} height - The height of the sprite.
   * @param {number} width - The width of the sprite.
   * @returns {[number, number, number, number]} An array representing pixel coordinates and dimensions.
   */
  transformToPixels(
    x: TSpritePosition,
    y: TSpritePosition,
    height: number,
    width: number,
  ): [pxX: number, pxY: number, pxHeight: number, pxWidth: number] {
    return [x, y, height, width].map((dimention) => dimention * this.#spriteSize) as [number, number, number, number];
  }

  /**
   * Transforms pixel coordinates to sprite coordinates.
   *
   * @param {TPixelsPosition} x - The X-coordinate in pixels.
   * @param {TPixelsPosition} y - The Y-coordinate in pixels.
   * @param {number} height - The height in pixels.
   * @param {number} width - The width in pixels.
   * @returns {TPixelsCoords} An array representing sprite coordinates and dimensions.
   */
  transformToSprites(x: TPixelsPosition, y: TPixelsPosition, height: number, width: number): TPixelsCoords {
    return [x, y, height, width].map((dimention) => dimention / this.#spriteSize) as TPixelsCoords;
  }

  /**
   * Gets the previous pixel position based on the grid's sprite size.
   *
   * @param {TPixelsPosition} dimention - The current pixel position.
   * @returns {TPixelsPosition} The previous pixel position.
   */
  getPrevPixels(dimention: TPixelsPosition): TPixelsPosition {
    return dimention - this.#spriteSize;
  }

  /**
   * Gets the next pixel position based on the grid's sprite size.
   *
   * @param {TPixelsPosition} dimention - The current pixel position.
   * @returns {TPixelsPosition} The next pixel position.
   */
  getNextPixels(dimention: TPixelsPosition): TPixelsPosition {
    return dimention + this.#spriteSize;
  }
}

/**
 * A predefined Grid instance with a sprite size of 64 pixels.
 *
 * @type {Grid}
 */
export const grid64 = new Grid({ spriteSize: SPRITE_SIZE, maxX: SIZE_X, maxY: SIZE_Y });
