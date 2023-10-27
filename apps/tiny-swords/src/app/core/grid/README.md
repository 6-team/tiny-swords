# Class Grid

## Introduction

The `Grid` class is designed to represent a grid for sprite-based graphics. It offers various methods and properties to work with grid coordinates and pixel coordinates in a sprite-based environment. This readme provides an overview of the class and its functionality.

## Usage

### Creating a Grid Instance

You can create an instance of the `Grid` class by providing the sprite size, the maximum number of sprites in the X direction, and the maximum number of sprites in the Y direction.

```javascript
const grid = new Grid({
  spriteSize: 64, // Example sprite size in pixels
  maxX: SIZE_X, // Maximum number of sprites in the X direction
  maxY: SIZE_Y, // Maximum number of sprites in the Y direction
});
```

### Properties

#### `spriteSize`

You can access the size of each sprite in pixels using the `spriteSize` property.

```javascript
const spriteSize = grid.spriteSize; // Get the sprite size in pixels
```

### Methods

#### `transformToPixels`

This method allows you to transform sprite coordinates to pixel coordinates. It takes the X and Y coordinates of the sprite, as well as the height and width of the sprite, and returns an array representing pixel coordinates and dimensions.

```javascript
const [pxX, pxY, pxHeight, pxWidth] = grid.transformToPixels(x, y, height, width);
```

#### `transformToSprites`

This method transforms pixel coordinates to sprite coordinates. It takes the X and Y coordinates in pixels, as well as the height and width in pixels, and returns an array representing sprite coordinates and dimensions.

```javascript
const [spriteX, spriteY, spriteHeight, spriteWidth] = grid.transformToSprites(pxX, pxY, pxHeight, pxWidth);
```

#### `getPrevPixels` and `getNextPixels`

These methods are used to get the previous and next pixel positions based on the grid's sprite size. You can use them to calculate adjacent pixel positions.

```javascript
const prevX = grid.getPrevPixels(currentX); // Get the previous pixel position
const nextX = grid.getNextPixels(currentX); // Get the next pixel position
```

## Predefined Grid Instance

A predefined `Grid` instance with a sprite size of 64 pixels is available as `grid64`. You can use this instance without the need to create a new one.

```javascript
import { grid64 } from './your-grid-module';

// You can now use grid64 directly without creating a new instance
const [pxX, pxY, pxHeight, pxWidth] = grid64.transformToPixels(x, y, height, width);
```