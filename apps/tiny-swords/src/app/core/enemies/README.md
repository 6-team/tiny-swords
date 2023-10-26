# Enemies

`Enemies` is a TypeScript class that represents a collection of enemy characters. It provides methods for initializing, retrieving, adding, removing, and clearing enemy characters from the collection.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API](#api)
  - [initEnemy](#initEnemy)
  - [getEnemy](#getEnemy)
  - [addEnemy](#addEnemy)
  - [removeEnemy](#removeEnemy)
  - [clearEnemies](#clearEnemies)
- [Private Methods](#private-methods)
- [Instance](#instance)

## Installation

You can include this class in your project by importing it as follows:

```typescript
import { enemies } from './path-to-enemies/enemies'; // Replace with the actual path to your Enemies class
```

## Usage

To use the `Enemies` class, you can perform various actions with enemy characters. Below are some examples of how to use it:

```typescript
// Initialize an enemy character
const enemy = enemies.initEnemy(entity, bounds$, heroes$);

// Retrieve an enemy by ID
const retrievedEnemy = enemies.getEnemy(id);

// Add an enemy to the collection
enemies.addEnemy(enemy);

// Remove an enemy by ID
enemies.removeEnemy(id);

// Clear all enemies from the collection
enemies.clearEnemies();
```

## API

### initEnemy

Initializes an enemy character.

```typescript
enemies.initEnemy(entity, bounds$, heroes$);
```

- `entity` (IEntity): The entity information for the enemy.
- `bounds$` (Observable<Array<TCollisionArea>>): Observable of collision boundaries.
- `heroes$` (Observable<Array<IMovableCharacter & IAttackingCharacter>): Observable of hero characters.

Returns a newly initialized `Enemy` character.

### getEnemy

Retrieves an enemy character by its ID.

```typescript
enemies.getEnemy(id);
```

- `id` (string|number): The ID of the enemy to retrieve.

Returns the enemy character or `undefined` if not found.

### addEnemy

Adds an enemy character to the collection.

```typescript
enemies.addEnemy(enemy);
```

- `enemy` (Enemy): The enemy character to add.

### removeEnemy

Removes an enemy character from the collection by ID.

```typescript
enemies.removeEnemy(id);
```

- `id` (string|number): The ID of the enemy to remove.

### clearEnemies

Clears all enemy characters from the collection.

```typescript
enemies.clearEnemies();
```

## Private Methods

### setEnemies

Sets the enemy collection to the provided array of enemies.

```typescript
enemies.setEnemies(enemies);
```

- `enemies` (Enemy[]): The array of enemy characters.

## Instance

Represents an instance of the `Enemies` class for use.

```typescript
const enemies = new Enemies();
```

You can use this instance to interact with the enemy collection.
