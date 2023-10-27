# Fighting

The `Fighting` class implements the `IFighting` interface and manages all fighting-related logic of a character.

## Table of Contents

- [Usage](#usage)
- [Properties](#properties)
- [Methods](#methods)
- [Installation](#installation)

## Usage

### Setting the context

You can set a context needed to call its methods, such as displaying animations and changing images.

```javascript
import { Fighting, IFightingCharacter, IMovingCharacter } from './fighting';

// Set the context of the Fighting class
const context: IFightingCharacter & IMovingCharacter = {
  /* context properties */
};
const fighting = new Fighting().setContext(context);
```

### Attacking

You can make a character perform an attack.

```javascript
import { AttackingType } from '@shared';

// Make the character attack
fighting.attack(AttackingType.DOWN);
```

### Observing States

You can subscribe to various observable states such as whether the character is attacking, has died, or been hit, as well as the count of lives and blocked lives.

```javascript
// Subscribe to the state of a character attacking
fighting.isAttacking$.subscribe((isAttacking) => {
  console.log(isAttacking);
});
```

## Properties

- `_context` (private): The context/carrier of this ability. It's an object of `IFightingCharacter & IMovingCharacter` type.
- `attack$`: An Observable stream of attack events.
- `isAttacking$`: An Observable stream indicating if the character is currently attacking.
- `isHitted$`: An Observable stream indicating if the character is hit.
- `livesCount$`: An Observable stream for the count of current lives.
- `blockedLivesCount$`: An Observable stream for the count of currently blocked lives.
- `isDied$`: An Observable stream indicating if the character has died.

## Methods

- `setContext(context: IFightingCharacter & IMovingCharacter): this`: Sets the context/carrier of this ability. Returns the instance of the class.
- `attack(type: AttackingType): this`: Makes the character attack. Returns the instance of the class.
- `takeDamage(): this`: Makes character take damage, decreasing a life. Returns the instance of the class.
- `addLive(): this`: Adds one life if possible. Returns the instance of the class.
- `unblockLive(): this`: Unblocks a life if possible. Returns the instance of the class.
- `reset(): this`: Resets the state of the ability. Returns the instance of the class.
- `checkAddLive(): boolean`: Checks if it's possible to add a life. Returns a boolean.
- `checkUnblockLive(): boolean`: Checks if a life can be unblocked. Returns a boolean.

## Installation

You can include the `Fighting` class in your project by importing it as displayed in the usage examples.
