# SheepSprite

The `SheepSprite` class represents a sprite with a sheep entity. It extends the `Sprite` class and provides functionality to manage and display sheep entities.

## Table of Contents

- [Usage](#usage)
- [Properties](#properties)
- [Methods](#methods)
- [Installation](#installation)
- [Tests](#tests)
- [License](#license)

## Usage

### Creating a SheepSprite

You can create a `SheepSprite` instance with a specified sheep type or use the default type, which is `SheepType.SHEEP_RIGHT`.

```javascript
import { SheepSprite } from './sheepSprite';
import { SheepType } from './sheep.const';

// Create a SheepSprite with a specific type
const sheepSprite = new SheepSprite(SheepType.SHEEP_LEFT);

// Create a SheepSprite with the default type (SheepType.SHEEP_RIGHT)
const defaultSheepSprite = new SheepSprite();
```

### Setting the Sheep Type

You can set the type of the sheep using the `setType` method.

```javascript
sheepSprite.setType(SheepType.SHEEP_DOWN);
```

## Properties

- `_type` (private): The type of the sheep.
- `_sprite` (private): The sprite URL for the sheep.

## Methods

- `setType(type: SheepType)`: Sets the type of the sheep.
- `_getCoordsMap()` (private): Gets the coordinates map for sheep.

## Installation

You can include the `SheepSprite` class in your project by importing it as shown in the usage examples.
