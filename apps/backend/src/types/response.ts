import { Socket } from 'socket.io';

export interface Response<T> {
  client: Socket;
  data: T;
}
