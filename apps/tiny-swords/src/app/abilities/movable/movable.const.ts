import { MovingDirection } from '@shared';

export const enum MovingError {
  PERSONAGE_NOT_SET = "Can't call Moving methods without personage",
}

export const PIXELS_PER_FRAME = 2;

export const movementSetters: Record<MovingDirection, (value: [number, number]) => [number, number]> = {
  [MovingDirection.UP]: ([prevX, prevY]) => [prevX, prevY - PIXELS_PER_FRAME],
  [MovingDirection.DOWN]: ([prevX, prevY]) => [prevX, prevY + PIXELS_PER_FRAME],
  [MovingDirection.LEFT]: ([prevX, prevY]) => [prevX - PIXELS_PER_FRAME, prevY],
  [MovingDirection.RIGHT]: ([prevX, prevY]) => [prevX + PIXELS_PER_FRAME, prevY],
  [MovingDirection.IDLE]: (coords) => coords,
};
