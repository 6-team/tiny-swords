import { Subject } from 'rxjs';

const observable = new Subject<number>();

const MIN_FRAME_MS = 16;

function raf() {
  const timeoutPromise = new Promise((resolve) => {
    setTimeout(() => resolve(Number(Date.now())), MIN_FRAME_MS);
  });
  const rafPromise = new Promise((resolve) => {
    requestAnimationFrame(() => resolve(Number(Date.now())));
  });

  Promise.race([timeoutPromise, rafPromise]).then((timestamp: number) => {
    observable.next(timestamp);
    raf();
  });
}

raf();

export const frames$ = observable.asObservable();

let prev = Number(new Date());

frames$.subscribe((frame) => {
  const next = Number(new Date());
  console.log(next - prev);
  prev = next;
});
