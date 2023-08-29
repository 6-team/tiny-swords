import { ElevationTile } from "../elevation/elevation";
import { ElevationType } from "../elevation/elevation.const";
import { GroundTile } from "../ground/ground";
import { GroundType } from "../ground/ground.const";
import { SandTile } from "../sand/sand";
import { SandType } from "../sand/sand.const";
import { WaterTile } from "../water/water";

export const enum TileName {
  SAND_TOP_LEFT,
  SAND_TOP_RIGHT,
  SAND_BOTTOM_LEFT,
  SAND_BOTTOM_RIGHT,
  SAND_MIDDLE_LEFT,
  SAND_MIDDLE_MIDDLE,
  SAND_MIDDLE_RIGHT,
  SAND_HORIZONTAL_LEFT,
  SAND_HORIZONTAL_RIGHT,
  SAND_VERTICAL_TOP,
  SAND_VERTICAL_MIDDLE,
  SAND_VERTICAL_BOTTOM,

  GROUND_TOP_LEFT,
  GROUND_TOP_RIGHT,
  GROUND_BOTTOM_LEFT,
  GROUND_BOTTOM_RIGHT,
  GROUND_MIDDLE_MIDDLE,
  GROUND_HORIZONTAL_LEFT,
  GROUND_HORIZONTAL_RIGHT,
  GROUND_VERTICAL_TOP,
  GROUND_VERTICAL_MIDDLE,
  GROUND_VERTICAL_BOTTOM,

  ELEVATION_TOP_LEFT,
  ELEVATION_TOP_RIGHT,
  ELEVATION_BOTTOM_LEFT,
  ELEVATION_BOTTOM_RIGHT,
  ELEVATION_MIDDLE_MIDDLE,
  ELEVATION_HORIZONTAL_LEFT,
  ELEVATION_HORIZONTAL_RIGHT,
  ELEVATION_VERTICAL_TOP,
  ELEVATION_VERTICAL_MIDDLE,
  ELEVATION_VERTICAL_BOTTOM,
  ELEVATION_VERTICAL_EDGE,
  ELEVATION_EDGE_LEFT,
  ELEVATION_EDGE_MIDDLE,
  ELEVATION_EDGE_RIGHT,

  WATER_MIDDLE_MIDDLE,
};

export const mapTileNameToClass: Partial<Record<TileName, { constructor: any, args: Array<any> }>> = {
  [TileName.SAND_TOP_LEFT]: { constructor: SandTile, args: [SandType.TOP_LEFT] },
  [TileName.SAND_TOP_RIGHT]: { constructor: SandTile, args: [SandType.TOP_RIGHT] },
  [TileName.SAND_BOTTOM_LEFT]: { constructor: SandTile, args: [SandType.BOTTOM_LEFT] },
  [TileName.SAND_BOTTOM_RIGHT]: { constructor: SandTile, args: [SandType.BOTTOM_RIGHT] },
  [TileName.SAND_MIDDLE_LEFT]: { constructor: SandTile, args: [SandType.MIDDLE_LEFT] },
  [TileName.SAND_MIDDLE_MIDDLE]: { constructor: SandTile, args: [SandType.MIDDLE_MIDDLE] },
  [TileName.SAND_MIDDLE_RIGHT]: { constructor: SandTile, args: [SandType.MIDDLE_RIGHT] },
  [TileName.SAND_VERTICAL_MIDDLE]: { constructor: SandTile, args: [SandType.VERTICAL_MIDDLE] },
  [TileName.SAND_VERTICAL_BOTTOM]: { constructor: SandTile, args: [SandType.VERTICAL_BOTTOM] },
  [TileName.SAND_HORIZONTAL_LEFT]: { constructor: SandTile, args: [SandType.HORIZONTAL_LEFT] },
  [TileName.SAND_HORIZONTAL_RIGHT]: { constructor: SandTile, args: [SandType.HORIZONTAL_RIGHT] },

  [TileName.GROUND_TOP_LEFT]: { constructor: GroundTile, args: [GroundType.TOP_LEFT] },
  [TileName.GROUND_TOP_RIGHT]: { constructor: GroundTile, args: [GroundType.TOP_RIGHT] },
  [TileName.GROUND_BOTTOM_LEFT]: { constructor: GroundTile, args: [GroundType.BOTTOM_LEFT] },
  [TileName.GROUND_MIDDLE_MIDDLE]: { constructor: GroundTile, args: [GroundType.MIDDLE_MIDDLE] },
  [TileName.GROUND_HORIZONTAL_RIGHT]: { constructor: GroundTile, args: [GroundType.HORIZONTAL_RIGHT] },
  [TileName.GROUND_VERTICAL_MIDDLE]: { constructor: GroundTile, args: [GroundType.VERTICAL_MIDDLE] },
  [TileName.GROUND_VERTICAL_BOTTOM]: { constructor: GroundTile, args: [GroundType.VERTICAL_BOTTOM] },

  [TileName.ELEVATION_TOP_LEFT]: { constructor: ElevationTile, args: [ElevationType.TOP_LEFT] },
  [TileName.ELEVATION_TOP_RIGHT]: { constructor: ElevationTile, args: [ElevationType.TOP_RIGHT] },
  [TileName.ELEVATION_BOTTOM_LEFT]: { constructor: ElevationTile, args: [ElevationType.BOTTOM_LEFT] },
  [TileName.ELEVATION_MIDDLE_MIDDLE]: { constructor: ElevationTile, args: [ElevationType.MIDDLE_MIDDLE] },
  [TileName.ELEVATION_HORIZONTAL_RIGHT]: { constructor: ElevationTile, args: [ElevationType.HORIZONTAL_RIGHT] },
  [TileName.ELEVATION_VERTICAL_MIDDLE]: { constructor: ElevationTile, args: [ElevationType.VERTICAL_MIDDLE] },
  [TileName.ELEVATION_VERTICAL_BOTTOM]: { constructor: ElevationTile, args: [ElevationType.VERTICAL_BOTTOM] },
  [TileName.ELEVATION_VERTICAL_EDGE]: { constructor: ElevationTile, args: [ElevationType.VERTICAL_EDGE] },
  [TileName.ELEVATION_EDGE_LEFT]: { constructor: ElevationTile, args: [ElevationType.EDGE_LEFT] },
  [TileName.ELEVATION_EDGE_MIDDLE]: { constructor: ElevationTile, args: [ElevationType.EDGE_MIDDLE] },
  [TileName.ELEVATION_EDGE_RIGHT]: { constructor: ElevationTile, args: [ElevationType.EDGE_RIGHT] },

  [TileName.WATER_MIDDLE_MIDDLE]: { constructor: WaterTile, args: [] },
};