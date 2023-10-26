# EnemySound

The `EnemySound` class represents the audio behavior of an "enemy" entity in a video game. It extends the `Sounds` class and implements the `IEnemySounds` interface to provide a well-defined API for controlling the sound associated with enemy characters.

## Table of Contents

- [Usage](#usage)
- [Constructor](#constructor)
- [Methods](#methods)
- [Dependencies](#dependencies)

## Usage

### Creating an EnemySound Instance

To create a new instance of the `EnemySound` class, you need to provide an object of the `EnemySoundsConfig` type to the constructor.

```javascript
import { EnemySound } from './enemy-sound';
import { EnemySoundsConfig } from './enemy-sounds.types';

// Define config
const fightingConfig = {...};

// Create an instance
const enemySound = new EnemySound({ fighting: fightingConfig });
```

### Playing the Sounds

To play a sound, you do not need to call the `playAttackSound` or `playHittingSound` methods directly - they are hooked up to the `isAttacking$` and `isHitted$` Observables of the input config, respectively.

## Constructor

- `constructor({ fighting: EnemySoundsConfig})` - The constructor of the `EnemySound` class accepts a configuration object for enemy's fighting sound.

## Methods

- `playAttackSound()`: Plays the enemy's attack sound.
- `playHittingSound()`: Plays the enemy's hitting sound.

## Dependencies

This class depends on the following third-party libraries:

- `rxjs`: Used to subscribe to Observables for attack and hit events.
