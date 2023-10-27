# HeroSounds

The `HeroSounds` class encompasses the handling and control of sound effects for a game character. It inherits from the `Sounds` class and implements the `IHeroSounds` interface, providing a well-defined API for manipulating the hero's sound behaviors.

## Table of Contents

- [Usage](#usage)
- [Constructor](#constructor)
- [Methods](#methods)
- [Dependencies](#dependencies)

## Usage

### Creating a HeroSounds Instance

To create a new instance of the `HeroSounds` class, you must supply a `HeroSoundsConfig` object to the constructor.

```javascript
import { HeroSounds } from './hero-sounds';
import { HeroSoundsConfig } from './hero-sounds.types';

// Define config
const heroSoundsConfig = {
  moving: ...,
  fighting: ...,
  collecting: ...
};

// Create an instance
const heroSounds = new HeroSounds(heroSoundsConfig);
```

### Playing the Sounds

Sounds related to various hero actions such as movement, attacking, hit taking, game over, and resource collection are managed automatically via subscriptions to corresponding Observables supplied through the input config. Manual method invocations are not generally required.

## Constructor

- `constructor({ moving, fighting, collecting: HeroSoundsConfig })` - Constructs a `HeroSounds` instance with a configuration object for controlling sounds relating to the hero's movement, fighting events, and resource gathering.

## Methods

Methods in `HeroSounds` class:

- `playMovementSound()`: Plays the sound of the hero's movement, if it's not already playing.
- `stopMovementSound()`: Stops the hero's movement sound if it's currently playing.
- `playGameOverSound()`: Plays the game-over sound after a delay of 500ms.
- `playResourceSelection()`: Plays the sound when the hero collects resources.
- `playAttackSound()`: Plays the hero's attack sound at a specified volume (0.3 in this case).
- `playHittingSound()`: Plays the sound when the hero is hit.

## Dependencies

This class is dependent on the following third-party libraries:

- `rxjs`: It is utilized for subscribing to Observables of moving, fighting, and resource collecting events.
