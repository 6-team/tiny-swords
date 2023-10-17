import { CoordsTuple } from "../tile/tile.types";

export const enum GoldMineType {
  TOP_LEFT,
  TOP_MIDDLE,
  TOP_RIGHT,
  BOTTOM_LEFT,
  BOTTOM_MIDDLE,
  BOTTOM_RIGHT,
}

export const mapTerrainToCoords: Record<GoldMineType, CoordsTuple> = {
  [GoldMineType.TOP_LEFT]: [0, 0],
  [GoldMineType.TOP_MIDDLE]: [64, 0],
  [GoldMineType.TOP_RIGHT]: [128, 0],
  [GoldMineType.BOTTOM_LEFT]: [0, 64],
  [GoldMineType.BOTTOM_MIDDLE]: [64, 64],
  [GoldMineType.BOTTOM_RIGHT]: [128, 64],
};