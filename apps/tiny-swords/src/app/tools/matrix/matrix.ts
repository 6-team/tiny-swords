import { IPosition } from './matrix.types';

/**
 * Класс, представляющий двумерную матрицу
 */
export class Matrix<T> {
  private readonly _array: Array<T>;
  private readonly _xLength: number;

  /**
   * Создать матрицу.
   * @param xLength - Длина размерности x.
   * @param yLength - Длина размерности y.
   */
  constructor(xLength: number, yLength: number) {
    this._array = new Array(xLength * yLength);
    this._xLength = xLength;
  }

  get array() {
    return this._array;
  }

  /**
   * Возвращает индекс элемента в массиве по координатам.
   * @param {IPosition} position - координаты элемента.
   * @returns - Индекс элемента.
   */
  #getElementIndex({ x, y }: IPosition): number {
    return y * this._xLength + x;
  }

  /**
   * Проверяет, входит ли индекс элемента в пределы матрицы
   * @param  index - Индекс для проверки вхождения.
   * @throws - Вернет ошибку, если индекс недопустим.
   */
  #assertInvalidPosition(index: number): void {
    if (index >= this._array.length || index < 0) {
      throw new Error('Invalid coordinates');
    }
  }

  /**
   * Добавляет значение в матрицу.
   * @param {IPosition} position - Координаты для обновления значения.
   * @param value - Добавляемое значение в матрицу.
   */
  set(position: IPosition, value: T): void {
    const index = this.#getElementIndex(position);

    this.#assertInvalidPosition(index);
    this._array[index] = value;
  }

  /**
   * Возвращает значение из матрицы.
   * @param {IPosition} position - Координаты.
   * @returns - Значение по координатам.
   */
  get(position: IPosition): T {
    const index = this.#getElementIndex(position);

    this.#assertInvalidPosition(index);

    return this._array[index];
  }

  /**
   * Возвращает строковое представление матрицы, где каждая строка представлена в виде строки.
   * @returns - Строковое представление матрицы.
   */
  get stringView(): string {
    const result = [];

    for (let index = 0; index < this._array.length; index++) {
      const element = this._array[index] || '_';

      if (index % this._xLength === 0) {
        result.push([element]);
      } else {
        result[result.length - 1].push(element);
      }
    }

    return result.join('\n');
  }
}
