# WebSocket Server Instance

## Introduction

The WebSocket server instance is created using the `Server` class from the `socket.io` library. This server allows real-time communication between clients and is configured with specific parameters.

## Server Instance

### `server: Server`

- Type: `Server`

The `server` constant represents an instance of the WebSocket server created using the `Server` class.

### Parameters

The WebSocket server can be configured with the following parameters:

- `cors`: An object representing Cross-Origin Resource Sharing (CORS) options. CORS is used to control access to the server from different origins. The `origin` option specifies the allowed sources for requests, usually using a wildcard '\*' to allow all sources.

- `pingInterval`: A numerical value that defines the interval at which the server checks the activity of connections. This value is specified in milliseconds.

- `pingTimeout`: A numerical value that defines the timeout for ping-pong checks. The server uses ping-pong checks to verify the responsiveness of connections. The `pingTimeout` is specified in milliseconds.

## Usage

Here's an example of how to create a WebSocket server instance with the specified configuration:

```javascript
import { Server } from 'socket.io';

const server = new Server({
  cors: {
    origin: '*',
  },
  pingInterval: 2000,
  pingTimeout: 5000,
});
```
