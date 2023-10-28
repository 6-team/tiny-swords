# Enemy

The `Enemy` class represents an enemy character. It extends the `Character` class and provides functionality for moving and fighting. It also includes abilities specific to enemies.

## Table of Contents

- [Usage](#usage)
- [Properties](#properties)
- [Methods](#methods)
- [Installation](#installation)

## Usage

### Creating an Enemy

You can create an `Enemy` instance by providing a configuration object with the required parameters.

```javascript
import { Enemy, EnemyType } from './enemy';

// Create an Enemy instance
const enemy = new Enemy({
  height: 64,
  width: 64,
  initialX: 0,
  initialY: 0,
  initialDirection: 'up',
  id: 'enemy1',
});
```

### Accessing Enemy Abilities

You can access the different abilities of the Enemy, such as moving and fighting.

```javascript
// Access the moving ability
const movingAbility = enemy.moving;

// Access the fighting ability
const fightingAbility = enemy.fighting;
```

### Setting the Enemy Type

The Enemy type is set internally and cannot be changed directly through a method.

## Properties

- `_sprite` (private): The sprite URL for the enemy.
- `_type` (private): The type of the enemy.
- `_size` (private): The size of the enemy.
- `_sounds` (private): The sounds of the enemy.

## Methods

- `get moving()`: Gets the moving ability of the enemy.
- `get fighting()`: Gets the fighting ability of the enemy.
- `_initSounds(abilities: { moving: IMoving; fighting: IFighting }): void` (private): Initializes the sounds for the enemy.
- `_getCoordsMap()`: Gets the coordinates map for the enemy.

## Installation

You can include the `Enemy` class in your project by importing it as shown in the usage examples.
