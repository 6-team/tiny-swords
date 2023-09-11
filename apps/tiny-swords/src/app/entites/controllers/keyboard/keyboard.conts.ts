export enum Directions {
  UP = 'up',
  DOWN = 'down',
  LEFT = 'left',
  RIGHT = 'right',
}

export const pushedKeys: Record<string, Directions> = {
  ArrowUp: Directions.UP,
  KeyW: Directions.UP,
  ArrowDown: Directions.DOWN,
  KeyS: Directions.DOWN,
  ArrowLeft: Directions.LEFT,
  KeyA: Directions.LEFT,
  ArrowRight: Directions.RIGHT,
  KeyD: Directions.RIGHT,
};

export const movementSetters: Record<Directions, (value: [number, number]) => [number, number]> = {
  [Directions.UP]: ([prevX, prevY]) => [prevX, prevY - 1],
  [Directions.DOWN]: ([prevX, prevY]) => [prevX, prevY + 1],
  [Directions.LEFT]: ([prevX, prevY]) => [prevX - 1, prevY],
  [Directions.RIGHT]: ([prevX, prevY]) => [prevX + 1, prevY],
};
