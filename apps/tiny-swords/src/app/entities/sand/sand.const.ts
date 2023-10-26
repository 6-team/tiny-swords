import { CoordsTuple } from '@entities/tile';

export const enum SandType {
  TOP_LEFT,
  TOP_MIDDLE,
  TOP_RIGHT,
  MIDDLE_LEFT,
  MIDDLE_MIDDLE,
  MIDDLE_RIGHT,
  BOTTOM_LEFT,
  BOTTOM_MIDDLE,
  BOTTOM_RIGHT,

  HORIZONTAL_LEFT,
  HORIZONTAL_MIDDLE,
  HORIZONTAL_RIGHT,

  VERTICAL_TOP,
  VERTICAL_MIDDLE,
  VERTICAL_BOTTOM,
}

export const mapTerrainToCoords: Record<SandType, CoordsTuple> = {
  [SandType.TOP_LEFT]: [320, 0],
  [SandType.TOP_MIDDLE]: [384, 0],
  [SandType.TOP_RIGHT]: [448, 0],
  [SandType.MIDDLE_LEFT]: [320, 64],
  [SandType.MIDDLE_MIDDLE]: [384, 64],
  [SandType.MIDDLE_RIGHT]: [448, 64],
  [SandType.BOTTOM_LEFT]: [320, 128],
  [SandType.BOTTOM_MIDDLE]: [384, 128],
  [SandType.BOTTOM_RIGHT]: [448, 128],
  [SandType.HORIZONTAL_LEFT]: [320, 192],
  [SandType.HORIZONTAL_MIDDLE]: [384, 192],
  [SandType.HORIZONTAL_RIGHT]: [448, 192],
  [SandType.VERTICAL_TOP]: [512, 0],
  [SandType.VERTICAL_MIDDLE]: [512, 64],
  [SandType.VERTICAL_BOTTOM]: [512, 128],
};
