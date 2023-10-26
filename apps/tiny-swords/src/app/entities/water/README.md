# WaterTile

The `WaterTile` class represents a tile with a water entity. It extends the `Tile` class and provides functionality to manage and display water tiles.

## Table of Contents

- [Usage](#usage)
- [Properties](#properties)
- [Methods](#methods)
- [Installation](#installation)
- [Tests](#tests)
- [License](#license)

## Usage

### Creating a WaterTile

You can create a `WaterTile` instance with a specified water type or use the default type, which is `WaterType.MIDDLE_MIDDLE`.

```javascript
import { WaterTile } from './waterTile';
import { WaterType } from './water.const';

// Create a WaterTile with a specific type
const waterTile = new WaterTile(WaterType.MIDDLE_TOP);

// Create a WaterTile with the default type (WaterType.MIDDLE_MIDDLE)
const defaultWaterTile = new WaterTile();
```

### Setting the Water Type

You can set the type of the water using the `setType` method.

```javascript
waterTile.setType(WaterType.MIDDLE_BOTTOM);
```

## Properties

- `_type` (private): The type of the water.
- `_sprite` (private): The sprite URL for the water tile.

## Methods

- `setType(type: WaterType)`: Sets the type of the water.
- `_getCoordsMap()` (private): Gets the coordinates map for water tiles.

## Installation

You can include the `WaterTile` class in your project by importing it as shown in the usage examples.
