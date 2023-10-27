# Collecting

The `Collecting` class implements the `ICollecting` interface and provides the functionality to collect items of type `IResource`.

## Table of Contents

- [Usage](#usage)
- [Properties](#properties)
- [Methods](#methods)
- [Installation](#installation)

## Usage

### Setting the context

You can set the context/carrier of this ability which is needed to call its methods, such as showing animations, changing the image, etc.

```typescript
import { Collecting, ICollectingCharacter } from './collecting';

// Set the context of Collecting class
const context: ICollectingCharacter = {
  /* context properties */
};
const collecting = new Collecting().setContext(context);
```

### Collecting an item

You can place an item in a collection.

```typescript
import { IResource } from '@common/common.types';

// Let's suppose you have an item of type IResource
const item: IResource = {
  /* item properties */
};

// Collect the item
collecting.collect(item);
```

### Accessing the collection

You can access the collection as an Observable of Array of IResource. The collection will be a stream of collected items, and every new value will emit whenever a new item has been collected.

```typescript
// Subscribe to the collection
collecting.collection$.subscribe((collection) => {
  console.log(collection);
});
```

## Properties

- `_context` (private): The context/carrier of this ability. It's an object of `ICollectingCharacter` type.
- `_collectionSubject` (private): The BehaviorSubject of Array of IResource, used as a store for collected items.
- `collection$`: Observable of Array of IResource, that provides stream of collected items.

## Methods

- `setContext(context: ICollectingCharacter): this`: Sets the context/carrier of this ability. Returns the instance of the class.
- `collect(item: IResource): this`: Places an item in a collection. Returns the instance of the class.

## Installation

You can include the `Collecting` class in your project by importing it as shown in the usage examples.
