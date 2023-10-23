import { Nothing } from './nothing';

/**
 * Класс, представляющий обертку Maybe.
 * Этот класс используется для безопасного обращения с возможно отсутствующими значениями, избегая ошибок null или undefined.
 */
export class Maybe<T> {
  private readonly _value: T;

  constructor(value: T) {
    this._value = value;
  }

  /**
   * Функция, возвращающая новый экземпляр Maybe или Nothing, в зависимости от выполнения переданного callback
   * @param mapper - Callback, принимающий текущее значение
   * @returns -  Новый экземпляр Maybe или Nothing.
   */
  map<R>(mapper: (prev: T) => R): Maybe<R> | Nothing<R> {
    const next = mapper(this._value);

    if (next === null || next === undefined) {
      return new Nothing(next);
    }

    return new Maybe<R>(next);
  }

  /**
   * Извлекает обернутое значение из объекта Maybe.
   * @returns - Обернутое значение.
   */
  extract(): T {
    return this._value;
  }
}
