import { CoordsTuple } from "../sprite/sprite.types";

export const enum GroundType {
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

export const mapTerrainToCoords: Record<GroundType, CoordsTuple> = {
    [GroundType.TOP_LEFT]: [0, 0],
    [GroundType.TOP_MIDDLE]: [64, 0],
    [GroundType.TOP_RIGHT]: [128, 0],
    [GroundType.MIDDLE_LEFT]: [0, 64],
    [GroundType.MIDDLE_MIDDLE]: [64, 64],
    [GroundType.MIDDLE_RIGHT]: [128, 64],
    [GroundType.BOTTOM_LEFT]: [0, 128],
    [GroundType.BOTTOM_MIDDLE]: [64, 128],
    [GroundType.BOTTOM_RIGHT]: [128, 128],
    [GroundType.HORIZONTAL_LEFT]: [0, 192],
    [GroundType.HORIZONTAL_MIDDLE]: [64, 192],
    [GroundType.HORIZONTAL_RIGHT]: [128, 192],
    [GroundType.VERTICAL_TOP]: [192, 0],
    [GroundType.VERTICAL_MIDDLE]: [192, 64],
    [GroundType.VERTICAL_BOTTOM]: [192, 128],
};