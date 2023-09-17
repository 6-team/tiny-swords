import { CoordsTuple } from '../tile/tile.types';

export enum EnemyActionAnimation {
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

export const enum EnemyType {
  WARRIOR_BLUE,
}

export const mapEnemyTypeToCoords: Record<EnemyType, CoordsTuple> = {
  [EnemyType.WARRIOR_BLUE]: [192, 192],
};