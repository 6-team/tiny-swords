# Real-time Multiplayer Game Server

This project is a real-time multiplayer game server built with Socket.io and RxJS. It manages game state, including heroes, enemies, and game levels, and allows multiple clients to connect and interact within the game world.

# Usage

The server provides real-time communication with clients and manages game state. It supports the following actions:

- `ActionType.InitGame`: Initializes the game with a hero and level data.
- `ActionType.ConnectToGame`: Connects a client to the existing game.
- `ActionType.UpdateLevel`: Updates the game level.
- `ActionType.UpdateHero`: Updates the hero data.
- `ActionType.UpdateEnemy`: Updates enemy data.

# Architecture

The server code is organized as follows:

- `server`: Initializes and configures the Socket.io server.
- `connection`: Manages client connections and disconnections.
- `game`: Manages the game state, including heroes, enemies, and levels.

The server uses RxJS observables to handle real-time events and updates.

# Contributing

We welcome contributions to enhance and improve this real-time multiplayer game server. Feel free to submit pull requests or open issues if you have suggestions or find any bugs.
