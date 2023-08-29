export class Nothing<T> {
  #value: T;

  constructor(value: T) {
    this.#value = value;
  }

  map<R>(_?: (prev: T) => R) {
    return this;
  }

  extract() {
    return this.#value;
  }
}