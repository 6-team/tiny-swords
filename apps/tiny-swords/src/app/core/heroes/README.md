# Heroes Class

The `Heroes` class is designed to manage hero characters within a game. It provides methods for initializing heroes, adding or removing them from the collection, and handling operations related to hero characters.

## Table of Contents

- [Constructor](#constructor)
- [Initializing a Hero](#initializing-a-hero)
- [Initializing a Connected Hero](#initializing-a-connected-hero)
- [Adding a Hero](#adding-a-hero)
- [Removing a Hero](#removing-a-hero)
- [Getting a Hero](#getting-a-hero)
- [Checking if a Hero is Main](#checking-if-a-hero-is-main)
- [Private Methods](#private-methods)

## Constructor

The `Heroes` class is constructed with the starting coordinates for heroes.

```typescript
constructor(startCoords: CoordsTuple);
```

- `startCoords` (CoordsTuple): The starting coordinates for heroes.

## Initializing a Hero

You can initialize a hero character using the `initHero` method. This method creates a new hero character with the provided information and adds it to the collection.

```typescript
initHero(entity: IEntity, bounds$: Observable<Array<TCollisionArea>>, enemies$: Observable<Array<IMovableCharacter & IAttackingCharacter>): Hero;
```

- `entity` (IEntity): The entity information for the hero.
- `bounds$` (Observable<Array<TCollisionArea>>): An observable of collision boundaries.
- `enemies$` (Observable<Array<IMovableCharacter & IAttackingCharacter>): An observable of hero characters.

The `initHero` method returns the newly initialized hero character.

## Initializing a Connected Hero

The `initConnectedHero` method is used to initialize a hero character based on connected entity information. This method creates a hero character and adds it to the collection.

```typescript
initConnectedHero(entity: IEntity): Hero;
```

- `entity` (IEntity): The connected entity information for the hero.

The `initConnectedHero` method returns the newly initialized hero character.

## Adding a Hero

To add a hero character to the collection, you can use the `addHero` method.

```typescript
addHero(hero: Hero): void;
```

- `hero` (Hero): The hero character to add to the collection.

## Removing a Hero

If you need to remove a hero character from the collection, use the `removeHero` method.

```typescript
removeHero(id: string | number): void;
```

- `id` (string | number): The ID of the hero character to remove.

## Getting a Hero

The `getHero` method allows you to retrieve a hero character from the collection by its ID.

```typescript
getHero(id: string | number): Hero | undefined;
```

- `id` (string | number): The ID of the hero character to retrieve.

The method returns the hero character if found, or `undefined` if not found.

## Checking if a Hero is Main

You can check if a hero character is the main hero using the `isMainHero` method.

```typescript
isMainHero(id: string | number): boolean;
```

- `id` (string | number): The ID of the hero character to check.

The method returns `true` if the specified hero character is the main hero, or `false` if it's not.

## Private Methods

The `Heroes` class also includes private methods for managing hero boundaries and types. These methods are not meant to be used directly but are essential for the class's functionality.

Please refer to the class's implementation for more details on these private methods.
