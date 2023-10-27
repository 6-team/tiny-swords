import { Subject } from 'rxjs';

const observable = new Subject<number>();

const MIN_FRAME_MS = 17;

/**
 * This function provides frames to the stream. It selects the fastest method between setTimeout and requestAnimationFrame.
 * @export
 * @function
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

/**
 * This is an observable stream of frames.
 * @export
 * @type {Observable<number>}
 */
export const frames$ = observable.asObservable();
