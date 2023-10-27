import { CoordsTuple } from '@entities/sprite';

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
}

export const mapEnemyTypeToCoords: Record<EnemyType, CoordsTuple> = {
  [EnemyType.TORCH_RED]: [0, 22],
};
