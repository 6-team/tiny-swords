
# Collisions

The `Collisions` class provides functionality for collision detection within a game. It allows developers to prevent characters from moving beyond certain bounds and into other characters.

## Usage

Import and use the `Collisions` class as shown in the example below.

```typescript
const collisions = new Collisions();

// Check if two areas are colliding
let hasCollision: boolean = collisions.hasCollision(area1, area2);

// Prevent character collision and movement beyond certain bounds
let characterMovement$: Observable<MovingDirection> = collisions.preventBoundsDecorator({
  character: someCharacter,
  otherCharacters$: otherCharactersObservable,
  bounds$: boundsObservable,
  originalStream$: originalMovementObservable,
});
```

## Methods

The class `Collisions` has the following methods:

### hasCollision(elementArea: TCollisionArea, anotherElementArea: TCollisionArea): boolean

This method is used to check if there is a collision between two elements/areas. An area is defined by the coordinates of its top-left corner, along with its height and width in pixels.

**Params:**
- `elementArea`: The first area.
- `anotherElementArea`: The second area to be compared with the first one.

**Returns:**
- `boolean`: Returns whether a collision has occurred or not.

### preventBoundsDecorator(props: IPreventBoundsDecoratorProps): Observable<MovingDirection>

This method is a decorator for the movement stream which filters the stream, preventing characters from violating the boundaries of the map and interfering with one another.

**Params:**
- `props.character`: The character who's movement needs to be handled.
- `props.otherCharacters$`: A stream with an array of other characters that also need to avoid collisions.
- `props.bounds$`: A stream of arrays of coordinates that the character is not allowed to move into.
- `props.originalStream$`: The original stream of movements that needs to be modified.

**Returns:**
- `Observable<MovingDirection>`: Returns an observable which emits the direction of movement. Either 'Idle' if movement isn't possible, or the initial value if it is.

**Note:** You need to subscribe to the resultant `Observable<MovingDirection>` to get the latest direction changes.
