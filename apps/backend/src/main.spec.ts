import { ActionType, ILevelData, IEntity } from '@shared';
import { Subject, of } from 'rxjs';

import { Connection } from './connection';
import { server } from './server';
import { Game } from './game';

jest.mock('@shared', () => {
  return {
    ActionType: jest.fn().mockImplementation(() => {
      return ActionType;
    }),
    Entity: jest.fn().mockImplementation((id, coords) => {
      return { id, coords };
    }),
  };
});

jest.mock('./game', () => {
  return {
    Game: jest.fn().mockImplementation(() => {
      return {
        removeHero: () => null,
        setHero: () => null,
        setLevel: () => null,
      };
    }),
  };
});

jest.mock('./server', () => {
  return {
    Server: jest.fn().mockImplementation(() => {
      return {};
    }),
  };
});

const disconnectSubject = new Subject();

jest.mock('./connection', () => {
  return {
    Connection: jest.fn().mockImplementation(() => {
      return {
        connect$: of(null),
        disconnect$: disconnectSubject.asObservable(),
        listen: jest.fn(),
      };
    }),
  };
});

describe('Main', () => {
  let connection: Connection;
  let game: Game<IEntity, ILevelData>;

  beforeEach(() => {
    game = new Game();
    connection = new Connection(server);
  });

  it('should call removePlayer when a client disconnects', () => {
    const clientId = 'testClientId';
    const spy = jest.spyOn(game, 'removeHero');
    connection.disconnect$.subscribe((client) => game.removeHero(client.id));

    disconnectSubject.next({ id: clientId });

    expect(spy).toHaveBeenCalledWith(clientId);
  });
});
