import { Server } from 'socket.io';

export const server: Server = new Server({
  cors: {
    origin: 'http://localhost:4200',
  },
  pingInterval: 2000,
  pingTimeout: 5000,
});
