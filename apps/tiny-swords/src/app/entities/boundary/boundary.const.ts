import { CoordsTuple } from "@entities/sprite";

export const enum BoundaryType {
  MIDDLE,
}

export const mapBoundaryToCoords: Record<BoundaryType, CoordsTuple> = {
  [BoundaryType.MIDDLE]: [0, 0],
};
