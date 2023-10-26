# Connection Manager for WebSocket Server

## Introduction

WebSocket is a communication protocol that enables real-time, bidirectional data transfer between a client and a server. The `Connection` class is designed to facilitate the management of WebSocket connections for your server. It leverages the RxJS library to provide observables for monitoring connection events, handling messages, and responding to disconnections.

## Class Overview

### Connection Class

The `Connection` class is used to create and manage WebSocket connections. It provides observables for connection, disconnection, and message events.

## Constructor

### `constructor(server: Server)`

- `server` (type: `Server`): An instance of the WebSocket server (e.g., created with the `socket.io` library).

The constructor sets up the `Connection` object, taking the WebSocket server instance as a parameter. It initializes the connection observables.

## Properties

### `io$`

- Type: `Observable<Server>`

A stream of observables representing the WebSocket server instance.

### `connect$`

- Type: `Observable<Socket>`

A stream of observables representing client connections to the WebSocket server.

### `disconnect$`

- Type: `Observable<Socket>`

A stream of observables representing client disconnections from the WebSocket server.

## Methods

### `listen<T>(event: string): Observable<Response<T>>`

- `event` (type: `string`): The name of the event to listen for.

This method allows you to listen for events on connected WebSocket clients. It returns an observable that emits responses when the specified event occurs on a connected client.

- `T` (generic type): The type of data expected from the event.
- Returns: An observable that emits `Response` objects containing the client and the event data.

## Usage

Here's an example of how to use the `Connection` class to manage WebSocket connections:

```typescript
import { Server, Socket } from 'socket.io';
import { Connection } from './Connection';

const server = new Server();

const connection = new Connection(server);

connection.connect$.subscribe((client: Socket) => {
  console.log(`Client connected: ${client.id}`);

  connection.listen<string>('chat-message').subscribe((response) => {
    console.log(`Received message from ${response.client.id}: ${response.data}`);
  });
});
```
