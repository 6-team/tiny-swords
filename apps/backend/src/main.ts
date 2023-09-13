import { server } from './server';
import { Connection } from './connection';
import { EventType, GamesMap } from '@shared';

server.listen(3000);

let gameOwnerId = null;
const gamesMap: GamesMap = new Map();

const connection = new Connection();

connection.connect$.subscribe(() => console.log('connect', gamesMap));

connection.disconnect$.subscribe((client) => {
  console.log('disconnect');

  gamesMap.delete(client.id);
});

connection.listen(EventType.InitGame).subscribe(({ client }) => {
  const id = client.id;

  gameOwnerId = id;
  const player = { id };
  gamesMap.set(id, [{ id }]);

  client.emit(EventType.InitGame, player);
});

connection.listen(EventType.ConnectToGame).subscribe(({ client }) => {
  if (!gamesMap.size) return;

  const players = gamesMap.get(gameOwnerId);
  const hasPlayer = players.find(({ id }) => client.id === id);

  if (hasPlayer) {
    console.log('The current player has alredy connected to this game');

    return;
  }

  const player = { id: client.id };

  players.push(player);
  gamesMap.set(gameOwnerId, players);

  client.emit(EventType.ConnectToGame, player);
});

// TODO: need to add interface here
connection.listen<{ id: string }>(EventType.UpdatePlayers).subscribe(({ client, data: currentPlayer }) => {
  const players = gamesMap.get(gameOwnerId);
  const playerIndex = gamesMap.get(gameOwnerId).findIndex((player) => player.id === currentPlayer.id);

  players[playerIndex] = currentPlayer;

  client.broadcast.emit(EventType.UpdatePlayers, players);
});
