import { CoordsTuple } from '@entities/sprite';

export enum HeroActionAnimation {
  STANDS_STILL,
  STANDS_STILL_LEFT,
  RUN,
  RUN_LEFT,
  RIGHT_ATTACK_UP,
  LEFT_ATTACK_UP,
  RIGHT_ATTACK_DOWN,
  LEFT_ATTACK_DOWN,
  FRONT_ATTACK_UP,
  FRONT_ATTACK_DOWN,
  BACK_ATTACK_UP,
  BACK_ATTACK_DOWN,
}

export enum HeroType {
  WARRIOR_BLUE,
  WARRIOR_PURPLE,
  WARRIOR_RED,
  WARRIOR_YELLOW,
}

export const mapHeroTypeToCoords: Record<HeroType, CoordsTuple> = {
  [HeroType.WARRIOR_BLUE]: [0, 22],
  [HeroType.WARRIOR_PURPLE]: [0, 22],
  [HeroType.WARRIOR_RED]: [0, 22],
  [HeroType.WARRIOR_YELLOW]: [0, 22],
};

const path = './img/Factions/Knights/Troops/Warrior/';

export const mapHeroImages: Record<HeroType, string> = {
  [HeroType.WARRIOR_BLUE]: `${path}Blue/Warrior_Blue.png`,
  [HeroType.WARRIOR_PURPLE]: `${path}Purple/Warrior_Purple.png`,
  [HeroType.WARRIOR_RED]: `${path}Red/Warrior_Red.png`,
  [HeroType.WARRIOR_YELLOW]: `${path}Yellow/Warrior_Yellow.png`,
};
