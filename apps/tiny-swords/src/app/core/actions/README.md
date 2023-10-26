# WebSocket Actions Class

This class simplifies WebSocket communication for real-time applications. It allows you to perform real-time actions through WebSocket connections.

## Installation

There's no specific installation required for this class. You can include it in your TypeScript project by following the usage instructions below.

## Usage

### Initialization

First, include the class in your TypeScript file:

```typescript
import { Actions } from './Actions';
```

Create an instance of the Actions class:

```typescript
const actions = new Actions();
```

### WebSocket Connection

The class automatically establishes a WebSocket connection when you create an instance of the Actions class. The default server URL is 'https://tiny-swords-b4d29a0600f2.herokuapp.com/'. You can change the server URL by modifying the ENDPOINT constant in the class.

### Performing Actions

The class provides various methods for real-time actions, including:

- initGame(level: LevelData): Initializes the game with a given level.
- connectToMultipleGame(): Connects to an existing game.
- updatePlayer(playerData: Entity): Updates the player's data.
- updateEnemy(enemyData: Entity): Updates the enemy's data.
- updateLevel(level: LevelData): Updates the game level data.
- closeGame(): Closes the WebSocket game connection.

You can also subscribe to events by using methods like updatePlayerListener(), updateEnemyListener(), and updateLevelListener() to receive real-time updates and data from the server.

### Example

Here's an example of how to use this class to perform actions:

```typescript
import { Actions } from './Actions';

const actions = new Actions();

// Initialize the game
actions
  .initGame({
    /* Your level data here */
  })
  .then((player) => {
    if (player) {
      console.log('Player initialized:', player);
    }
  });

// Listen for updates from the server
actions.updatePlayerListener().subscribe((player) => {
  console.log('Player updated:', player);
});
```

## Closing the Connection

To close the WebSocket connection, use the closeGame() method:

```typescript
actions.closeGame();
```

This terminates the WebSocket connection and prevents further communication with the server.
