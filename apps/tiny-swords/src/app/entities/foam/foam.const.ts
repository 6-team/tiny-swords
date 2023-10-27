import { CoordsTuple } from '@entities/tile';

export const enum FoamType {
  TOP,
  LEFT,
  RIGHT,
  BOTTOM,
  MIDDLE,
}

export const mapTerrainToCoords: Record<FoamType, CoordsTuple> = {
  [FoamType.TOP]: [64, 0],
  [FoamType.LEFT]: [0, 64],
  [FoamType.RIGHT]: [128, 64],
  [FoamType.BOTTOM]: [64, 128],
  [FoamType.MIDDLE]: [64, 64],
};
