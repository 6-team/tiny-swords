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

/**
 * @TODO Переписать 64 на spriteSize, или может вообще вынести отсюда, чтобы не зависеть тут от Grid
 */
export const nextMoveCoordsGetters: Record<MovingDirection, (value: [number, number]) => [number, number]> = {
  [MovingDirection.UP]: ([prevX, prevY]) => [prevX, prevY - 64],
  [MovingDirection.DOWN]: ([prevX, prevY]) => [prevX, prevY + 64],
  [MovingDirection.LEFT]: ([prevX, prevY]) => [prevX - 64, prevY],
  [MovingDirection.RIGHT]: ([prevX, prevY]) => [prevX + 64, prevY],
  [MovingDirection.IDLE]: (coords) => coords,
};
