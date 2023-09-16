import { TILE_SIZE } from '../../common/common.const';
import { IGrid, TNumberOfTiles, TTilePosition } from '../../common/common.types';

export class Grid implements IGrid {
  #tileSize: number;
  #maxX: TNumberOfTiles;
  #maxY: TNumberOfTiles;

  /**
   * Проверяет коллизию между двумя элементами
   * Сделал статическим, чтобы можно было проверить коллизию между двумя элементами в разных системах координат
   *
   * @param rect1Coords Координаты в px первого объекта
   * @param rect2Coords Координаты в px второго объекта
   * @returns Массив сторон, по которым произошли коллизии
   */
  static checkCollision(
    rect1Coords: [pxX: number, pxY: number, pxHeight: number, pxWidth: number],
    rect2Coords: [pxX: number, pxY: number, pxHeight: number, pxWidth: number],
  ) {
    const [rect1Left, rect1Top, rect1Height, rect1Width] = rect1Coords;
    const [rect2Left, rect2Top, rect2Height, rect2Width] = rect2Coords;

    const rect1Right = rect1Left + rect1Width;
    const rect1Bottom = rect1Top + rect1Height;
    const rect2Right = rect2Left + rect2Width;
    const rect2Bottom = rect2Top + rect2Height;

    if (rect1Bottom <= rect2Top || rect1Top >= rect2Bottom || rect1Right <= rect2Left || rect1Left >= rect2Right) {
      return false;
    }

    return true;
  }

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

export const grid64 = new Grid({ tileSize: TILE_SIZE, maxX: 20, maxY: 20 });
