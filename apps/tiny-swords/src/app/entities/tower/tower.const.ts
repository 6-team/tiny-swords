import { CoordsTuple } from "../tile/tile.types";

export const enum TowerType {
  TOP_LEFT,
  TOP_RIGHT,
  MIDDLE_LEFT,
  MIDDLE_RIGHT,
  BOTTOM_LEFT,
  BOTTOM_RIGHT,
}

export const mapTerrainToCoords: Record<TowerType, CoordsTuple> = {
  [TowerType.TOP_LEFT]: [0, 0],
  [TowerType.TOP_RIGHT]: [64, 0],
  [TowerType.MIDDLE_LEFT]: [0, 64],
  [TowerType.MIDDLE_RIGHT]: [64, 64],
  [TowerType.BOTTOM_LEFT]: [0, 128],
  [TowerType.BOTTOM_RIGHT]: [64, 128],
};