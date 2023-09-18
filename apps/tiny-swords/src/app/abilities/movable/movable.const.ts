import { MovingDirection } from '../abilities.const';

export const enum MovingError {
  PERSONAGE_NOT_SET = "Can't call Moving methods without personage",
}

export const movementSetters: Record<MovingDirection, (value: [number, number]) => [number, number]> = {
  [MovingDirection.UP]: ([prevX, prevY]) => [prevX, prevY - 1],
  [MovingDirection.DOWN]: ([prevX, prevY]) => [prevX, prevY + 1],
  [MovingDirection.LEFT]: ([prevX, prevY]) => [prevX - 1, prevY],
  [MovingDirection.RIGHT]: ([prevX, prevY]) => [prevX + 1, prevY],
  [MovingDirection.IDLE]: (coords) => coords,
};
