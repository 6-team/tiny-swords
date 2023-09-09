import { Directions } from '../entites/controllers/keyboard';

export enum CharacterActionAnimation {
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

export const animationByDirection: Record<Directions, CharacterActionAnimation> = {
  [Directions.UP]: CharacterActionAnimation.RUN,
  [Directions.DOWN]: CharacterActionAnimation.RUN,
  [Directions.LEFT]: CharacterActionAnimation.RUN_LEFT,
  [Directions.RIGHT]: CharacterActionAnimation.RUN,
};
