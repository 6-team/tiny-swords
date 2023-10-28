# HouseSprite

The `HouseSprite` class represents a sprite with a house entity. It extends the `Sprite` class and provides functionality to manage and display house entities.

## Table of Contents

- [Usage](#usage)
- [Properties](#properties)
- [Methods](#methods)
- [Installation](#installation)

## Usage

### Creating a HouseSprite

You can create a `HouseSprite` instance with a specified house type or use the default type, which is `HouseType.TOP_LEFT`.

```javascript
import { HouseSprite } from './houseSprite';
import { HouseType } from './house.const';

// Create a HouseSprite with a specific type
const houseSprite = new HouseSprite(HouseType.TOP_LEFT);

// Create a HouseSprite with the default type (HouseType.TOP_LEFT)
const defaultHouseSprite = new HouseSprite();
```

### Setting the House Type

You can set the type of the house using the `setType` method.

```javascript
houseSprite.setType(HouseType.TOP_RIGHT);
```

## Properties

- `_type` (private): The type of the house.
- `_sprite` (private): The sprite URL for the house.

## Methods

- `setType(type: HouseType)`: Sets the type of the house.
- `_getCoordsMap()` (private): Gets the coordinates map for house.

## Installation

You can include the `HouseSprite` class in your project by importing it as shown in the usage examples.
