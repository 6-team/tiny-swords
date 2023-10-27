import { CoordsTuple } from '../sprite/sprite.types';

export const enum ResourcesType {
  GOLD,
  WOOD,
  MEAT,
}

export const mapResourcesToCoords: Record<ResourcesType, CoordsTuple> = {
  [ResourcesType.GOLD]: [0, 0],
  [ResourcesType.WOOD]: [0, 0],
  [ResourcesType.MEAT]: [0, 0],
};
