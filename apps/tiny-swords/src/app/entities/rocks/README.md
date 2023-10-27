# RocksTile

The `RocksTile` class represents a tile with a rocks entity. It extends the `Tile` class and provides functionality to manage and display rocks entities.

## Table of Contents

- [Usage](#usage)
- [Properties](#properties)
- [Methods](#methods)
- [Installation](#installation)

## Usage

### Creating a RocksTile

You can create a `RocksTile` instance with a specified rocks type or use the default type, which is `RocksType.ROCKS_M`.

```javascript
import { RocksTile } from './rocksTile';
import { RocksType } from './rocks.const';

// Create a RocksTile with a specific type
const rocksTile = new RocksTile(RocksType.ROCKS_M);

// Create a RocksTile with the default type (RocksType.ROCKS_M)
const defaultRocksTile = new RocksTile();
```

### Setting the Rocks Type

You can set the type of the rocks using the `setType` method.

```javascript
rocksTile.setType(RocksType.ROCKS_M);
```

## Properties

- `_type` (private): The type of the rocks.
- `_sprite` (private): The sprite URL for the rocks.

## Methods

- `setType(type: RocksType)`: Sets the type of the rocks.
- `_getCoordsMap()` (private): Gets the coordinates map for rocks.

## Installation

You can include the `RocksTile` class in your project by importing it as shown in the usage examples.
