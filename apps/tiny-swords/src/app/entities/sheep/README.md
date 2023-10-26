# SheepTile

The `SheepTile` class represents a tile with a sheep entity. It extends the `Tile` class and provides functionality to manage and display sheep entities.

## Table of Contents

- [Usage](#usage)
- [Properties](#properties)
- [Methods](#methods)
- [Installation](#installation)
- [Tests](#tests)
- [License](#license)

## Usage

### Creating a SheepTile

You can create a `SheepTile` instance with a specified sheep type or use the default type, which is `SheepType.SHEEP_RIGHT`.

```javascript
import { SheepTile } from './sheepTile';
import { SheepType } from './sheep.const';

// Create a SheepTile with a specific type
const sheepTile = new SheepTile(SheepType.SHEEP_LEFT);

// Create a SheepTile with the default type (SheepType.SHEEP_RIGHT)
const defaultSheepTile = new SheepTile();
```

### Setting the Sheep Type

You can set the type of the sheep using the `setType` method.

```javascript
sheepTile.setType(SheepType.SHEEP_DOWN);
```

## Properties

- `_type` (private): The type of the sheep.
- `_sprite` (private): The sprite URL for the sheep.

## Methods

- `setType(type: SheepType)`: Sets the type of the sheep.
- `_getCoordsMap()` (private): Gets the coordinates map for sheep.

## Installation

You can include the `SheepTile` class in your project by importing it as shown in the usage examples.
