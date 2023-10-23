/**
 * Класс, представляющий обертку Nothing.
 * Этот класс используется для безопасного обращения с отсутствующими значениями, избегая ошибок null или undefined.
 */
export class Nothing<T> {
  private readonly _value: T;

  constructor(value: T) {
    this._value = value;
  }

  /**
   * Функция, возвращающая новый экземпляр Nothing, в зависимости от выполнения переданного callback.
   * @param _ - Функция для применения к обернутому значению.
   * @returns -  Возвращает текущий экземпляр.
   */
  map<R>(_?: (prev: T) => R): this {
    return this;
  }

  /**
   * Извлекает обернутое значение из объекта Nothing.
   * @returns -  Обернутое значение.
   */
  extract(): T {
    return this._value;
  }
}
