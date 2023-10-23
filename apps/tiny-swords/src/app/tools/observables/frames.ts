import { Subject } from 'rxjs';

const observable = new Subject<number>();

const MIN_FRAME_MS = 17;

/**
 * Функция, отдающая кадры в поток. Выбирается самый быстрый метод между setTimeout и requestAnimationFrame.
 */
export function scheduleNextFrame(): void {
  const timeout = new Promise<number>((resolve) => {
    setTimeout(() => resolve(Date.now()), MIN_FRAME_MS);
  });
  const raf = new Promise<number>((resolve) => {
    requestAnimationFrame(() => resolve(Date.now()));
  });

  Promise.race([timeout, raf]).then((timestamp: number) => {
    observable.next(timestamp);
    scheduleNextFrame();
  });
}

scheduleNextFrame();

export const frames$ = observable.asObservable();
