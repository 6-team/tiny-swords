# Resource

The `Resource` class represents a tile with a resource entity. It extends the `Tile` class and provides functionality to manage and display resource entities.

## Table of Contents

- [Usage](#usage)
- [Properties](#properties)
- [Methods](#methods)
- [Installation](#installation)

## Usage

### Creating a Resource

You can create a `Resource` instance with a specified resource type, coordinates and quantity.

```javascript
import { Resource } from './resource';
import { ResourcesType } from './resource.const';
import { TPixelsCoords } from '@abilities/abilities.types';

// Specify resource coordinates
const coords: TPixelsCoords = [10, 30, 50, 120];

// Create a Resource with a specific type, coordinates and quantity
const resource = new Resource({ type: ResourcesType.GOLD, coords, quantity: 100 });

// Resource increasing
resource.add(100);

// Resource reduction
resource.subtract(100);
```

### Setting the Resource Type

You can set the type of the resource using the `setType` method.

```javascript
resource.setType(ResourcesType.WOOD);
```

## Properties

- `_type` (protected): The type of the resource.
- `_sprite` (protected): The sprite URL for the resource.
- `_quantity` (protected): The quantity of the resource.
- `_coords` (private): The pixels coordinates of the resource.

## Methods

- `constructor({ type, coords, quantity }: IResourceConfig)`: Sets the initial type, quantity and coordinates of the resource.
- `get coords()`: Returns the coordinates of the resource.
- `get resourceType()`: Returns the type of the resource.
- `get resourceImage()`: Returns the sprite URL of the resource.
- `setType(type: ResourcesType)`: Sets the type of the resource.
- `_getCoordsMap()`: Gets the coordinates map for resource.
- `getQuantity()`: Returns the quantity of the resource.
- `add(quantity: number)`: Adds to the quantity of the resource.
- `subtract(quantity: number)`: Subtracts from the quantity of the resource.

## Installation

You can include the `Resource` class in your project by importing it as shown in the usage examples.
