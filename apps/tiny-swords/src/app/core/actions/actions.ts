import { of, fromEvent, Observable, BehaviorSubject } from 'rxjs';
import { filter, first, map, switchMap, tap } from 'rxjs/operators';
import io, { Socket as WebSocket } from 'socket.io-client';
import { ActionType, IPlayer, LevelData } from '@shared';
import { MovingDirection } from '@shared';
import { LayersMap } from '../layers/layers.types';
import { Resource } from '../../entities/resource';

// TODO: need to move
const ENDPOINT = 'ws://localhost:3000';
// const ENDPOINT = 'https://tiny-swords-b4d29a0600f2.herokuapp.com/';

class Actions<T extends IPlayer<MovingDirection>, L extends LevelData<LayersMap, Resource>> {
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

  initGame(level: L): Observable<T> {
    if (this.#player) return of(null);

    return this.emit(ActionType.InitGame, this.levelToPlain(level)).pipe(
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

  updateLevel(level: L): Observable<WebSocket> {
    return this.emit(ActionType.UpdateLevel, this.levelToPlain(level));
  }

  updateLevelListener(): Observable<L> {
    return this.listen<L>(ActionType.UpdateLevel).pipe(
      map((level) => ({
        ...level,
        resources: level.resources.map(({ coords, resourceType }) => new Resource({ coords, type: resourceType })),
      })),
    );
  }

  closeGame(): void {
    this.#socketSubject.getValue().close();
  }

  private levelToPlain(level: L): L {
    return {
      ...level,
      resources: level.resources.map(({ coords, resourceType }) => ({ coords, resourceType })),
    };
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

export const actions = new Actions();
