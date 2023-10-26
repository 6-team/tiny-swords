import { Server } from 'socket.io';

/**
 * Creates an instance of a WebSocket server.
 *
 * @type {Server}
 * @param {object} options - Server parameters.
 * @param {object} options.cors - CORS (Cross-Origin Resource Sharing) parameters.
 * @param {string} options.cors.origin - Allowed origins for requests (usually "*").
 * @param {number} options.pingInterval - Connection activity check interval (in milliseconds).
 * @param {number} options.pingTimeout - Ping-pong check timeout (in milliseconds).
 */
export const server: Server = new Server({
  cors: {
    origin: '*',
  },
  pingInterval: 2000,
  pingTimeout: 5000,
});
