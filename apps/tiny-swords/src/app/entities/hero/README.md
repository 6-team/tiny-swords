# Hero

The `Hero` class represents a Hero character. It extends the `Character` class and provides functionality for moving, fighting, and collecting abilities.

## Table of Contents

- [Usage](#usage)
- [Properties](#properties)
- [Methods](#methods)
- [Installation](#installation)

## Usage

### Creating a Hero

You can create a `Hero` instance by providing a configuration object with the required parameters.

```javascript
import { Hero, HeroType } from './hero';

// Create a Hero instance
const hero = new Hero({
  height: 64,
  width: 64,
  initialX: 0,
  initialY: 0,
  id: 'hero1',
  type: HeroType.WARRIOR_BLUE,
});
```

### Accessing Hero Abilities

You can access the different abilities of the Hero, such as moving, fighting, and collecting.

```javascript
// Access the moving ability
const movingAbility = hero.moving;

// Access the fighting ability
const fightingAbility = hero.fighting;

// Access the collecting ability
const collectingAbility = hero.collecting;
```

### Setting the Hero Type

You can set the type of the Hero using the `setType` method.

```javascript
hero.setType(HeroType.WARRIOR_RED);
```

## Properties

- `_sprite` (private): The sprite URL for the hero.
- `_type` (private): The type of the Hero.
- `_size` (private): The size of the Hero.
- `_sounds` (private): The sounds of the Hero.

## Methods

- `get moving()`: Gets the moving ability of the Hero.
- `get fighting()`: Gets the fighting ability of the Hero.
- `get collecting()`: Gets the collecting ability of the Hero.
- `_initSounds(abilities: { moving: IMoving; fighting: IFighting; collecting: ICollecting }): void` (private): Initializes the sounds for the Hero.
- `_getCoordsMap()`: Gets the coordinates map for the Hero.

## Installation

You can include the `Hero` class in your project by importing it as shown in the usage examples.
