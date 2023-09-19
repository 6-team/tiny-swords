import { CoordsTuple } from '../tile/tile.types';

export enum HeroActionAnimation {
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

export const enum HeroType {
  WARRIOR_BLUE,
}

export const mapHeroTypeToCoords: Record<HeroType, CoordsTuple> = {
  [HeroType.WARRIOR_BLUE]: [0, 22],
};
