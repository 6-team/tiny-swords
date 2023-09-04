import { ITile } from '../../common/common.types';
import { IWithCoordsMethods, TTilePosition } from '../coordinate-system/coordinate-system.types';

/**
 * Класс для передвигающихся элементов.
 * Предполагается, что координаты задаются в тайлах, с которыми будет работать выбранная система координат.
 */
export class Movable implements IWithCoordsMethods {
  #element: ITile;
  #coords: [TTilePosition, TTilePosition];
  #prevCoords: [TTilePosition, TTilePosition];
  #sizes: [number, number];

  constructor(
    element: ITile,
    initialX: TTilePosition,
    initialY: TTilePosition,
    initialH: number,
    initialW: number = initialH,
  ) {
    this.#element = element;
    this.#coords = [initialX, initialY];
    this.#prevCoords = [initialX, initialY];
    this.#sizes = [initialH, initialW];
  }

  setCoords(updater: (prev: [TTilePosition, TTilePosition]) => [TTilePosition, TTilePosition]) {
    const prevCoords: [number, number] = [...this.#coords];

    this.#coords = [...updater(this.#coords)];
    this.#prevCoords = prevCoords;
  }

  back() {
    this.setCoords(() => this.#prevCoords);

    return this;
  }

  get element() {
    return this.#element;
  }

  get coords() {
    return this.#coords;
  }

  get sizes() {
    return this.#sizes;
  }
}
