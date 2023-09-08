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
