# Layers Class

The `Layers` class is designed for creating an array of layers for static rendering based on the level type. It offers a versatile solution for managing and rendering different elements of a game level, including terrain, buildings, decorations, and more.

## Class Description

The `Layers` class provides the following features:

- Creation of an array of layers based on the level type.
- Management of terrain, buildings, decorations, water, shadows, signs, and other elements.
- Retrieval of boundary coordinates for collision detection.
- Generation of maps for rendering.
- Access to resource objects and enemy initialization coordinates.

## Usage

### Creating a `Layers` Instance

```javascript
const layers = new Layers(level, nextLevel, gridX, gridY, border);
```

- `level`: The type of the current level (e.g., `LevelType.Ground`, `LevelType.Sand`, `LevelType.Stones`).
- `nextLevel`: The type of the next level.
- `gridX`: The size of the layer matrix by width.
- `gridY`: The size of the layer matrix in height.
- `border`: Border size.

### Retrieving Boundaries for Collisions

```javascript
const boundaries = layers.boundaries;
```

- `boundaries`: An array of coordinates representing boundaries for collisions with static map objects.

### Generating Maps for Rendering

```javascript
const maps = layers.maps;
```

- `maps`: An array of maps with coordinates suitable for rendering.

### Accessing Resource Objects

```javascript
const resources = layers.resources;
```

- `resources`: An array of resource objects.

### Accessing Enemy Initialization Coordinates

```javascript
const enemyCoordinates = layers.enemies;
```

- `enemyCoordinates`: An array of coordinates for initializing enemies.

## Dependencies

The `Layers` class depends on several other classes and modules, including `GroundLayer`, `WaterLayer`, `ShadowLayer`, `DecoLayer`, `BuildingsLayer`, `SignLayer`, `ForegroundLayer`, `SandLayer`, `LevelType`, `Resource`, `grid64`, `ResourcesLayer`, `EnemiesLayer`, `StonesLayer`, and `ElevationLayer`.
[Layers list](https://github.com/6-team/tiny-swords/tree/main/apps/tiny-swords/src/app/core/layers/kinds)

## Example

```javascript
import { Layers, LevelType } from 'layers';

// Create an instance of Layers for a Ground level
const layers = new Layers(LevelType.Ground, LevelType.Sand, 10, 10, 2);

// Retrieve boundaries for collisions
const boundaries = layers.boundaries;

// Generate maps for rendering
const maps = layers.maps;

// Access resource objects
const resources = layers.resources;

// Get enemy initialization coordinates
const enemyCoordinates = layers.enemies;
```