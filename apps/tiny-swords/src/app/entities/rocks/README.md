# RocksSprite

The `RocksSprite` class represents a sprite with a rocks entity. It extends the `Sprite` class and provides functionality to manage and display rocks entities.

## Table of Contents

- [Usage](#usage)
- [Properties](#properties)
- [Methods](#methods)
- [Installation](#installation)

## Usage

### Creating a RocksSprite

You can create a `RocksSprite` instance with a specified rocks type or use the default type, which is `RocksType.ROCKS_M`.

```javascript
import { RocksSprite } from './rocksSprite';
import { RocksType } from './rocks.const';

// Create a RocksSprite with a specific type
const rocksSprite = new RocksSprite(RocksType.ROCKS_M);

// Create a RocksSprite with the default type (RocksType.ROCKS_M)
const defaultRocksSprite = new RocksSprite();
```

### Setting the Rocks Type

You can set the type of the rocks using the `setType` method.

```javascript
rocksSprite.setType(RocksType.ROCKS_M);
```

## Properties

- `_type` (private): The type of the rocks.
- `_sprite` (private): The sprite URL for the rocks.

## Methods

- `setType(type: RocksType)`: Sets the type of the rocks.
- `_getCoordsMap()` (private): Gets the coordinates map for rocks.

## Installation

You can include the `RocksSprite` class in your project by importing it as shown in the usage examples.
