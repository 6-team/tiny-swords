import { IWithAbilityToMove } from '../../common/abilities/abilities.types';
import { ICoordinateSystem, ITile } from '../../common/common.types';
import { Maybe } from '../../tools/monads/maybe';
import { TileName, mapTileNameToClass } from './renderer.const';
import { RendererConfig } from './renderer.types';

function* enumerate<T>(iterable: Iterable<T>): Iterable<[number, T]> {
  let index = 0;

  for (const value of iterable) {
    yield [index++, value];
  }
}

/**
 * Класс, отвечающий за рендер элементов в canvas.
 * По идее ничего не знает про размеры тайлов и каким координатам в px соответствуют номера тайлов.
 */
export class Renderer {
  #canvas: HTMLCanvasElement;
  #context: CanvasRenderingContext2D;
  #system: ICoordinateSystem;
  #scale: number;

  constructor({ canvas, coordinateSystem, scale }: RendererConfig) {
    this.#canvas = canvas;
    this.#context = this.#canvas.getContext('2d');
    this.#system = coordinateSystem;
    this.#scale = scale;
    this.#context.imageSmoothingEnabled = false; // Отключаю сглаживание
  }

  private _clear() {
    this.#context.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
  }

  async render(elementPxCoords: [number, number, number, number], tile: ITile) {
    const [elementPxX, elementPxY, elementPxHeight, elementPxWidth] = elementPxCoords;
    const { image, coords, size } = await tile.getData();

    this.#context.drawImage(
      image,
      coords[0],
      coords[1],
      size,
      size,
      elementPxX * this.#scale,
      elementPxY * this.#scale,
      elementPxHeight * this.#scale,
      elementPxWidth * this.#scale,
    );

    return this;
  }

  async renderMovable(tile: ITile & IWithAbilityToMove) {
    const { coords, sizes } = tile.getAbility('movable');

    this.render(this.#system.transformToPixels(coords[0], coords[1], sizes[0], sizes[1]), tile);
  }

  async renderStaticLayer(map: Array<Array<TileName | null>>) {
    for (const [rowIndex, row] of enumerate(map)) {
      for (const [tileNameIndex, tileName] of enumerate(row)) {
        await new Maybe(tileName)
          .map((name) => mapTileNameToClass[name])
          .map((data) => {
            const { constructor: Constructor, args } = data;

            return this.render(this.#system.transformToPixels(tileNameIndex, rowIndex, 1, 1), new Constructor(...args));
          })
          .extract();
      }
    }
  }

  async renderMovableLayer(movables: Array<ITile & IWithAbilityToMove>) {
    this._clear();

    for (const movable of movables) {
      new Maybe(movable).map((tile) => this.renderMovable(tile));
    }
  }
}
