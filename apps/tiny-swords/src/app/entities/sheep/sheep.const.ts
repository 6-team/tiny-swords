import { CoordsTuple } from "../sprite/sprite.types";

export const enum SheepType {
  SHEEP_RIGHT,
  SHEEP_LEFT,
}

export const mapSheepToCoords: Record<SheepType, CoordsTuple> = {
  [SheepType.SHEEP_RIGHT]: [0, 0],
  [SheepType.SHEEP_LEFT]: [64, 0],
};