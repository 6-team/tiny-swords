import { Subject } from 'rxjs';

/**
 * Создает поток вокруг интервала, то есть значения в него приходят с указанным интервалом
 *
 * @param ms Количество милисекунд
 * @returns Поток милисекунд
 */
const createInterval = (ms: number) => {
  const observable = new Subject<number>();

  function createTimeout() {
    setTimeout(() => {
      observable.next(Date.now());
      createTimeout();
    }, ms);
  }

  createTimeout();

  return observable.asObservable();
};

export const animationInterval$ = createInterval(12);
