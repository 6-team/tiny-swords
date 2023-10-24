import { IPosition } from './matrix.types';

/**
 * A class representing a two-dimensional matrix
 */
export class Matrix<T> {
  private readonly _array: Array<T>;
  private readonly _xLength: number;

  /**
   * Construct a matrix.
   * @param xLength - Length of x dimension.
   * @param yLength - Length of y dimension.
   */
  constructor(xLength: number, yLength: number) {
    this._array = new Array(xLength * yLength);
    this._xLength = xLength;
  }

  get array() {
    return this._array;
  }

  /**
   * Returns the index of the element in array according to the coordinates.
   * @param {IPosition} position - Coordinates of the element.
   * @returns - Index of the element.
   */
  #getElementIndex({ x, y }: IPosition): number {
    return y * this._xLength + x;
  }

  /**
   * Checks if the index of an element is within the bounds of the matrix
   * @param  index - Index to check for inclusion.
   * @throws - Will throw an error if the index is invalid.
   */
  #assertInvalidPosition(index: number): void {
    if (index >= this._array.length || index < 0) {
      throw new Error('Invalid coordinates');
    }
  }

  /**
   * Adds a value into the matrix.
   * @param {IPosition} position - Coordinates to update the value.
   * @param value - Value to be added into the matrix.
   */
  set(position: IPosition, value: T): void {
    const index = this.#getElementIndex(position);

    this.#assertInvalidPosition(index);
    this._array[index] = value;
  }

  /**
   * Returns a value from the matrix.
   * @param {IPosition} position - Coordinates.
   * @returns - Value at coordinates.
   */
  get(position: IPosition): T {
    const index = this.#getElementIndex(position);

    this.#assertInvalidPosition(index);

    return this._array[index];
  }

  /**
   * Returns a string representation of the matrix, where each row is represented as a string.
   * @returns - String representation of the matrix.
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
