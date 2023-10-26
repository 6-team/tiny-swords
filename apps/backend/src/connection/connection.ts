import { of, fromEvent, Observable } from 'rxjs';
import { map, switchMap, mergeMap, takeUntil } from 'rxjs/operators';
import { Server, Socket } from 'socket.io';

import { Response } from '../types';

/**
 * Represents a connection manager for handling WebSocket connections.
 *
 * @class Connection
 */
export class Connection {
  /**
   * An observable stream for connections to the WebSocket server.
   *
   * @type {Observable<Server>}
   */
  private readonly io$: Observable<Server>;

  /**
   * An observable stream for client WebSocket connections.
   *
   * @type {Observable<Socket>}
   */
  readonly connect$: Observable<Socket>;

  /**
   * An observable stream for client WebSocket disconnections.
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
   * Listens for events on connected WebSocket clients.
   *
   * @template T - The type of data expected from the event.
   * @param {string} event - The name of the event to listen for.
   * @returns {Observable<Response<T>>} - An observable stream of response data.
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
