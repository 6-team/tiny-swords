import { CoordsTuple } from '../tile/tile.types';

export const enum DecoType {
  MUSHROOM_S,
  MUSHROOM_M,
  MUSHROOM_L,
  STONE_S,
  STONE_M,
  STONE_L,
  BUSH_S,
  BUSH_M,
  BUSH_L,
  WEED_S,
  WEED_M,
  PUMPKIN_S,
  PUMPKIN_M,
  BONE_S,
  BONE_M,
  SIGN_STOP,
  SIGH_RIGHT,
  SCARECROW,
}

export const enum DecoAnimation {
  FORWARD = 'FORWARD',
  BACKWARD = 'BACKWARD',
  WEAK_ATTACK = 'WEAK_ATTACK',
  STRONG_ATTACK = 'STRONG_ATTACK',
}

export const mapTerrainToCoords: Record<DecoType, CoordsTuple> = {
  [DecoType.MUSHROOM_S]: [0, 0],
  [DecoType.MUSHROOM_M]: [0, 0],
  [DecoType.MUSHROOM_L]: [0, 0],
  [DecoType.STONE_S]: [0, 0],
  [DecoType.STONE_M]: [0, 0],
  [DecoType.STONE_L]: [0, 0],
  [DecoType.BUSH_L]: [0, 0],
  [DecoType.BUSH_S]: [0, 0],
  [DecoType.BUSH_M]: [0, 0],
  [DecoType.WEED_S]: [0, 0],
  [DecoType.WEED_M]: [0, 0],
  [DecoType.PUMPKIN_S]: [0, 0],
  [DecoType.PUMPKIN_M]: [0, 0],
  [DecoType.BONE_S]: [0, 0],
  [DecoType.BONE_M]: [0, 0],
  [DecoType.SIGN_STOP]: [0, 0],
  [DecoType.SIGH_RIGHT]: [0, 0],
  [DecoType.SCARECROW]: [0, 0],
};
