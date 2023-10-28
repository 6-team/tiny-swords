# Class Sprite

## Introduction

The `Sprite` class is an abstract class representing a sprite for sprite-based graphics and animations. It is designed to provide a flexible and extensible foundation for working with animated sprites in your applications.

## Class Overview

The `Sprite` class is abstract and implements the `ISprite` interface. It is a generic class that allows you to create sprite objects with different types, which can be string, number, or symbol. Here is an overview of the class:

- `protected _sprite: string`: An abstract property representing the sprite's image path.
- `protected _type: T`: An abstract property representing the type of the sprite.
- `protected _image?: HTMLImageElement`: An optional property that stores the loaded sprite image.
- `protected _row: number`: The current animation frame row.
- `protected _col: number`: The current animation frame column.
- `protected _scale: number`: The scale factor for the sprite (default is 1).
- `protected _framePerTime: number`: The time elapsed since the previous frame was displayed.
- `protected _animationResolve?: () => void`: A function to resolve animation promises.
- `private readonly _size: number = 64`: The size of the sprite in pixels (default is 64).
- `private readonly _spriteFramesCount: number = 6`: The total number of frames in the sprite.
- `private readonly _fps: number = 10`: Frames per second for animation (default is 10).

## Class Methods

### `_load()`

Initiates the loading of an image and returns a promise. It resolves with the loaded image.

```javascript
const imagePromise = sprite._load();
```

### `setAnimation(row: number)`

Sets the animation frame by specifying the row number of the frame.

```javascript
sprite.setAnimation(1); // Set the animation frame to the second row
```

### `setAnimationOnce(row: number)`

Sets an animation, plays it once, and returns the previous animation. If the previous animation has not finished, the call is ignored, and the returned promise is rejected.

```javascript
sprite.setAnimationOnce(2)
  .then((prevAnimation) => {
    console.log(`Previous animation was on row ${prevAnimation}`);
  })
  .catch(() => {
    console.log("Animation change was ignored.");
  });
```

### `setType(type: T)`

Sets the sprite type, which determines its appearance.

```javascript
sprite.setType('player'); // Set the sprite type to 'player'
```

### `switchAnimationFrame(deltaTime: number)`

Switches the animation frame if the last frame has been displayed for a sufficient amount of time. This method is typically called in your animation loop.

```javascript
const deltaTime = 16; // Time elapsed since the previous frame was displayed
sprite.switchAnimationFrame(deltaTime);
```

### `getData()`

Loads the image of the element and returns it along with additional data. This method returns a promise that resolves with an object containing the loaded image, coordinates, size, and scale.

```javascript
sprite.getData()
  .then((data) => {
    console.log(data.image); // The loaded image
    console.log(data.coords); // Coordinates of the current frame
    console.log(data.size);   // Size of the sprite
    console.log(data.scale);  // Scale factor of the sprite
  });
```