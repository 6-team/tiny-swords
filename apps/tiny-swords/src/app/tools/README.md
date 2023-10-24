# Tools

This library includes the following entities:

- `scheduleNextFrame`
- `createInterval`
- `Matrix` class
- `Maybe` class
- `Nothing` class

## `scheduleNextFrame()`

`scheduleNextFrame()` is a function that uses `setTimeout` and `requestAnimationFrame` for quick and efficient scheduling of the next animation frame. The frame is then passed into the `frames$` stream.

## `createInterval` function

`createInterval` is an auxiliary function that creates an Observable that emits the current time in milliseconds at a given interval.

### Usage example

```typescript
import { createInterval } from './path/to/createInterval';

const interval$ = createInterval(1000);

interval$.subscribe({
  next: time => console.log(time)
});
```

## Matrix Class

The `Matrix` is a class that represents a two-dimensional matrix. It is used to store the cells of a map layer.

### Usage Example

```typescript
import { Matrix, IPosition } from './Matrix';

const matrix = new Matrix<number>(3, 3);
const position: IPosition = { x: 1, y: 1 };

matrix.set(position, 5);

console.log(matrix.get(position)); // Outputs: 5
console.log(matrix.stringView); // Outputs the string representation of the matrix
```


## Maybe Class

The `Maybe` class is a safe type for optional values. It implements a concept from functional programming.

### Usage Example

```typescript
let maybeValue = new Maybe<number>(10);
let result = maybeValue
.map((value) => value * 2)
.map((value) => (value > 15 ? value : null))
.extract();

console.log(result); // returns: null
```


## Nothing Class

The class serves as a wrapper for safely handling missing values, avoiding null or undefined errors.

### Usage Example

```typescript
import { Nothing } from '@tools/monads';

const wrappedData = new Nothing(5);
console.log(wrappedData.extract()); // Outputs: 5
```
