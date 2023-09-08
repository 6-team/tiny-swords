import { CoordsTuple } from "../tile/tile.types";

export const enum TreeType {
    TOP_LEFT,
    TOP_MIDDLE,
    TOP_RIGHT,
    MIDDLE_LEFT,
    MIDDLE_MIDDLE,
    MIDDLE_RIGHT,
    BOTTOM_LEFT,
    BOTTOM_MIDDLE,
    BOTTOM_RIGHT,

    STRUMP,
}

export const mapTerrainToCoords: Record<TreeType, CoordsTuple> = {
    [TreeType.TOP_LEFT]: [0, 0],
    [TreeType.TOP_MIDDLE]: [64, 0],
    [TreeType.TOP_RIGHT]: [128, 0],
    [TreeType.MIDDLE_LEFT]: [0, 64],
    [TreeType.MIDDLE_MIDDLE]: [64, 64],
    [TreeType.MIDDLE_RIGHT]: [128, 64],
    [TreeType.BOTTOM_LEFT]: [0, 128],
    [TreeType.BOTTOM_MIDDLE]: [64, 128],
    [TreeType.BOTTOM_RIGHT]: [128, 128],
    [TreeType.STRUMP]: [64, 512],
};