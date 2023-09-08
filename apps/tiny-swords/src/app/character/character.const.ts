import { Directions } from '../entites/controllers/keyboard';

export enum CharacterAction {
  STANDS_STILL,
  STANDS_STILL_LEFT,
  RUN,
  RUN_LEFT,
  RIGHT_ATTACK_UP,
  RIGHT_ATTACK_DOWN,
  FRONT_ATTACK_UP,
  FRONT_ATTACK_DOWN,
  BACK_ATTACK_UP,
  BACK_ATTACK_DOWN,
}

export const animationByDirection: Record<Directions, CharacterAction> = {
  [Directions.UP]: CharacterAction.RUN,
  [Directions.DOWN]: CharacterAction.RUN,
  [Directions.LEFT]: CharacterAction.RUN_LEFT,
  [Directions.RIGHT]: CharacterAction.RUN,
};

export const coordinatesSetters: Record<Directions, (value: [number, number]) => [number, number]> = {
  [Directions.UP]: ([prevX, prevY]) => [prevX, prevY - 1],
  [Directions.DOWN]: ([prevX, prevY]) => [prevX, prevY + 1],
  [Directions.LEFT]: ([prevX, prevY]) => [prevX - 1, prevY],
  [Directions.RIGHT]: ([prevX, prevY]) => [prevX + 1, prevY],
};
