import { Subject } from 'rxjs';

const observable = new Subject<number>();

const MIN_FRAME_MS = 17;

function scheduleNextFrame() {
  const timeout = new Promise((resolve) => {
    setTimeout(() => resolve(Number(Date.now())), MIN_FRAME_MS);
  });
  const raf = new Promise((resolve) => {
    requestAnimationFrame(() => resolve(Number(Date.now())));
  });

  Promise.race([timeout, raf]).then((timestamp: number) => {
    observable.next(timestamp);
    scheduleNextFrame();
  });
}

scheduleNextFrame();

export const frames$ = observable.asObservable();
