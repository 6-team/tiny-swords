# TowerTile Class

The `TowerTile` class represents a tile with a tower entity in your game.

## Table of Contents

- [Overview](#overview)
- [Usage](#usage)
- [Properties](#properties)
- [Methods](#methods)
- [Installation](#installation)
- [Testing](#testing)
- [License](#license)

## Overview

The `TowerTile` class extends the `Tile` class and is used to create and manage tower tiles within your game. These tiles may contain tower entities with various configurations.

## Usage

To use the `TowerTile` class in your game, follow these steps:

### Creating a TowerTile Instance

You can create a new `TowerTile` instance by providing the type of the tower tile as an argument (optional). If the type is not specified, the default type `TowerType.TOP_LEFT` is used.

```javascript
import { TowerTile } from '@entities/tile/tower-tile';
import { TowerType } from './tower.const';

// Create a new TowerTile instance
const towerTile = new TowerTile(TowerType.MIDDLE_RIGHT);
```

In this example, a `TowerTile` instance is created with the type `TowerType.MIDDLE_RIGHT`.

### Setting the Tower Type

You can change the type of the tower using the `setType` method. The type should be one of the `TowerType` enum values.

```javascript
// Set the type of the tower tile
towerTile.setType(TowerType.BOTTOM_LEFT);
```

This code sets the type of the tower tile to `TowerType.BOTTOM_LEFT`.

### Retrieving Coordinates Map

The `TowerTile` class has a protected method `_getCoordsMap` that returns a coordinates map. You can use this method to get coordinates for different `TowerType` values.

```javascript
// Get the coordinates map for tower tiles
const coordsMap = towerTile.getCoordsMap();
```

## Properties

- `_type` (TowerType): The type of the tower tile.
- `_sprite` (string): The sprite URL for the tower tile.

## Methods

- `setType(type: TowerType)`: Sets the type of the tower tile.
- `_getCoordsMap()`: Retrieves the coordinates map for tower tiles.

## Installation

You can include the `TowerTile` class in your game project by importing it as shown in the usage examples.

```javascript
import { TowerTile } from '@entities/tile/tower-tile';
```

## Testing

You can find tests for the `TowerTile` class in the test files associated with this class. You can run these tests using a testing framework like Jest.
