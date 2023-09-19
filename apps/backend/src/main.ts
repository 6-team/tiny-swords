import { server } from './server';
import { Connection } from './connection';
import { ActionType, Game, Player } from '@shared';
import { Socket } from 'socket.io';

server.listen(3000);

const game = new Game();
const connection = new Connection();

connection.connect$.subscribe(() => console.log('connect', game));

connection.disconnect$.subscribe((client) => {
  console.log('disconnect');

  game.removePlayer(client.id);
});

connection.listen(ActionType.InitGame).subscribe(({ client }) => {
  const id = client.id;

  const player = new Player(id);
  game.setPlayer(player);

  client.emit(ActionType.InitGame, player);
});

connection.listen(ActionType.ConnectToGame).subscribe(({ client }) => {
  if (!game.playersCount) return;

  const hasPlayer = game.hasPlayer(client.id);

  if (hasPlayer) {
    console.log('The current player has alredy connected to this game');

    return;
  }

  const player = new Player(client.id);

  game.setPlayer(player);
  client.emit(ActionType.ConnectToGame, player);

  notifyCurrentPlayerAboutOtherPlayers(client, player);
});

connection.listen<Player>(ActionType.UpdatePlayer).subscribe(({ client, data: currentPlayer }) => {
  game.setPlayer(currentPlayer);

  notifyOtherPlayersAboutUpdatedPlayer(client, currentPlayer);
});

function notifyCurrentPlayerAboutOtherPlayers(client: Socket, player: Player): void {
  const otherPlayers = game.getOtherPlayers(player.id);

  client.emit(ActionType.ConnectToGame, player);

  otherPlayers.forEach((player: Player) => client.emit(ActionType.UpdatePlayer, player));
}

function notifyOtherPlayersAboutUpdatedPlayer(client: Socket, currentPlayer: Player): void {
  const otherPlayerIds = game.getOtherPlayerIds(currentPlayer.id);

  otherPlayerIds.forEach((id: string) => client.broadcast.to(id).emit(ActionType.UpdatePlayer, currentPlayer));
}
