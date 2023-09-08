import { IWithCoordsMethods, TTilePosition } from '../coordinate-system/coordinate-system.types';
import { IMovableProps } from './movable.types';

/**
 * Класс для передвигающихся элементов.
 * Предполагается, что координаты задаются в тайлах, с которыми будет работать выбранная система координат.
 */
export class Movable implements IWithCoordsMethods {
  #coords: [TTilePosition, TTilePosition];
  #prevCoords: [TTilePosition, TTilePosition];
  #sizes: [number, number];

  constructor({ initialX, initialY, initialHeight, initialWidth }: IMovableProps) {
    this.#coords = [initialX, initialY];
    this.#prevCoords = [initialX, initialY];
    this.#sizes = [initialHeight, initialWidth || initialHeight];
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

  get coords() {
    return this.#coords;
  }

  get sizes() {
    return this.#sizes;
  }

  get prevCoords() {
    return this.#prevCoords;
  }
}
