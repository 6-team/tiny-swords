export class Nothing<T> {
  private readonly _value: T;

  constructor(value: T) {
    this._value = value;
  }

  /**
   * A function that returns a new instance of Nothing depending on the execution of the passed callback.
   * @param _ - A function to apply to the wrapped value.
   * @returns - Returns the current instance.
   */
  map<R>(_?: (prev: T) => R): this {
    return this;
  }

  /**
   * Extracts the wrapped value from the Nothing object.
   * @returns - The wrapped value.
   */
  extract(): T {
    return this._value;
  }
}
