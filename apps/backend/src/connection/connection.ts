import { of, fromEvent, Observable } from 'rxjs';
import { map, switchMap, mergeMap, takeUntil } from 'rxjs/operators';
import { Server, Socket } from 'socket.io';

import { Response } from '../types';

/**
 * Представляет собой менеджер соединений для обработки подключений WebSocket.
 *
 * @class Connection
 */
export class Connection {
  /**
   * Поток наблюдаемых данных для подключений к серверу WebSocket.
   *
   * @type {Observable<Server>}
   */
  private readonly io$: Observable<Server>;

  /**
   * Поток наблюдаемых данных для подключений клиентов WebSocket.
   *
   * @type {Observable<Socket>}
   */
  readonly connect$: Observable<Socket>;

  /**
   * Поток наблюдаемых данных для отключений клиентов WebSocket.
   *
   * @type {Observable<Socket>}
   */
  readonly disconnect$: Observable<Socket>;

  constructor(server: Server) {
    this.io$ = of(server);
    this.connect$ = this.io$.pipe(switchMap((io) => fromEvent(io, 'connection').pipe(map((client: Socket) => client))));
    this.disconnect$ = this.connect$.pipe(
      mergeMap((client) => fromEvent(client, 'disconnect').pipe(map(() => client))),
    );
  }

  /**
   * Ожидает события на подключенных клиентах WebSocket.
   *
   * @template T - Тип данных, ожидаемых из события.
   * @param {string} event - Имя события для прослушивания.
   * @returns {Observable<Response<T>>} - Поток наблюдаемых данных ответов.
   */
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
