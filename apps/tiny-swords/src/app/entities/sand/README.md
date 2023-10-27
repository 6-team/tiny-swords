# SandTyle

The `SandTyle` class represents a sprite with a sand entity. It extends the `Sprite` class and provides functionality to manage and display sand entities.

## Table of Contents

- [Usage](#usage)
- [Properties](#properties)
- [Methods](#methods)
- [Installation](#installation)

## Usage

### Creating a SandTyle

You can create a `SandTyle` instance with a specified sand type or use the default type, which is `SandType.TOP_LEFT`.

```javascript
import { SandTyle } from './sandSprite';
import { SandType } from './sand.const';

// Create a SandTyle with a specific type
const sandSprite = new SandTyle(SandType.TOP_LEFT);

// Create a SandTyle with the default type (SandType.TOP_LEFT)
const defaultsandSprite = new SandTyle();
```

### Setting the Sand Type

You can set the type of the sand using the `setType` method.

```javascript
sandSprite.setType(SandType.TOP_RIGHT);
```

## Properties

- `_type` (private): The type of the sand.
- `_sprite` (private): The sprite URL for the sand.

## Methods

- `setType(type: SandType)`: Sets the type of the sand.
- `_getCoordsMap()` (private): Gets the coordinates map for sand.

## Installation

You can include the `SandTyle` class in your project by importing it as shown in the usage examples.
