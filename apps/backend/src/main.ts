import { Socket } from 'socket.io';
import { Subject, filter, takeUntil, timer } from 'rxjs';

import { ActionType, ILevelData, MovingDirection, Entity, IEntity } from '@shared';

import { server } from './server';
import { Connection } from './connection';
import { Game } from './game';

const port = Number(process.env.PORT) || 3016;
const destroy$ = new Subject<void>();

server.listen(port);

const game = new Game();
const connection = new Connection(server);

connection.connect$.subscribe(() => console.log('connect', game));

connection.disconnect$.subscribe((client) => {
  console.log('disconnect');

  game.removeHero(client.id);
});

connection.listen<ILevelData>(ActionType.InitGame).subscribe(({ client, data }) => {
  const id = client.id;

  const hero = new Entity({ id, coords: data.startCoords });
  game.setHero(hero);
  game.setLevel(data);

  client.emit(ActionType.InitGame, hero);
  triggerEnemiesMovemenet(client);
});

connection.listen(ActionType.ConnectToGame).subscribe(({ client }) => {
  if (!game.heroesCount) return;

  const hasHero = game.hasHero(client.id);

  if (hasHero) {
    console.log('The current hero has alredy connected to this game');

    return;
  }

  const hero = new Entity({ id: client.id, coords: game.level.startCoords });

  game.setHero(hero);
  client.emit(ActionType.ConnectToGame, hero);
  client.emit(ActionType.UpdateLevel, game.level);

  notifyCurrentHeroAboutOtherHeroes(client, hero);
  notifyCurrentHeroAboutEnemies(client);
});

connection.listen<ILevelData>(ActionType.UpdateLevel).subscribe(({ client, data: level }) => {
  game.setLevel(level);

  notifyOtherHeroesAboutUpdatedLevel(client, level);
  triggerEnemiesMovemenet(client);
});

connection.listen<IEntity>(ActionType.UpdateHero).subscribe(({ client, data: currentHero }) => {
  game.setHero(currentHero);

  notifyOtherHeroessAboutUpdatedHero(client, currentHero);
});

connection.listen<IEntity>(ActionType.UpdateEnemy).subscribe(({ client, data: enemy }) => {
  game.setEnemy(enemy);

  notifyOtherHeroesAboutUpdatedEnemy(client, enemy);
});

function notifyCurrentHeroAboutOtherHeroes(client: Socket, currentHero: IEntity): void {
  const otherHeroes = game.getOtherHeroes(currentHero.id);

  otherHeroes.forEach((hero: Entity) => client.emit(ActionType.UpdateHero, hero));
}

function notifyCurrentHeroAboutEnemies(client: Socket): void {
  game.enemies.forEach((enemy) => client.emit(ActionType.UpdateEnemy, enemy));
}

function notifyOtherHeroessAboutUpdatedHero(client: Socket, currentHero: IEntity): void {
  const otherHeroIds = game.getOtherHeroIds(currentHero.id);

  otherHeroIds.forEach((id: string) => client.broadcast.to(id).emit(ActionType.UpdateHero, currentHero));
}

function notifyOtherHeroesAboutUpdatedEnemy(client: Socket, enemy: IEntity): void {
  const otherHeroIds = game.getOtherHeroIds(client.id);

  otherHeroIds.forEach((id: string) => client.broadcast.to(id).emit(ActionType.UpdateEnemy, enemy));
}

function notifyOtherHeroesAboutUpdatedLevel(client: Socket, level: ILevelData): void {
  const otherHeroIds = game.getOtherHeroIds(client.id);

  otherHeroIds.forEach((id: string) => client.broadcast.to(id).emit(ActionType.UpdateLevel, level));
}

function triggerEnemiesMovemenet(client: Socket): void {
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
