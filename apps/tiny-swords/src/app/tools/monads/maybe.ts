import { Nothing } from './nothing';

export class Maybe<T> {
  #value: T;

  constructor(value: T) {
    this.#value = value;
  }

  map<R>(mapper: (prev: T) => R): Maybe<R> | Nothing<R> {
    try {
      const next = mapper(this.#value);

      if (next === null || next === undefined) {
        return new Nothing(next);
      }

      return new Maybe<R>(next);
    } catch (err) {
      return new Nothing(err);
    }
  }

  extract() {
    return this.#value;
  }
}
