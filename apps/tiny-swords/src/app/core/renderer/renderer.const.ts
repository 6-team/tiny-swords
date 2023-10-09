import { ElevationTile } from '../../entities/elevation/elevation';
import { ElevationType } from '../../entities/elevation/elevation.const';
import { GroundTile } from '../../entities/ground/ground';
import { GroundType } from '../../entities/ground/ground.const';
import { SandTile } from '../../entities/sand/sand';
import { SandType } from '../../entities/sand/sand.const';
import { FoamTile } from '../../entities/foam/foam';
import { FoamType } from '../../entities/foam/foam.const';
import { WaterTile } from '../../entities/water/water';
import { BridgeTile } from '../../entities/bridge/bridge';
import { BridgeType } from '../../entities/bridge/bridge.const';
import { DecoTile } from '../../entities/deco/deco';
import { DecoType } from '../../entities/deco/deco.const';
import { RocksTile } from '../../entities/rocks/rocks';
import { TreeTile } from '../../entities/tree/tree';
import { HouseTile } from '../../entities/house/house';
import { TreeType } from '../../entities/tree/tree.const';
import { RocksType } from '../../entities/rocks/rocks.const';
import { HouseType } from '../../entities/house/house.const';
import { BoundaryTile } from '../../entities/boundary/boundary';
import { BoundaryType } from '../../entities/boundary/boundary.const';
import { GoldMineTile } from '../../entities/gold-mine/gold-mine';
import { GoldMineType } from '../../entities/gold-mine/gold-mine.const';
import { SheepType } from '../../entities/sheep/sheep.const';
import { SheepTile } from '../../entities/sheep/sheep';

export const enum TileName {
  WATER_MIDDLE_MIDDLE,

  SAND_TOP_LEFT,
  SAND_TOP_MIDDLE,
  SAND_TOP_RIGHT,
  SAND_BOTTOM_LEFT,
  SAND_BOTTOM_MIDDLE,
  SAND_BOTTOM_RIGHT,
  SAND_MIDDLE_LEFT,
  SAND_MIDDLE_MIDDLE,
  SAND_MIDDLE_RIGHT,
  SAND_HORIZONTAL_LEFT,
  SAND_HORIZONTAL_MIDDLE,
  SAND_HORIZONTAL_RIGHT,
  SAND_VERTICAL_TOP,
  SAND_VERTICAL_MIDDLE,
  SAND_VERTICAL_BOTTOM,

  GROUND_TOP_LEFT,
  GROUND_TOP_MIDDLE,
  GROUND_TOP_RIGHT,
  GROUND_BOTTOM_LEFT,
  GROUND_BOTTOM_MIDDLE,
  GROUND_BOTTOM_RIGHT,
  GROUND_MIDDLE_LEFT,
  GROUND_MIDDLE_MIDDLE,
  GROUND_MIDDLE_RIGHT,
  GROUND_HORIZONTAL_LEFT,
  GROUND_HORIZONTAL_MIDDLE,
  GROUND_HORIZONTAL_RIGHT,
  GROUND_VERTICAL_TOP,
  GROUND_VERTICAL_MIDDLE,
  GROUND_VERTICAL_BOTTOM,

  ELEVATION_TOP_LEFT,
  ELEVATION_TOP_MIDDLE,
  ELEVATION_TOP_RIGHT,
  ELEVATION_BOTTOM_LEFT,
  ELEVATION_BOTTOM_MIDDLE,
  ELEVATION_BOTTOM_RIGHT,
  ELEVATION_MIDDLE_LEFT,
  ELEVATION_MIDDLE_MIDDLE,
  ELEVATION_MIDDLE_RIGHT,
  ELEVATION_HORIZONTAL_LEFT,
  ELEVATION_HORIZONTAL_MIDDLE,
  ELEVATION_HORIZONTAL_RIGHT,
  ELEVATION_VERTICAL_TOP,
  ELEVATION_VERTICAL_MIDDLE,
  ELEVATION_VERTICAL_BOTTOM,
  ELEVATION_VERTICAL_EDGE,
  ELEVATION_EDGE_LEFT,
  ELEVATION_EDGE_MIDDLE,
  ELEVATION_EDGE_RIGHT,

  FOAM_TOP,
  FOAM_LEFT,
  FOAM_RIGHT,
  FOAM_BOTTOM,
  FOAM_MIDDLE,

  BRIDGE_LEFT,
  BRIDGE_MIDDLE,
  BRIDGE_RIGHT,
  BRIDGE_SHADOW,

  DECO_MUSHROOM_S,
  DECO_MUSHROOM_M,
  DECO_MUSHROOM_L,
  DECO_STONE_S,
  DECO_STONE_M,
  DECO_STONE_L,
  DECO_BUSH_S,
  DECO_BUSH_M,
  DECO_BUSH_L,
  DECO_WEED_S,
  DECO_WEED_M,
  DECO_PUMPKIN_S,
  DECO_PUMPKIN_M,

  DECO_BONE_S_RIGHT,
  DECO_BONE_S_LEFT,
  DECO_BONE_M_RIGHT,
  DECO_BONE_M_LEFT,
  DECO_SIGN_STOP_TOP,
  DECO_SIGN_STOP_BOTTOM,
  DECO_SIGH_RIGHT_TOP,
  DECO_SIGH_RIGHT_BOTTOM,
  DECO_SCARECROW,

  ROCKS_S,
  ROCKS_M,
  ROCKS_L,

  SHEEP_RIGHT,
  SHEEP_LEFT,

  TREE_TOP_LEFT,
  TREE_TOP_MIDDLE,
  TREE_TOP_RIGHT,
  TREE_MIDDLE_LEFT,
  TREE_MIDDLE_MIDDLE,
  TREE_MIDDLE_RIGHT,
  TREE_BOTTOM_LEFT,
  TREE_BOTTOM_MIDDLE,
  TREE_BOTTOM_RIGHT,
  TREE_STRUMP,

  HOUSE_TOP_LEFT,
  HOUSE_TOP_RIGHT,
  HOUSE_MIDDLE_LEFT,
  HOUSE_MIDDLE_RIGHT,
  HOUSE_BOTTOM_LEFT,
  HOUSE_BOTTOM_RIGHT,

  GOLDMINE_TOP_LEFT,
  GOLDMINE_TOP_MIDDLE,
  GOLDMINE_TOP_RIGHT,
  GOLDMINE_BOTTOM_LEFT,
  GOLDMINE_BOTTOM_MIDDLE,
  GOLDMINE_BOTTOM_RIGHT,

  BOUNDARY,
}

export const mapTileNameToClass: Partial<Record<TileName, { constructor: any; args: Array<any> }>> = {
  [TileName.WATER_MIDDLE_MIDDLE]: { constructor: WaterTile, args: [] },

  [TileName.SAND_TOP_LEFT]: { constructor: SandTile, args: [SandType.TOP_LEFT] },
  [TileName.SAND_TOP_MIDDLE]: { constructor: SandTile, args: [SandType.TOP_MIDDLE] },
  [TileName.SAND_TOP_RIGHT]: { constructor: SandTile, args: [SandType.TOP_RIGHT] },
  [TileName.SAND_BOTTOM_LEFT]: { constructor: SandTile, args: [SandType.BOTTOM_LEFT] },
  [TileName.SAND_BOTTOM_MIDDLE]: { constructor: SandTile, args: [SandType.BOTTOM_MIDDLE] },
  [TileName.SAND_BOTTOM_RIGHT]: { constructor: SandTile, args: [SandType.BOTTOM_RIGHT] },
  [TileName.SAND_MIDDLE_LEFT]: { constructor: SandTile, args: [SandType.MIDDLE_LEFT] },
  [TileName.SAND_MIDDLE_MIDDLE]: { constructor: SandTile, args: [SandType.MIDDLE_MIDDLE] },
  [TileName.SAND_MIDDLE_RIGHT]: { constructor: SandTile, args: [SandType.MIDDLE_RIGHT] },
  [TileName.SAND_VERTICAL_TOP]: { constructor: SandTile, args: [SandType.VERTICAL_TOP] },
  [TileName.SAND_VERTICAL_MIDDLE]: { constructor: SandTile, args: [SandType.VERTICAL_MIDDLE] },
  [TileName.SAND_VERTICAL_BOTTOM]: { constructor: SandTile, args: [SandType.VERTICAL_BOTTOM] },
  [TileName.SAND_HORIZONTAL_LEFT]: { constructor: SandTile, args: [SandType.HORIZONTAL_LEFT] },
  [TileName.SAND_HORIZONTAL_MIDDLE]: { constructor: SandTile, args: [SandType.HORIZONTAL_MIDDLE] },
  [TileName.SAND_HORIZONTAL_RIGHT]: { constructor: SandTile, args: [SandType.HORIZONTAL_RIGHT] },

  [TileName.GROUND_TOP_LEFT]: { constructor: GroundTile, args: [GroundType.TOP_LEFT] },
  [TileName.GROUND_TOP_MIDDLE]: { constructor: GroundTile, args: [GroundType.TOP_MIDDLE] },
  [TileName.GROUND_TOP_RIGHT]: { constructor: GroundTile, args: [GroundType.TOP_RIGHT] },
  [TileName.GROUND_BOTTOM_LEFT]: { constructor: GroundTile, args: [GroundType.BOTTOM_LEFT] },
  [TileName.GROUND_BOTTOM_MIDDLE]: { constructor: GroundTile, args: [GroundType.BOTTOM_MIDDLE] },
  [TileName.GROUND_BOTTOM_RIGHT]: { constructor: GroundTile, args: [GroundType.BOTTOM_RIGHT] },
  [TileName.GROUND_MIDDLE_LEFT]: { constructor: GroundTile, args: [GroundType.MIDDLE_LEFT] },
  [TileName.GROUND_MIDDLE_MIDDLE]: { constructor: GroundTile, args: [GroundType.MIDDLE_MIDDLE] },
  [TileName.GROUND_MIDDLE_RIGHT]: { constructor: GroundTile, args: [GroundType.MIDDLE_RIGHT] },
  [TileName.GROUND_HORIZONTAL_LEFT]: { constructor: GroundTile, args: [GroundType.HORIZONTAL_LEFT] },
  [TileName.GROUND_HORIZONTAL_MIDDLE]: { constructor: GroundTile, args: [GroundType.HORIZONTAL_MIDDLE] },
  [TileName.GROUND_HORIZONTAL_RIGHT]: { constructor: GroundTile, args: [GroundType.HORIZONTAL_RIGHT] },
  [TileName.GROUND_VERTICAL_TOP]: { constructor: GroundTile, args: [GroundType.VERTICAL_TOP] },
  [TileName.GROUND_VERTICAL_MIDDLE]: { constructor: GroundTile, args: [GroundType.VERTICAL_MIDDLE] },
  [TileName.GROUND_VERTICAL_BOTTOM]: { constructor: GroundTile, args: [GroundType.VERTICAL_BOTTOM] },

  [TileName.BRIDGE_LEFT]: { constructor: BridgeTile, args: [BridgeType.LEFT] },
  [TileName.BRIDGE_MIDDLE]: { constructor: BridgeTile, args: [BridgeType.MIDDLE] },
  [TileName.BRIDGE_RIGHT]: { constructor: BridgeTile, args: [BridgeType.RIGHT] },
  [TileName.BRIDGE_SHADOW]: { constructor: BridgeTile, args: [BridgeType.SHADOW] },

  [TileName.ELEVATION_TOP_LEFT]: { constructor: ElevationTile, args: [ElevationType.TOP_LEFT] },
  [TileName.ELEVATION_TOP_MIDDLE]: { constructor: ElevationTile, args: [ElevationType.TOP_MIDDLE] },
  [TileName.ELEVATION_TOP_RIGHT]: { constructor: ElevationTile, args: [ElevationType.TOP_RIGHT] },
  [TileName.ELEVATION_BOTTOM_LEFT]: { constructor: ElevationTile, args: [ElevationType.BOTTOM_LEFT] },
  [TileName.ELEVATION_BOTTOM_MIDDLE]: { constructor: ElevationTile, args: [ElevationType.BOTTOM_MIDDLE] },
  [TileName.ELEVATION_BOTTOM_RIGHT]: { constructor: ElevationTile, args: [ElevationType.BOTTOM_RIGHT] },
  [TileName.ELEVATION_MIDDLE_LEFT]: { constructor: ElevationTile, args: [ElevationType.MIDDLE_LEFT] },
  [TileName.ELEVATION_MIDDLE_MIDDLE]: { constructor: ElevationTile, args: [ElevationType.MIDDLE_MIDDLE] },
  [TileName.ELEVATION_MIDDLE_RIGHT]: { constructor: ElevationTile, args: [ElevationType.MIDDLE_RIGHT] },
  [TileName.ELEVATION_HORIZONTAL_LEFT]: { constructor: ElevationTile, args: [ElevationType.HORIZONTAL_LEFT] },
  [TileName.ELEVATION_HORIZONTAL_MIDDLE]: { constructor: ElevationTile, args: [ElevationType.HORIZONTAL_MIDDLE] },
  [TileName.ELEVATION_HORIZONTAL_RIGHT]: { constructor: ElevationTile, args: [ElevationType.HORIZONTAL_RIGHT] },
  [TileName.ELEVATION_VERTICAL_TOP]: { constructor: ElevationTile, args: [ElevationType.VERTICAL_TOP] },
  [TileName.ELEVATION_VERTICAL_MIDDLE]: { constructor: ElevationTile, args: [ElevationType.VERTICAL_MIDDLE] },
  [TileName.ELEVATION_VERTICAL_BOTTOM]: { constructor: ElevationTile, args: [ElevationType.VERTICAL_BOTTOM] },
  [TileName.ELEVATION_VERTICAL_EDGE]: { constructor: ElevationTile, args: [ElevationType.VERTICAL_EDGE] },
  [TileName.ELEVATION_EDGE_LEFT]: { constructor: ElevationTile, args: [ElevationType.EDGE_LEFT] },
  [TileName.ELEVATION_EDGE_MIDDLE]: { constructor: ElevationTile, args: [ElevationType.EDGE_MIDDLE] },
  [TileName.ELEVATION_EDGE_RIGHT]: { constructor: ElevationTile, args: [ElevationType.EDGE_RIGHT] },

  [TileName.FOAM_TOP]: { constructor: FoamTile, args: [FoamType.TOP] },
  [TileName.FOAM_LEFT]: { constructor: FoamTile, args: [FoamType.LEFT] },
  [TileName.FOAM_RIGHT]: { constructor: FoamTile, args: [FoamType.RIGHT] },
  [TileName.FOAM_BOTTOM]: { constructor: FoamTile, args: [FoamType.BOTTOM] },
  [TileName.FOAM_MIDDLE]: { constructor: FoamTile, args: [FoamType.MIDDLE] },

  [TileName.DECO_MUSHROOM_S]: { constructor: DecoTile, args: [DecoType.MUSHROOM_S] },
  [TileName.DECO_MUSHROOM_M]: { constructor: DecoTile, args: [DecoType.MUSHROOM_M] },
  [TileName.DECO_MUSHROOM_L]: { constructor: DecoTile, args: [DecoType.MUSHROOM_L] },
  [TileName.DECO_STONE_S]: { constructor: DecoTile, args: [DecoType.STONE_S] },
  [TileName.DECO_STONE_M]: { constructor: DecoTile, args: [DecoType.STONE_M] },
  [TileName.DECO_STONE_L]: { constructor: DecoTile, args: [DecoType.STONE_L] },
  [TileName.DECO_BUSH_S]: { constructor: DecoTile, args: [DecoType.BUSH_S] },
  [TileName.DECO_BUSH_M]: { constructor: DecoTile, args: [DecoType.BUSH_M] },
  [TileName.DECO_BUSH_L]: { constructor: DecoTile, args: [DecoType.BUSH_L] },
  [TileName.DECO_WEED_S]: { constructor: DecoTile, args: [DecoType.WEED_S] },
  [TileName.DECO_WEED_M]: { constructor: DecoTile, args: [DecoType.WEED_M] },
  [TileName.DECO_PUMPKIN_S]: { constructor: DecoTile, args: [DecoType.PUMPKIN_S] },
  [TileName.DECO_PUMPKIN_M]: { constructor: DecoTile, args: [DecoType.PUMPKIN_M] },
  [TileName.DECO_BONE_S_RIGHT]: { constructor: DecoTile, args: [DecoType.BONE_S_RIGHT] },
  [TileName.DECO_BONE_S_LEFT]: { constructor: DecoTile, args: [DecoType.BONE_S_LEFT] },
  [TileName.DECO_BONE_M_RIGHT]: { constructor: DecoTile, args: [DecoType.BONE_M_RIGHT] },
  [TileName.DECO_BONE_M_LEFT]: { constructor: DecoTile, args: [DecoType.BONE_M_LEFT] },
  [TileName.DECO_SIGN_STOP_TOP]: { constructor: DecoTile, args: [DecoType.SIGN_STOP_TOP] },
  [TileName.DECO_SIGN_STOP_BOTTOM]: { constructor: DecoTile, args: [DecoType.SIGN_STOP_BOTTOM] },
  [TileName.DECO_SIGH_RIGHT_TOP]: { constructor: DecoTile, args: [DecoType.SIGH_RIGHT_TOP] },
  [TileName.DECO_SIGH_RIGHT_BOTTOM]: { constructor: DecoTile, args: [DecoType.SIGH_RIGHT_BOTTOM] },
  [TileName.DECO_SCARECROW]: { constructor: DecoTile, args: [DecoType.SCARECROW] },

  [TileName.ROCKS_S]: { constructor: RocksTile, args: [RocksType.ROCKS_S] },
  [TileName.ROCKS_M]: { constructor: RocksTile, args: [RocksType.ROCKS_M] },
  [TileName.ROCKS_L]: { constructor: RocksTile, args: [RocksType.ROCKS_L] },

  [TileName.SHEEP_RIGHT]: { constructor: SheepTile, args: [SheepType.SHEEP_RIGHT] },
  [TileName.SHEEP_LEFT]: { constructor: SheepTile, args: [SheepType.SHEEP_LEFT] },

  [TileName.TREE_TOP_LEFT]: { constructor: TreeTile, args: [TreeType.TOP_LEFT] },
  [TileName.TREE_TOP_MIDDLE]: { constructor: TreeTile, args: [TreeType.TOP_MIDDLE] },
  [TileName.TREE_TOP_RIGHT]: { constructor: TreeTile, args: [TreeType.TOP_RIGHT] },
  [TileName.TREE_MIDDLE_LEFT]: { constructor: TreeTile, args: [TreeType.MIDDLE_LEFT] },
  [TileName.TREE_MIDDLE_MIDDLE]: { constructor: TreeTile, args: [TreeType.MIDDLE_MIDDLE] },
  [TileName.TREE_MIDDLE_RIGHT]: { constructor: TreeTile, args: [TreeType.MIDDLE_RIGHT] },
  [TileName.TREE_BOTTOM_LEFT]: { constructor: TreeTile, args: [TreeType.BOTTOM_LEFT] },
  [TileName.TREE_BOTTOM_MIDDLE]: { constructor: TreeTile, args: [TreeType.BOTTOM_MIDDLE] },
  [TileName.TREE_BOTTOM_RIGHT]: { constructor: TreeTile, args: [TreeType.BOTTOM_RIGHT] },
  [TileName.TREE_STRUMP]: { constructor: TreeTile, args: [TreeType.STRUMP] },

  [TileName.HOUSE_TOP_LEFT]: { constructor: HouseTile, args: [HouseType.TOP_LEFT] },
  [TileName.HOUSE_TOP_RIGHT]: { constructor: HouseTile, args: [HouseType.TOP_RIGHT] },
  [TileName.HOUSE_MIDDLE_LEFT]: { constructor: HouseTile, args: [HouseType.MIDDLE_LEFT] },
  [TileName.HOUSE_MIDDLE_RIGHT]: { constructor: HouseTile, args: [HouseType.MIDDLE_RIGHT] },
  [TileName.HOUSE_BOTTOM_LEFT]: { constructor: HouseTile, args: [HouseType.BOTTOM_LEFT] },
  [TileName.HOUSE_BOTTOM_RIGHT]: { constructor: HouseTile, args: [HouseType.BOTTOM_RIGHT] },

  [TileName.GOLDMINE_TOP_LEFT]: { constructor: GoldMineTile, args: [GoldMineType.TOP_LEFT] },
  [TileName.GOLDMINE_TOP_MIDDLE]: { constructor: GoldMineTile, args: [GoldMineType.TOP_MIDDLE] },
  [TileName.GOLDMINE_TOP_RIGHT]: { constructor: GoldMineTile, args: [GoldMineType.TOP_RIGHT] },
  [TileName.GOLDMINE_BOTTOM_LEFT]: { constructor: GoldMineTile, args: [GoldMineType.BOTTOM_LEFT] },
  [TileName.GOLDMINE_BOTTOM_MIDDLE]: { constructor: GoldMineTile, args: [GoldMineType.BOTTOM_MIDDLE] },
  [TileName.GOLDMINE_BOTTOM_RIGHT]: { constructor: GoldMineTile, args: [GoldMineType.BOTTOM_RIGHT] },

  [TileName.BOUNDARY]: { constructor: BoundaryTile, args: [BoundaryType.MIDDLE] },
};
