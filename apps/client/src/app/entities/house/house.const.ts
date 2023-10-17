import { CoordsTuple } from "../tile/tile.types";

export const enum HouseType {
  TOP_LEFT,
  TOP_RIGHT,
  MIDDLE_LEFT,
  MIDDLE_RIGHT,
  BOTTOM_LEFT,
  BOTTOM_RIGHT,
}

export const mapTerrainToCoords: Record<HouseType, CoordsTuple> = {
  [HouseType.TOP_LEFT]: [0, 0],
  [HouseType.TOP_RIGHT]: [64, 0],
  [HouseType.MIDDLE_LEFT]: [0, 64],
  [HouseType.MIDDLE_RIGHT]: [64, 64],
  [HouseType.BOTTOM_LEFT]: [0, 128],
  [HouseType.BOTTOM_RIGHT]: [64, 128],
};