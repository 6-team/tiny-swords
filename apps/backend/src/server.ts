import { Server } from 'socket.io';

export const server: Server = new Server({
  cors: {
    origin: ['http://localhost:4200', 'https://6-team.github.io/tiny-swords/'],
  },
  pingInterval: 2000,
  pingTimeout: 5000,
});
