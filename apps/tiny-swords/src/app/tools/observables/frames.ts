import { Subject } from 'rxjs';

const observable = new Subject<number>();

function raf() {
  requestAnimationFrame((number) => {
    observable.next(number);

    raf();
  });
}

raf();

export const frames$ = observable.asObservable();
