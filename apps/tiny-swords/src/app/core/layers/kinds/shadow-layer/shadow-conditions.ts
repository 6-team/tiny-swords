import { LayerCondition } from "@core/layer";
import { LevelType } from "@core/level";
import { TileName } from "@core/renderer";

/**
 * Get ground conditions based on the given tile and coordinates.
 * 
 * @param {TileName} tile - The tile type.
 * @param {Array<number>} coords - The coordinates [x, y] for the tile.
 * @returns {Array<LayerCondition>} An array of ground conditions.
 */
const getGroundConditions = (tile, coords) => {
  switch(tile) {
    // shadow bridge
    case TileName.BRIDGE_MIDDLE:
      return [{ tile: TileName.BRIDGE_SHADOW, coords }];

    // Grass under the bridge foundations
    case TileName.BRIDGE_LEFT:
      return [{ tile: TileName.GROUND_MIDDLE_RIGHT, coords }];
    case TileName.BRIDGE_RIGHT:
      return [{ tile: TileName.GROUND_MIDDLE_LEFT, coords }];
    case TileName.TREE_STRUMP:
      return [{ tile: TileName.GROUND_MIDDLE_MIDDLE, coords }];

    default:
      return [];
  }
}

/**
 * Get sand conditions based on the given tile and coordinates.
 * 
 * @param {TileName} tile - The tile type.
 * @param {Array<number>} coords - The coordinates [x, y] for the tile.
 * @returns {Array<LayerCondition>} An array of sand conditions.
 */
const getSandConditions = (tile, coords) => {
  switch(tile) {
    // Shadow under the bridge
    case TileName.BRIDGE_MIDDLE:
      return [{ tile: TileName.BRIDGE_SHADOW, coords }];

    // Sand under the bridge foundations
    case TileName.BRIDGE_LEFT:
      return [{ tile: TileName.SAND_MIDDLE_RIGHT, coords }];
    case TileName.BRIDGE_RIGHT:
      return [{ tile: TileName.SAND_MIDDLE_LEFT, coords }];

    default:
      return [];
  }
}

/**
 * Get stone conditions based on the given tile and coordinates.
 * 
 * @param {TileName} tile - The tile type.
 * @param {Array<number>} coords - The coordinates [x, y] for the tile.
 * @returns {Array<LayerCondition>} An array of stone conditions.
 */
const getStonesConditions = (tile, coords) => {
  switch(tile) {
    // Stone under the bridge foundations
    case TileName.BRIDGE_LEFT:
      return [{ tile: TileName.ELEVATION_MIDDLE_RIGHT, coords }];
    case TileName.BRIDGE_RIGHT:
      return [{ tile: TileName.ELEVATION_MIDDLE_LEFT, coords }];

    default:
      return [];
  }
}

/**
 * Template for additional layers:
 * - Shadows under bridges
 * - Grass or sand on bridges
 * - Foam
 *
 * @param {LevelType} level - The type of layer (Ground, Sand, Stones).
 * @param {Layer} layer - The base layer to which conditions will be applied.
 * @returns {Array<LayerCondition>} An array of conditions for the specified layer type.
 */
export const shadowConditions = (level: LevelType, layer): LayerCondition[] => {
  let conditions = [];
  let getConditions;
  
  switch(level) {
    case LevelType.Ground:
      getConditions = getGroundConditions;
      break;
    case LevelType.Sand:
      getConditions = getSandConditions;
      break;
    case LevelType.Stones:
      getConditions = getStonesConditions;
      break;
  }

  layer.array.forEach(({ coords, options }) => {
    const conditionsCell = getConditions(options[0], coords);

    if (conditionsCell.length) {
      conditions = [
        ...conditions,
        ...conditionsCell,
      ];
    }
  });

  return conditions;
}
