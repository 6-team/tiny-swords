# TowerSprite Class

The `TowerSprite` class represents a sprite with a tower entity in your game.

## Table of Contents

- [Overview](#overview)
- [Usage](#usage)
- [Properties](#properties)
- [Methods](#methods)
- [Installation](#installation)
- [Testing](#testing)
- [License](#license)

## Overview

The `TowerSprite` class extends the `Sprite` class and is used to create and manage tower sprites within your game. These sprites may contain tower entities with various configurations.

## Usage

To use the `TowerSprite` class in your game, follow these steps:

### Creating a TowerSprite Instance

You can create a new `TowerSprite` instance by providing the type of the tower sprite as an argument (optional). If the type is not specified, the default type `TowerType.TOP_LEFT` is used.

```javascript
import { TowerSprite } from '@entities/sprite/tower-sprite';
import { TowerType } from './tower.const';

// Create a new TowerSprite instance
const towerSprite = new TowerSprite(TowerType.MIDDLE_RIGHT);
```

In this example, a `TowerSprite` instance is created with the type `TowerType.MIDDLE_RIGHT`.

### Setting the Tower Type

You can change the type of the tower using the `setType` method. The type should be one of the `TowerType` enum values.

```javascript
// Set the type of the tower sprite
towerSprite.setType(TowerType.BOTTOM_LEFT);
```

This code sets the type of the tower sprite to `TowerType.BOTTOM_LEFT`.

### Retrieving Coordinates Map

The `TowerSprite` class has a protected method `_getCoordsMap` that returns a coordinates map. You can use this method to get coordinates for different `TowerType` values.

```javascript
// Get the coordinates map for tower sprites
const coordsMap = towerSprite.getCoordsMap();
```

## Properties

- `_type` (TowerType): The type of the tower sprite.
- `_sprite` (string): The sprite URL for the tower sprite.

## Methods

- `setType(type: TowerType)`: Sets the type of the tower sprite.
- `_getCoordsMap()`: Retrieves the coordinates map for tower sprites.

## Installation

You can include the `TowerSprite` class in your game project by importing it as shown in the usage examples.

```javascript
import { TowerSprite } from '@entities/sprite/tower-sprite';
```

## Testing

You can find tests for the `TowerSprite` class in the test files associated with this class. You can run these tests using a testing framework like Jest.
