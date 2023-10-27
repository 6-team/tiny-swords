# Renderer Class

This class that handles all the rendering tasks. It's responsible for creating instances and rendering static, animated, and moveable game objects.

## Class Usage

```typescript
import { Renderer } from './renderer';

const rendererConfig = {
  canvas: document.getElementById('game-canvas'),
  grid: someGrid, // Replace with actual IGrid object
  scale: 1,
};
const renderer = new Renderer(rendererConfig);
```

## Methods

Below are descriptions of each method provided by the Renderer class:

### clear

The clear method is used to clear the entire canvas. It doesn't take any arguments.

```typescript
renderer.clear();
```

### render

The render method is used to render a static in-game element. Method arguments include the size and placement of the element and the specific sprite to be rendered.

```typescript
sprite = someSprite; // ISprite object
elementPxCoords = [0, 0, 100, 100]; // x, y, width, height in pixels
renderer.render(elementPxCoords, sprite);
```

### renderWithAnimation

Used to add animation to a static in-game sprite, it accepts the same arguments as render, with an additional deltaTime argument to decide the duration of the animation.

```typescript
deltaTime = 1000; // milliseconds
renderer.renderWithAnimation(elementPxCoords, sprite, deltaTime);
```

### renderMovable

The renderMovable method is used for rendering an in-game element that can move such as characters or enemies.

```typescript
renderer.renderMovable(movableSprite, deltaTime);
```

### renderStaticLayer and renderMovableLayer

To add an entire layer of static game elements or moveable game characters all at once, use renderStaticLayer and renderMovableLayer respectively. The argument to these methods is the layer itself as a 2D array for static elements or an array of movable characters.

```typescript
renderer.renderStaticLayer(map);
renderer.renderMovableLayer(movables);
```

### renderHealthBar

To draw a health bar, the renderHealthBar method accepts an object with total lives, available lives, and blocked lives.

```typescript
renderer.renderHealthBar({ totalLives: 5, availableLives: 3, blockedLives: 2 });
```

### renderResourcesBar

The renderResourcesBar method is used for rendering a character's resource bar. It accepts an array of resources.

```typescript
renderer.renderResourcesBar([resource1, resource2, resource3]);
```
