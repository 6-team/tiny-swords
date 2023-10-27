import { CoordsTuple } from "../sprite/sprite.types";

export const enum ElevationType {
    TOP_LEFT,
    TOP_MIDDLE,
    TOP_RIGHT,
    MIDDLE_LEFT,
    MIDDLE_MIDDLE,
    MIDDLE_RIGHT,
    BOTTOM_LEFT,
    BOTTOM_MIDDLE,
    BOTTOM_RIGHT,

    EDGE_LEFT,
    EDGE_MIDDLE,
    EDGE_RIGHT,

    HORIZONTAL_LEFT,
    HORIZONTAL_MIDDLE,
    HORIZONTAL_RIGHT,

    VERTICAL_TOP,
    VERTICAL_MIDDLE,
    VERTICAL_BOTTOM,
    VERTICAL_EDGE
}

export const mapTerrainToCoords: Record<ElevationType, CoordsTuple> = {
    [ElevationType.TOP_LEFT]: [0, 0],
    [ElevationType.TOP_MIDDLE]: [64, 0],
    [ElevationType.TOP_RIGHT]: [128, 0],
    [ElevationType.MIDDLE_LEFT]: [0, 64],
    [ElevationType.MIDDLE_MIDDLE]: [64, 64],
    [ElevationType.MIDDLE_RIGHT]: [128, 64],
    [ElevationType.BOTTOM_LEFT]: [0, 128],
    [ElevationType.BOTTOM_MIDDLE]: [64, 128],
    [ElevationType.BOTTOM_RIGHT]: [128, 128],

    [ElevationType.EDGE_LEFT]: [0, 192],
    [ElevationType.EDGE_MIDDLE]: [64, 192],
    [ElevationType.EDGE_RIGHT]: [128, 192],

    [ElevationType.HORIZONTAL_LEFT]: [0, 256],
    [ElevationType.HORIZONTAL_MIDDLE]: [64, 256],
    [ElevationType.HORIZONTAL_RIGHT]: [128, 256],

    [ElevationType.VERTICAL_TOP]: [192, 0],
    [ElevationType.VERTICAL_MIDDLE]: [192, 64],
    [ElevationType.VERTICAL_BOTTOM]: [192, 128],
    [ElevationType.VERTICAL_EDGE]: [192, 192],
};