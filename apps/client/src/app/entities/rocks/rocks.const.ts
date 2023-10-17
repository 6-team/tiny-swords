import { CoordsTuple } from "../tile/tile.types";

export const enum RocksType {
  ROCKS_S,
  ROCKS_M,
  ROCKS_L,
}

export const mapTerrainToCoords: Record<RocksType, CoordsTuple> = {
  [RocksType.ROCKS_S]: [0, 0],
  [RocksType.ROCKS_M]: [0, 0],
  [RocksType.ROCKS_L]: [0, 0],
};