# WaterSprite

The `WaterSprite` class represents a sprite with a water entity. It extends the `Sprite` class and provides functionality to manage and display water sprites.

## Table of Contents

- [Usage](#usage)
- [Properties](#properties)
- [Methods](#methods)
- [Installation](#installation)
- [Tests](#tests)
- [License](#license)

## Usage

### Creating a WaterSprite

You can create a `WaterSprite` instance with a specified water type or use the default type, which is `WaterType.MIDDLE_MIDDLE`.

```javascript
import { WaterSprite } from './waterSprite';
import { WaterType } from './water.const';

// Create a WaterSprite with a specific type
const waterSprite = new WaterSprite(WaterType.MIDDLE_TOP);

// Create a WaterSprite with the default type (WaterType.MIDDLE_MIDDLE)
const defaultWaterSprite = new WaterSprite();
```

### Setting the Water Type

You can set the type of the water using the `setType` method.

```javascript
waterSprite.setType(WaterType.MIDDLE_BOTTOM);
```

## Properties

- `_type` (private): The type of the water.
- `_sprite` (private): The sprite URL for the water sprite.

## Methods

- `setType(type: WaterType)`: Sets the type of the water.
- `_getCoordsMap()` (private): Gets the coordinates map for water sprites.

## Installation

You can include the `WaterSprite` class in your project by importing it as shown in the usage examples.
