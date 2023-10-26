# Entity Class

The `Entity` class represents an entity in the game and implements the `IEntity` interface. It contains properties and methods for managing the state of the entity, such as its ID, coordinates, direction, attacking type, and more.

## Properties

- `id` (string): The unique identifier of the entity.
- `coords` (array): An array containing the coordinates [x, y] of the entity.
- `breakpoint` (array): An array containing the breakpoint coordinates [x, y] of the entity.
- `direction` (MovingDirection | null): The current direction of the entity.
- `attackingType` (AttackingType | null): The attacking type of the entity.
- `isDied` (boolean): A boolean value indicating if the entity is dead.

## Constructor

The constructor of the `Entity` class initializes the entity with the provided data. It takes an `IEntity` object as a parameter and assigns its properties to the new entity.

```javascript
const entity = new Entity({
  id: 'unique-id',
  coords: [x, y],
  breakpoint: [x, y],
  direction: MovingDirection.UP,
  attackingType: AttackingType.Sword,
  isDied: false,
});
```

You can create instances of the `Entity` class to represent different entities within the game.

# Usage

The `Entity` class can be used to create and manage entities in your game, such as players, enemies, or objects. It provides a structured way to store and manipulate entity data.

# IEntity Interface

The `Entity` class implements the `IEntity` interface. This interface defines the basic structure of an entity object and is used for type checking and ensuring consistency in your code.
