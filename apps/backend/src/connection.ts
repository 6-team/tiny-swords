import { of, fromEvent, Observable } from 'rxjs';
import { map, switchMap, mergeMap, takeUntil } from 'rxjs/operators';
import { server } from './server';
import { Server, Socket } from 'socket.io';
import { Response } from './interfaces';

export class Connection {
  #io$: Observable<Server> = of(server);

  connect$ = this.#io$.pipe(switchMap((io) => fromEvent(io, 'connection').pipe(map((client: Socket) => client))));

  disconnect$ = this.connect$.pipe(mergeMap((client) => fromEvent(client, 'disconnect').pipe(map(() => client))));

  listen<T>(event: string): Observable<Response<T>> {
    return this.connect$.pipe(
      mergeMap((client) =>
        fromEvent(client, event).pipe(
          takeUntil(fromEvent(client, 'disconnect')),
          map((data: T) => ({ client, data })),
        ),
      ),
    );
  }
}
