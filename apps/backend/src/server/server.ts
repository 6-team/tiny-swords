import { Server } from 'socket.io';

/**
 * Создание экземпляра сервера WebSocket.
 *
 * @type {Server}
 * @param {object} options - Параметры сервера.
 * @param {object} options.cors - Параметры CORS (Cross-Origin Resource Sharing).
 * @param {string} options.cors.origin - Разрешенное источников для запросов (обычно "*").
 * @param {number} options.pingInterval - Интервал проверки активности соединения (в миллисекундах).
 * @param {number} options.pingTimeout - Таймаут для пинг-понг проверки (в миллисекундах).
 */
export const server: Server = new Server({
  cors: {
    origin: '*',
  },
  pingInterval: 2000,
  pingTimeout: 5000,
});
