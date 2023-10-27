import { CoordsTuple } from "@entities/tile";

export const enum BoundaryType {
  MIDDLE,
}

export const mapBoundaryToCoords: Record<BoundaryType, CoordsTuple> = {
  [BoundaryType.MIDDLE]: [0, 0],
};
