import { of, fromEvent, Observable, BehaviorSubject } from 'rxjs';
import { filter, first, map, switchMap, tap } from 'rxjs/operators';
import io, { Socket as WebSocket } from 'socket.io-client';

import { ActionType, IEntity, ILevelData } from '@shared';

import { LayersMap } from '@core/layers';
import { Resource } from '@entities/resource';

/**
 * WebSocket server endpoint URL.
 * @type {string}
 */
const ENDPOINT = 'https://tiny-swords-b4d29a0600f2.herokuapp.com/';

/**
 * Class for performing real-time actions through WebSocket.
 */
export class Actions<T extends IEntity, L extends ILevelData<LayersMap, Resource>> {
  /**
   * Maintains an active WebSocket connection.
   * @type {BehaviorSubject<WebSocket>}
   * @private
   */
  private socketSubject = new BehaviorSubject<WebSocket | null>(null);

  /**
   * The player (user) performing actions.
   * @type {T}
   * @private
   */
  private player: T | null = null;

  /**
   * Stream of data for WebSocket, available only with an active connection.
   * @type {Observable<WebSocket>}
   * @private
   */
  private socket$: Observable<WebSocket> = this.socketSubject.asObservable().pipe(
    filter(Boolean),
    filter<WebSocket>((socket: WebSocket) => socket.connected),
  );

  /**
   * Creates an instance of the Actions class and initializes the WebSocket connection.
   */
  constructor() {
    of(io(ENDPOINT))
      .pipe(
        switchMap((socket) => fromEvent(socket, 'connect').pipe(map(() => socket))),
        first(),
      )
      .subscribe((socket) => this.socketSubject.next(socket));
  }

  /**
   * Initializes the game with a given level.
   * @param {L} level - The game level.
   * @returns {Observable<T>} - Stream of data with information about the current player.
   */
  initGame(level: L): Observable<T | null> {
    if (this.player) return of(null);

    return this.emit(ActionType.InitGame, this.levelToPlain(level)).pipe(
      switchMap(() => this.listen<T>(ActionType.InitGame).pipe(tap(this.setPlayer.bind(this)))),
    );
  }

  /**
   * Connects to an existing game.
   * @returns {Observable<T>} - Stream of data with information about the current player.
   */
  connectToMultipleGame(): Observable<T> {
    return this.emit(ActionType.ConnectToGame).pipe(
      switchMap(() => this.listen<T>(ActionType.ConnectToGame).pipe(tap(this.setPlayer.bind(this)))),
    );
  }

  /**
   * Subscribes to events of other players connecting to the game.
   * @returns {Observable<T>} - Stream of data with information about connected players.
   */
  connectToMultipleGameListener(): Observable<T> {
    const hasCurrentPlayer = () => !!this.player;
    const isNotCurrentUser = ({ id }: T) => id !== this.player?.id;

    return this.listen<T>(ActionType.ConnectToGame).pipe(filter(hasCurrentPlayer), filter(isNotCurrentUser));
  }

  /**
   * Updates the player's data.
   * @param {T} character - Player's data.
   * @returns {Observable<WebSocket>} - Stream of data with WebSocket information.
   */
  updatePlayer(character: T): Observable<WebSocket> {
    return this.emit(ActionType.UpdateHero, character);
  }

  /**
   * Updates the enemy's data.
   * @param {T} character - Enemy's data.
   * @returns {Observable<WebSocket>} - Stream of data with WebSocket information.
   */
  updateEnemy(character: T): Observable<WebSocket> {
    return this.emit(ActionType.UpdateEnemy, character);
  }

  /**
   * Subscribes to updates of the player's data.
   * @returns {Observable<T>} - Stream of data with information about the current player.
   */
  updatePlayerListener(): Observable<T> {
    return this.listen<T>(ActionType.UpdateHero);
  }

  /**
   * Subscribes to updates of the enemy's data.
   * @returns {Observable<T>} - Stream of data with information about the enemy.
   */
  updateEnemyListener(): Observable<T> {
    return this.listen<T>(ActionType.UpdateEnemy);
  }

  /**
   * Updates the game level data.
   * @param {L} level - The game level.
   * @returns {Observable<WebSocket>} - Stream of data with WebSocket information.
   */
  updateLevel(level: L): Observable<WebSocket> {
    return this.emit(ActionType.UpdateLevel, this.levelToPlain(level));
  }

  /**
   * Subscribes to updates of the game level data.
   * @returns {Observable<L>} - Stream of data with information about the game level.
   */
  updateLevelListener(): Observable<L> {
    return this.listen<L>(ActionType.UpdateLevel).pipe(
      map((level) => ({
        ...level,
        resources: level.resources.map(({ coords, resourceType }) => new Resource({ coords, type: resourceType })),
      })),
    );
  }

  /**
   * Closes the WebSocket game connection.
   */
  closeGame(): void {
    this.socketSubject.getValue()?.close();
  }

  /**
   * Converts the level structure to a flat structure.
   * @param {L} level - The game level.
   * @returns {L} - The flat structure of the game level.
   * @private
   */
  private levelToPlain(level: L): L {
    return {
      ...level,
      resources: level.resources.map(({ coords, resourceType }) => ({ coords, resourceType })),
    };
  }

  /**
   * Sets the current player.
   * @param {T} player - The player.
   * @private
   */
  private setPlayer(player: T): void {
    this.player = player;
  }

  /**
   * Listens to WebSocket events.
   * @param {string} event - The event name.
   * @returns {Observable<T>} - Stream of data with event information.
   * @private
   */
  private listen<T>(event: string): Observable<T> {
    return this.socket$.pipe(switchMap((socket) => fromEvent(socket, event)));
  }

  /**
   * Sends an event through WebSocket.
   * @param {string} event - The event name.
   * @param {unknown} data - Data to be sent.
   * @returns {Observable<WebSocket>} - Stream of data with WebSocket information.
   * @private
   */
  private emit(event: string, data?: unknown): Observable<WebSocket> {
    return this.socket$.pipe(switchMap((socket) => of(socket.emit(event, data))));
  }
}

/**
 * An instance of the Actions class for use.
 */
export const actions = new Actions();
