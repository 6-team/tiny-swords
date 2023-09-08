import { IMovable, ITile, TTilePosition } from '../../../common/common.types';
import { MovableProps, WithMovableMethods } from './movable.types';

/**
 * Класс для передвигающихся элементов.
 * Предполагается, что координаты задаются в тайлах, с которыми будет работать выбранная система координат.
 */
export class Movable implements IMovable {
  #coords: [TTilePosition, TTilePosition];
  #prevCoords: [TTilePosition, TTilePosition];
  #sizes: [number, number];
  #context?: ITile & WithMovableMethods;

  constructor({ initialX, initialY, initialHeight, initialWidth }: MovableProps) {
    this.#coords = [initialX, initialY];
    this.#prevCoords = [initialX, initialY];
    this.#sizes = [initialHeight, initialWidth || initialHeight];
  }

  setContext(context: ITile & WithMovableMethods) {
    this.#context = context;
  }

  setMovement(
    updater: (prev: [TTilePosition, TTilePosition]) => [TTilePosition, TTilePosition],
    animation?: 'BACKWARD' | 'FORWARD',
    direction?: 'RIGHT' | 'LEFT',
  ) {
    if (!this.#context) {
      throw new Error("Can't call Moving methods without personage");
    }

    const prevCoords: [number, number] = [...this.#coords];

    this.#coords = [...updater(this.#coords)];
    this.#prevCoords = prevCoords;
    this.#context.setAnimation(animation);
    // this.#context.setType(direction); // @TODO: Раскомментировать, когда будет класс, умеющий добавлять анимацию для нужного типа
  }

  back() {
    this.setMovement(() => this.#prevCoords);

    return this;
  }

  get coords() {
    return this.#coords;
  }

  get sizes() {
    return this.#sizes;
  }
}
