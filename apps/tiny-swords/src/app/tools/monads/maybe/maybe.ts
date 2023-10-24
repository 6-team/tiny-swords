import { Nothing } from "@tools/monads";

export class Maybe<T> {
  private readonly _value: T;

  constructor(value: T) {
    this._value = value;
  }

  /**
   * A function returning a new instance of Maybe or Nothing, depending on whether the passed-in callback executes
   * @param mapper - Callback that takes the current value
   * @returns - A new instance of Maybe or Nothing.
   */
  map<R>(mapper: (prev: T) => R): Maybe<R> | Nothing<R> {
    const next = mapper(this._value);

    if (next === null || next === undefined) {
      return new Nothing(next);
    }

    return new Maybe<R>(next);
  }

  /**
   * Extracts the wrapped value from the Maybe object.
   * @returns - The wrapped value.
   */
  extract(): T {
    return this._value;
  }
}
