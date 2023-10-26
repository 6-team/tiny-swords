# Game Management for Entities

## Introduction

The `Game` class provides a framework for managing heroes, enemies, and game levels. It allows you to control and interact with various game entities in a structured manner. This documentation provides an overview of the class, its properties, and methods.

## Class Overview

### Game Class

The `Game` class serves as the central entity manager for game-related data. It handles heroes, enemies, and game levels.

## Constructor

The `Game` class has no constructor parameters, as it is initialized with empty collections.

### `constructor()`

- Initializes a new instance of the `Game` class.

## Properties

### `heroesMap`

- Type: `Map<string, T>`

A map that stores hero data, where the keys are hero IDs, and the values are hero objects of type `T`.

### `enemiesMap`

- Type: `Map<string, T>`

A map that stores enemy data, where the keys are enemy IDs, and the values are enemy objects of type `T`.

### `level`

- Type: `L | null`

A property that holds the current game level data. It can be set to a `ILevelData` object or left as `null` if no level is defined.

## Methods

### `heroesCount`

- Type: `number`

This method returns the count of heroes currently in the game.

### `setHero(hero: T)`

- `hero` (type: `T`): The hero object to be added to the game.

This method sets a hero in the game by adding them to the `heroesMap`.

### `setEnemy(enemy: T)`

- `enemy` (type: `T`): The enemy object to be added to the game.

This method sets an enemy in the game by adding them to the `enemiesMap`. If the enemy is marked as "died," it will be removed from the map.

### `setLevel(level: L)`

- `level` (type: `L`): The game level data to be set.

This method sets the current game level by assigning the provided `ILevelData` to the `level` property. It also initializes enemy entities based on the provided level data.

### `getHero(id: string): T`

- `id` (type: `string`): The ID of the hero to retrieve.

This method retrieves a hero from the `heroesMap` based on the provided ID.

### `hasHero(id: string): boolean`

- `id` (type: `string`): The ID of the hero to check for existence.

This method checks if a hero with the specified ID exists in the `heroesMap`.

### `removeHero(id: string): boolean`

- `id` (type: `string`): The ID of the hero to remove.

This method removes a hero from the `heroesMap` based on the provided ID. It returns `true` if the hero was successfully removed or `false` if the hero was not found.

### `removeEnemy(id: string): boolean`

- `id` (type: `string`): The ID of the enemy to remove.

This method removes an enemy from the `enemiesMap` based on the provided ID. It returns `true` if the enemy was successfully removed or `false` if the enemy was not found.

### `getOtherHeroIds(currentPlayerId: string): (string | number)[]`

- `currentPlayerId` (type: `string`): The ID of the current hero.

This method returns an array of IDs for all other heroes in the game, excluding the hero with the specified ID.

### `getOtherHeroes(currentPlayerId: string): T[]`

- `currentPlayerId` (type: `string`): The ID of the current hero.

This method returns an array of hero objects for all other heroes in the game, excluding the hero with the specified ID.

## Usage

Here's an example of how to use the `Game` class to manage heroes, enemies, and game levels within a game:

```javascript
import { Game } from './Game'; // Replace with the actual import path
import { MovingDirection, ILevelData, IEntity } from '@shared';

const game = new Game<IEntity, ILevelData>();

// Set the game level data
const levelData: ILevelData = /* ... */;

game.setLevel(levelData);

// Add heroes and enemies
const hero1: IEntity = /* ... */;
const hero2: IEntity = /* ... */;
const enemy1: IEntity = /* ... */;

game.setHero(hero1);
game.setHero(hero2);
game.setEnemy(enemy1);

// Retrieve other hero data
const currentPlayerId = 'hero1';
const otherHeroIds = game.getOtherHeroIds(currentPlayerId);
const otherHeroes = game.getOtherHeroes(currentPlayerId);
```
