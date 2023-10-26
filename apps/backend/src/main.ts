import { Socket } from 'socket.io';
import { Subject, filter, takeUntil, timer } from 'rxjs';

import { ActionType, ILevelData, MovingDirection, Entity, IEntity } from '@shared';

import { server } from './server';
import { Connection } from './connection';
import { Game } from './game';

const port = Number(process.env.PORT) || 3016;
const destroy$ = new Subject<void>();

/**
 * The main WebSocket server for real-time game communication.
 *
 * @type {Server}
 */
server.listen(port);

/**
 * The main game instance for managing game entities.
 *
 * @type {Game}
 */
const game = new Game();

/**
 * The WebSocket connection manager for handling client connections.
 *
 * @type {Connection}
 */
const connection = new Connection(server);

/**
 * Subscribes to WebSocket connect events and logs the connection.
 */
connection.connect$.subscribe(() => console.log('connect', game));

/**
 * Subscribes to WebSocket disconnect events and removes heroes from the game.
 */
connection.disconnect$.subscribe((client) => {
  console.log('disconnect');

  game.removeHero(client.id);
});

/**
 * Subscribes to WebSocket 'InitGame' events, initializes the hero, and triggers enemy movements.
 */
connection.listen<ILevelData>(ActionType.InitGame).subscribe(({ client, data }) => {
  const id = client.id;

  const hero = new Entity({ id, coords: data.startCoords });
  game.setHero(hero);
  game.setLevel(data);

  client.emit(ActionType.InitGame, hero);
  triggerEnemiesMovement(client);
});

/**
 * Subscribes to WebSocket 'ConnectToGame' events and handles hero connections.
 */
connection.listen(ActionType.ConnectToGame).subscribe(({ client }) => {
  if (!game.heroesCount) return;

  const hasHero = game.hasHero(client.id);

  if (hasHero) {
    console.log('The current hero has already connected to this game');

    return;
  }

  const hero = new Entity({ id: client.id, coords: game.level.startCoords });

  game.setHero(hero);
  client.emit(ActionType.ConnectToGame, hero);
  client.emit(ActionType.UpdateLevel, game.level);

  notifyCurrentHeroAboutOtherHeroes(client, hero);
  notifyCurrentHeroAboutEnemies(client);
});

/**
 * Subscribes to WebSocket 'UpdateLevel' events and updates the game level.
 */
connection.listen<ILevelData>(ActionType.UpdateLevel).subscribe(({ client, data: level }) => {
  game.setLevel(level);

  notifyOtherHeroesAboutUpdatedLevel(client, level);
  triggerEnemiesMovement(client);
});

/**
 * Subscribes to WebSocket 'UpdateHero' events and updates the hero entity.
 */
connection.listen<IEntity>(ActionType.UpdateHero).subscribe(({ client, data: currentHero }) => {
  game.setHero(currentHero);

  notifyOtherHeroesAboutUpdatedHero(client, currentHero);
});

/**
 * Subscribes to WebSocket 'UpdateEnemy' events and updates the enemy entity.
 */
connection.listen<IEntity>(ActionType.UpdateEnemy).subscribe(({ client, data: enemy }) => {
  game.setEnemy(enemy);

  notifyOtherHeroesAboutUpdatedEnemy(client, enemy);
});

/**
 * Notifies the current hero about other heroes in the game.
 *
 * @param {Socket} client - The WebSocket client.
 * @param {IEntity} currentHero - The current hero entity.
 */
function notifyCurrentHeroAboutOtherHeroes(client: Socket, currentHero: IEntity): void {
  const otherHeroes = game.getOtherHeroes(currentHero.id);

  otherHeroes.forEach((hero: Entity) => client.emit(ActionType.UpdateHero, hero));
}

/**
 * Notifies the current hero about enemies in the game.
 *
 * @param {Socket} client - The WebSocket client.
 */
function notifyCurrentHeroAboutEnemies(client: Socket): void {
  game.enemies.forEach((enemy) => client.emit(ActionType.UpdateEnemy, enemy));
}

/**
 * Notifies other heroes about an updated hero entity.
 *
 * @param {Socket} client - The WebSocket client.
 * @param {IEntity} currentHero - The updated hero entity.
 */
function notifyOtherHeroesAboutUpdatedHero(client: Socket, currentHero: IEntity): void {
  const otherHeroIds = game.getOtherHeroIds(currentHero.id);

  otherHeroIds.forEach((id: string) => client.broadcast.to(id).emit(ActionType.UpdateHero, currentHero));
}

/**
 * Notifies other heroes about an updated enemy entity.
 *
 * @param {Socket} client - The WebSocket client.
 * @param {IEntity} enemy - The updated enemy entity.
 */
function notifyOtherHeroesAboutUpdatedEnemy(client: Socket, enemy: IEntity): void {
  const otherHeroIds = game.getOtherHeroIds(client.id);

  otherHeroIds.forEach((id: string) => client.broadcast.to(id).emit(ActionType.UpdateEnemy, enemy));
}

/**
 * Notifies other heroes about an updated game level.
 *
 * @param {Socket} client - The WebSocket client.
 * @param {ILevelData} level - The updated game level data.
 */
function notifyOtherHeroesAboutUpdatedLevel(client: Socket, level: ILevelData): void {
  const otherHeroIds = game.getOtherHeroIds(client.id);

  otherHeroIds.forEach((id: string) => client.broadcast.to(id).emit(ActionType.UpdateLevel, level));
}

/**
 * Triggers the movement of enemies.
 *
 * @param {Socket} client - The WebSocket client.
 */
function triggerEnemiesMovement(client: Socket): void {
  destroy$.next();

  const directions = Object.values(MovingDirection);

  timer(0, 1000)
    .pipe(
      filter((value) => !value || value > 5),
      takeUntil(destroy$),
    )
    .subscribe((value) => {
      const otherHeroIds = game.getOtherHeroIds(client.id);

      game.enemies.forEach((enemy) => {
        if (Math.random() > 0.6 || !value) {
          const random = Math.floor(Math.random() * directions.length);
          const direction = !value ? MovingDirection.IDLE : directions[random];
          const currentEnemy = { ...enemy, direction };

          game.setEnemy(currentEnemy);

          client.emit(ActionType.UpdateEnemy, currentEnemy);

          otherHeroIds.forEach((id: string) => client.broadcast.to(id).emit(ActionType.UpdateEnemy, currentEnemy));
        }
      });
    });
}
