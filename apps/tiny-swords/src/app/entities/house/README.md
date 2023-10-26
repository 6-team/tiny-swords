# HouseTile

The `HouseTile` class represents a tile with a house entity. It extends the `Tile` class and provides functionality to manage and display house entities.

## Table of Contents

- [Usage](#usage)
- [Properties](#properties)
- [Methods](#methods)
- [Installation](#installation)
- [Tests](#tests)
- [License](#license)

## Usage

### Creating a HouseTile

You can create a `HouseTile` instance with a specified house type or use the default type, which is `HouseType.TOP_LEFT`.

```javascript
import { HouseTile } from './houseTile';
import { HouseType } from './house.const';

// Create a HouseTile with a specific type
const houseTile = new HouseTile(HouseType.TOP_LEFT);

// Create a HouseTile with the default type (HouseType.TOP_LEFT)
const defaultHouseTile = new HouseTile();
```

### Setting the House Type

You can set the type of the house using the `setType` method.

```javascript
houseTile.setType(HouseType.TOP_RIGHT);
```

## Properties

- `_type` (private): The type of the house.
- `_sprite` (private): The sprite URL for the house.

## Methods

- `setType(type: HouseType)`: Sets the type of the house.
- `_getCoordsMap()` (private): Gets the coordinates map for house.

## Installation

You can include the `HouseTile` class in your project by importing it as shown in the usage examples.
