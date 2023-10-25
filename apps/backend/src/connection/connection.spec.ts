import { Connection } from './Connection';
import { Server } from 'socket.io';

describe('Connection', () => {
  let connection: Connection;
  const mockServer = { on: jest.fn() } as unknown as Server;

  beforeEach(() => {
    connection = new Connection(mockServer);
  });

  describe('constructor', () => {
    it('should create an instance of Connection', () => {
      expect(connection).toBeInstanceOf(Connection);
    });

    it('should set the connect$ and disconnect$ observables', () => {
      expect(connection.connect$).toBeDefined();
      expect(connection.disconnect$).toBeDefined();
    });
  });
});
