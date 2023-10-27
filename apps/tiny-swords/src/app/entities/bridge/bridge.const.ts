import { CoordsTuple } from '@entities/sprite';

export const enum BridgeType {
  LEFT,
  MIDDLE,
  RIGHT,
  SHADOW,
}

export const mapTerrainToCoords: Record<BridgeType, CoordsTuple> = {
  [BridgeType.LEFT]: [0, 0],
  [BridgeType.MIDDLE]: [64, 0],
  [BridgeType.RIGHT]: [128, 0],
  [BridgeType.SHADOW]: [128, 192],
};
