import { server } from './server';
import { Connection } from './connection';
import { ActionType, Game, LevelData, MovingDirection, Player } from '@shared';
import { Socket } from 'socket.io';
import { Subject, takeUntil, timer } from 'rxjs';

const port = Number(process.env.PORT) || 3000;
const destroy$ = new Subject<void>();

server.listen(port);

const game = new Game();
const connection = new Connection();

connection.connect$.subscribe(() => console.log('connect', game));

connection.disconnect$.subscribe((client) => {
  console.log('disconnect');

  game.removePlayer(client.id);
});

connection.listen<LevelData>(ActionType.InitGame).subscribe(({ client, data }) => {
  const id = client.id;

  const player = new Player(id, data.startCoords);
  game.setPlayer(player);
  game.setLevel(data);

  client.emit(ActionType.InitGame, player);
  triggerEnemiesMovemenet(client);
});

connection.listen(ActionType.ConnectToGame).subscribe(({ client }) => {
  if (!game.playersCount) return;

  const hasPlayer = game.hasPlayer(client.id);

  if (hasPlayer) {
    console.log('The current player has alredy connected to this game');

    return;
  }

  const player = new Player(client.id, game.level.startCoords);

  game.setPlayer(player);
  client.emit(ActionType.ConnectToGame, player);
  client.emit(ActionType.UpdateLevel, game.level);

  notifyCurrentPlayerAboutOtherPlayers(client, player);
  notifyCurrentPlayerAboutEnemies(client);
});

connection.listen<LevelData>(ActionType.UpdateLevel).subscribe(({ client, data: level }) => {
  game.setLevel(level);

  notifyOtherPlayersAboutUpdatedLevel(client, level);
  triggerEnemiesMovemenet(client);
});

connection.listen<Player>(ActionType.UpdatePlayer).subscribe(({ client, data: currentPlayer }) => {
  game.setPlayer(currentPlayer);

  notifyOtherPlayersAboutUpdatedPlayer(client, currentPlayer);
});

connection.listen<Player>(ActionType.UpdateEnemy).subscribe(({ client, data: enemy }) => {
  game.setEnemy(enemy);

  notifyOtherPlayersAboutUpdatedEnemy(client, enemy);
});

function notifyCurrentPlayerAboutOtherPlayers(client: Socket, player: Player): void {
  const otherPlayers = game.getOtherPlayers(player.id);

  otherPlayers.forEach((player: Player) => client.emit(ActionType.UpdatePlayer, player));
}

function notifyCurrentPlayerAboutEnemies(client: Socket): void {
  game.enemies.forEach((enemy) => client.emit(ActionType.UpdateEnemy, enemy));
}

function notifyOtherPlayersAboutUpdatedPlayer(client: Socket, currentPlayer: Player): void {
  const otherPlayerIds = game.getOtherPlayerIds(currentPlayer.id);

  otherPlayerIds.forEach((id: string) => client.broadcast.to(id).emit(ActionType.UpdatePlayer, currentPlayer));
}

function notifyOtherPlayersAboutUpdatedEnemy(client: Socket, enemy: Player): void {
  const otherPlayerIds = game.getOtherPlayerIds(client.id);

  otherPlayerIds.forEach((id: string) => client.broadcast.to(id).emit(ActionType.UpdateEnemy, enemy));
}

function notifyOtherPlayersAboutUpdatedLevel(client: Socket, level: LevelData): void {
  const otherPlayerIds = game.getOtherPlayerIds(client.id);

  otherPlayerIds.forEach((id: string) => client.broadcast.to(id).emit(ActionType.UpdateLevel, level));
}

function triggerEnemiesMovemenet(client: Socket): void {
  destroy$.next();

  const directions = Object.values(MovingDirection);

  timer(0, 5000)
    .pipe(takeUntil(destroy$))
    .subscribe((value) => {
      const otherPlayerIds = game.getOtherPlayerIds(client.id);

      game.enemies.forEach((enemy) => {
        const random = Math.floor(Math.random() * directions.length);
        const direction = !value ? MovingDirection.IDLE : directions[random];
        const currentEnemy = { ...enemy, direction };

        game.setEnemy(currentEnemy);

        client.emit(ActionType.UpdateEnemy, currentEnemy);

        otherPlayerIds.forEach((id: string) => client.broadcast.to(id).emit(ActionType.UpdateEnemy, currentEnemy));
      });
    });
}
