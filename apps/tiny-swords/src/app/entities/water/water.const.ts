import { CoordsTuple } from '@entities/sprite';

export const enum WaterType {
  MIDDLE_MIDDLE,
}

export const mapWaterToCoords: Record<WaterType, CoordsTuple> = {
  [WaterType.MIDDLE_MIDDLE]: [0, 0],
};
