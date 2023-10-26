# Level Class

The `Level` class is responsible for managing and providing data related to different game levels, including map data, resource data, enemy coordinates, and more. It helps facilitate level transitions and data updates.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Reference](#api-reference)
  - [Constructor](#constructor)
  - [Properties](#properties)
  - [Methods](#methods)
- [Examples](#examples)

## Installation

This class is typically part of a larger project or application and is not intended for separate installation.

## Usage

To use the `Level` class in your project, you should first have an understanding of its API and how to interact with its properties and methods. Below is an overview of the class and its functionality:

## API Reference

### Constructor

#### `constructor()`

- Description: Constructs a new `Level` instance and initializes it with the next level data.
- Usage: `const level = new Level();`

### Properties

#### `data`

- Description: Retrieves the current level data.
- Type: `LevelData<LayersMap, Resource>`
- Example: `const levelData = level.data;`

#### `gridX`

- Description: Retrieves the X-coordinate of the grid.
- Type: `number`
- Example: `const xCoordinate = level.gridX;`

#### `gridY`

- Description: Retrieves the Y-coordinate of the grid.
- Type: `number`
- Example: `const yCoordinate = level.gridY;`

#### `startCoords`

- Description: Retrieves the starting coordinates as an array [x, y].
- Type: `[number, number]`
- Example: `const startCoordinates = level.startCoords;`

#### `resources`

- Description: Retrieves an array of resource objects available in the level.
- Type: `Resource[]`
- Example: `const resourceList = level.resources;`

#### `enemiesCoords`

- Description: Retrieves an array of enemy coordinates in the level.
- Type: `[[number, number]]`
- Example: `const enemyCoordinates = level.enemiesCoords;`

### Methods

#### `updateLevel(levelData: LevelData<LayersMap, Resource>)`

- Description: Updates the level data with the provided information.
- Parameters:
  - `levelData` (Type: `LevelData<LayersMap, Resource>`): The data representing the level.
- Example: `level.updateLevel(newLevelData);`

#### `updateResources(resources: Resource[])`

- Description: Updates the resource data for the level.
- Parameters:
  - `resources` (Type: `Resource[]`): An array of resource objects.
- Example: `level.updateResources(newResources);`

#### `next(): Observable<LevelData<LayersMap>>`

- Description: Generates the next level data and returns it as an observable.
- Returns: An observable that emits the next level data.
- Example:
  ```javascript
  level.next().subscribe((nextLevelData) => {
    console.log('Next level data:', nextLevelData);
  });
  ```

## Examples

Here are some usage examples for the `Level` class:

```javascript
const level = new Level();

// Retrieve level data
const levelData = level.data;

// Retrieve grid coordinates
const xCoordinate = level.gridX;
const yCoordinate = level.gridY;

// Retrieve starting coordinates
const startCoordinates = level.startCoords;

// Retrieve resource data
const resourceList = level.resources;

// Retrieve enemy coordinates
const enemyCoordinates = level.enemiesCoords;

// Update level data
level.updateLevel(newLevelData);

// Update resource data
level.updateResources(newResources);

// Generate the next level data and subscribe to it
level.next().subscribe((nextLevelData) => {
  console.log('Next level data:', nextLevelData);
});
```