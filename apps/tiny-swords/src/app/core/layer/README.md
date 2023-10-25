# Class Layer

The `Layer` class represents a tool for creating a static rendering layer and filling it with tiles. It can be used for various tasks, including generating game levels, maps, or other graphical objects.

## Class Description

The `Layer` class provides the following functionality:

- Creating a layer with a matrix of cells.
- Filling the layer based on specified conditions.
- Using the "Collapse of the wave function" algorithm to populate the layer with rules and weighted tile options.
- Getting the layer as an array.

## Usage

### Creating a Layer

```javascript
const layer = new Layer(gridX, gridY);
```

Where `gridX` and `gridY` are the width and height of the layer matrix, respectively.

### Filling the Layer

```javascript
const conditionsList = [
  // Array of conditions to fill the layer
  { tile: 'tileName', coords: [x, y], boundary: false }
];

layer.fill(conditionsList);
```

### Filling the Layer Using the "Collapse of the Wave Function" Algorithm

```javascript
const rules = {
  // Object with rules for each tile
  ['tileName']: [up, right, down, left]
};

const tileOptions = [
  // Array of tile weight options
  ['tileName', weight, boundary]
];

layer.wfc(rules, tileOptions);
```

### Getting the Layer as an Array

```javascript
const layerArray = layer.array;
```

## Example

```javascript
import { Layer } from 'layer';

// Create a 10x10 layer
const layer = new Layer(10, 10);

// Fill the layer with tiles based on conditions
const conditionsList = [
  { tile: 'tile1', coords: [3, 4], boundary: false },
  { tile: 'tile2', coords: [5, 6], boundary: true },
  // Other conditions...
];

layer.fill(conditionsList);

// Use the "Collapse of the Wave Function" algorithm to fill the remaining tiles
const rules = {
  'tile1': [true, true, false, false],
  'tile2': [false, false, true, true],
  // Other rules...
};

const tileOptions = [
  ['tile1', 0.6, false],
  ['tile2', 0.4, true],
  // Other weight options...
];

layer.wfc(rules, tileOptions);

// Get the layer as an array
const layerArray = layer.array;
```

## Dependencies

This class relies on the following dependencies:

- `Matrix` from the `../../tools/matrix/matrix` module.
- `TileName` from the `../renderer` module.
- Functions `randomElement` and `weightedRandomElement` from the `../layers/layers.utils` module.