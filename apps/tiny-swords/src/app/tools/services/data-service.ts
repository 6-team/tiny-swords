import { of, fromEvent, Observable, BehaviorSubject } from 'rxjs';
import { filter, first, map, switchMap, tap } from 'rxjs/operators';
import io, { Socket as WebSocket } from 'socket.io-client';
import { Character } from '../../character';
import { EventType } from '@shared';

// TODO: need to move
const ENDPOINT = 'ws://localhost:3000';

export class DataService<T extends Character> {
  #socketSubject = new BehaviorSubject<WebSocket>(null);
  #player: T = null;

  #socket$ = this.#socketSubject.asObservable().pipe(filter((socket) => socket?.connected));

  constructor() {
    of(io(ENDPOINT))
      .pipe(
        switchMap((socket) => fromEvent(socket, 'connect').pipe(map(() => socket))),
        first(),
      )
      .subscribe((socket) => this.#socketSubject.next(socket));
  }

  initGame(): Observable<T> {
    if (this.#player) return of(this.#player);

    return this.emit(EventType.InitGame).pipe(
      switchMap(() => this.listen<T>(EventType.InitGame).pipe(tap(this.setPlayer.bind(this)))),
    );
  }

  connectToMultipleGame(): Observable<T> {
    return this.emit(EventType.ConnectToGame).pipe(
      switchMap(() => this.listen<T>(EventType.ConnectToGame).pipe(tap(this.setPlayer.bind(this)))),
    );
  }

  connectToMultipleGameListener(): Observable<T> {
    const hasCurrentPlayer = () => !!this.#player;
    const isNotCurrentUser = ({ id }: T) => id !== this.#player.id;

    return this.listen<T>(EventType.ConnectToGame).pipe(filter(hasCurrentPlayer), filter(isNotCurrentUser));
  }

  updatePlayer(character: Character): Observable<WebSocket> {
    return this.emit(EventType.UpdatePlayers, character);
  }

  updatePlayersListener(): Observable<Character[]> {
    return this.listen<Character[]>(EventType.UpdatePlayers);
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
