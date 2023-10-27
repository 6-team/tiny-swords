# Moving

The `Moving` class implements the `IMoving` interface and provides the functionality to manage the movement of game elements. The class translates coordinates specified in sprites into pixels, ensuring smooth movement.

## Table of Contents

- [Usage](#usage)
- [Properties](#properties)
- [Methods](#methods)
- [Installation](#installation)

## Usage

### Creating a Moving Instance

Instantiate the `Moving` class to create an instance.

```typescript
import { IMovingCharacter, IMovingProps, Moving } from './moving';

// Create Moving instance
const props: IMovingProps = {
  height: /* height in pixels */,
  width: /* width in pixels */,
  initialX: /* initial x-coordinate */,
  initialY: /* initial y-coordinate */,
  getCollisionArea: function(/* function to get collision area */) {}
};
const moving = new Moving(props);
```

### Setting the Context

Set the context or the host of this ability which is needed to call its methods, such as showing animations, changing the image, etc.

```typescript
const context: IMovingCharacter = {
  /* context properties */
};
moving.setContext(context);
```

### Moving an Element

Move an element using a specific direction.

```typescript
import { MovingDirection } from '@shared';

// Move the element to the right
moving.moveTo(MovingDirection.RIGHT);
```

## Properties

- `_context` (private): The context/host of this ability. It's an object of `IMovingCharacter` type.
- `_coords$` (private): BehaviorSubject of type `[TPixelsPosition, TPixelsPosition]`. This holds the current coordinates of the moving element.
- `coords$`: Observable of type `[TPixelsPosition, TPixelsPosition]` for subscribing to the current coordinates of the moving element.

## Methods

- `constructor({ height, width, initialX, initialY, getCollisionArea }: IMovingProps)`: Constructs an instance of the `Moving` class.
- `setContext(context: IMovingCharacter): this`: Sets the context/carrier of this ability. Returns the instance of the class.
- `moveTo(direction: MovingDirection): this`: Sets the moving direction of the element. Returns the instance of the class.
- `setCoords(coords: [TPixelsPosition, TPixelsPosition]): this`: Forcibly sets the coordinates of the character. Returns the instance of the class.
- `setCharacterDirection(direction: CharacterDirection): this`: Sets the character's direction while the character is standing still. Returns the instance of the class.
- `animate(direction: MovingDirection): this`: Sets the animation direction of the element. Returns the instance of the class.
- `getCollisionArea(): TCollisionArea`: Returns the characters collision area.
- `getNextCollisionArea(direction: MovingDirection): TCollisionArea`: Returns the characters next collision area when moving in the specified direction.

## Installation

You can include `Moving` class in your project by importing it as shown in the usage examples.
