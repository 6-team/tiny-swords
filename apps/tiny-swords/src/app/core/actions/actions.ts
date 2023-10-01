import { of, fromEvent, Observable, BehaviorSubject } from 'rxjs';
import { filter, first, map, switchMap, tap } from 'rxjs/operators';
import io, { Socket as WebSocket } from 'socket.io-client';
import { ActionType, IPlayer } from '@shared';
import { MovingDirection } from '@shared';

// TODO: need to move
const ENDPOINT = 'ws://localhost:3000';

export class Actions<T extends IPlayer<MovingDirection>> {
  private static _instance: Actions<any>;

  #socketSubject = new BehaviorSubject<WebSocket>(null);
  #player: T = null;

  #socket$ = this.#socketSubject.asObservable().pipe(filter((socket) => socket?.connected));

  constructor() {
    if (Actions._instance === undefined) {
      Actions._instance = this;

      of(io(ENDPOINT))
        .pipe(
          switchMap((socket) => fromEvent(socket, 'connect').pipe(map(() => socket))),
          first(),
        )
        .subscribe((socket) => this.#socketSubject.next(socket));
    }

    return Actions._instance;
  }

  initGame(): Observable<T> {
    if (this.#player) return of(null);

    return this.emit(ActionType.InitGame).pipe(
      switchMap(() => this.listen<T>(ActionType.InitGame).pipe(tap(this.setPlayer.bind(this)))),
    );
  }

  connectToMultipleGame(): Observable<T> {
    return this.emit(ActionType.ConnectToGame).pipe(
      switchMap(() => this.listen<T>(ActionType.ConnectToGame).pipe(tap(this.setPlayer.bind(this)))),
    );
  }

  connectToMultipleGameListener(): Observable<T> {
    const hasCurrentPlayer = () => !!this.#player;
    const isNotCurrentUser = ({ id }: T) => id !== this.#player.id;

    return this.listen<T>(ActionType.ConnectToGame).pipe(filter(hasCurrentPlayer), filter(isNotCurrentUser));
  }

  updatePlayer(character: T): Observable<WebSocket> {
    return this.emit(ActionType.UpdatePlayer, character);
  }

  updatePlayerListener(): Observable<T> {
    return this.listen<T>(ActionType.UpdatePlayer);
  }

  closeGame(): void {
    this.#socketSubject.getValue().close();
  }

  private setPlayer(player: T): void {
    this.#player = player;
  }

  private listen<T>(event: string): Observable<T> {
    return this.#socket$.pipe(switchMap((socket) => fromEvent(socket, event)));
  }

  private emit(event: string, data?: unknown): Observable<WebSocket> {
    return this.#socket$.pipe(switchMap((socket) => of(socket.emit(event, data))));
  }
}
