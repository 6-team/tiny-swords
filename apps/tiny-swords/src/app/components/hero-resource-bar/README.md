# HeroResourcesBar

The `HeroResourcesBar` class represents a container for hero resources and provides the functionality to manage and display them. It implements the `IHeroResourcesBar` interface.

## Table of Contents

- [Usage](#usage)
- [Properties](#properties)
- [Methods](#methods)
- [Installation](#installation)

## Usage

### Creating a HeroResourcesBar

You can create a `HeroResourcesBar` instance with a specified resources array.

```javascript
import { HeroResourcesBar } from './hero-resource-bar';
import { Resource } from '@entities/resource/resource';

// Create a HeroResourcesBar with a specific resources array
const heroResourcesBar = new HeroResourcesBar([
  new Resource({ type: ResourcesType.GOLD, quantity: 0 }),
  new Resource({ type: ResourcesType.WOOD, quantity: 0 }),
]);

// Addind a resource by its type
heroResourcesBar.addResource(ResourcesType.WOOD);

// Resource adequacy check
const isAvailable = availableResourcesCheck({ResourcesType.GOLD, 200})

```

## Properties

- `_resourcesSubject` (private): A BehaviorSubject that contains an array of the resources.
- `resources$`: An Observable derived from `_resourcesSubject`.

## Methods

- `getResources()`: Gets the current array of resources.
- `getResource(type: ResourcesType)`: Gets a particular resource by its type.
- `addResource(type: ResourcesType)`: Adds a resource by its type.
- `availableResourcesCheck(cost: { type: ResourcesType; price: number })`: Checks if there are enough resources of a certain type to cover a cost.
- `spend(cost: { type: ResourcesType; price: number })`: Deducts the cost of an enhancement from the corresponding resource.

## Installation

You can include the `HeroResourcesBar` class in your project by importing it, as shown in the usage examples.
