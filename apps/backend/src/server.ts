import { Server } from 'socket.io';

export const server: Server = new Server({
  cors: {
    origin: "*",
  },
  pingInterval: 2000,
  pingTimeout: 5000,
});
