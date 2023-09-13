import { IMovable, WithMethodsForMovable } from '../abilities.types';
import { ITile, TPixelsPosition } from '../../common/common.types';
import { MovingError } from './movable.const';
import { MovableProps } from './movable.types';

/**
 * Класс для передвигающихся элементов.
 * Координаты задаются в тайлах, а выбранная система координат уже переводит значения в пиксели
 */
export class Movable implements IMovable {
  #coords: [TPixelsPosition, TPixelsPosition];
  #prevCoords: [TPixelsPosition, TPixelsPosition];
  #sizes: [TPixelsPosition, TPixelsPosition];
  #context?: ITile & WithMethodsForMovable;

  constructor({ initialX, initialY, initialHeight, initialWidth }: MovableProps) {
    this.#coords = [initialX, initialY];
    this.#prevCoords = [initialX, initialY];
    this.#sizes = [initialHeight, initialWidth || initialHeight];
  }

  /**
   * Устанавливает контекст/носителя данной способности.
   * Нужно, чтобы вызывать его методы, такие как показ анимации, изменение изображения и т.п.
   *
   * @param context Контекст
   * @returns Объект способности
   */
  setContext(context: ITile & WithMethodsForMovable) {
    this.#context = context;

    return this;
  }

  /**
   * Задаёт движение персонажу: указывается куда и на сколько подвинуть, какую анимацию отобразить и в каком направлении повернуть.
   *
   * @param updater Функция для обновления координат. Принимает текущие координаты первым аргументом.
   * @param animation Тип анимации, которая будет применена к персонажу.
   * @param direction Направление, в котором будет повернут персонаж.
   * @returns Объект способности
   */
  setMovement(updater: (prev: [TPixelsPosition, TPixelsPosition]) => [TPixelsPosition, TPixelsPosition]) {
    if (!this.#context) {
      throw new Error(MovingError.PERSONAGE_NOT_SET);
    }

    const prevCoords: [TPixelsPosition, TPixelsPosition] = [...this.#coords];

    this.#coords = [...updater(this.#coords)];
    this.#prevCoords = prevCoords;

    return this;
  }

  /**
   * Возращает персонажа на предыдущие координаты.
   *
   * @returns Объект способности
   */
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
