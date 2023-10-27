import { CoordsTuple } from '../tile/tile.types';

export enum EnemyActionAnimation {
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

export const enum EnemyType {
  TORCH_RED,
  TNT_RED,
}

export const mapEnemyTypeToCoords: Record<EnemyType, CoordsTuple> = {
  [EnemyType.TORCH_RED]: [0, 22],
  [EnemyType.TNT_RED]: [0, 22],
};

const path = './img/Factions/Goblins/Troops/';

export const mapEnemyImages: Record<EnemyType, string> = {
  [EnemyType.TORCH_RED]: `${path}Torch/Red/Torch_Red.png`,
  [EnemyType.TNT_RED]: `${path}TNT/Red/TNT_Red.png`,
};