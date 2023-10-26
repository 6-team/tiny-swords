import { Layer } from "@core/layer";
import { LayerCondition } from "@core/layer";
import { LevelType } from "@core/level";
import { TileName } from "@core/renderer";

/**
 * Generates elevation conditions based on the provided tile and coordinates.
 *
 * @param {number} tile - The tile value for which elevation conditions are determined.
 * @param {[number, number]} coords - The coordinates [x, y] associated with the tile.
 *
 * @returns {Array} An array of elevation conditions, each containing a tile and new coordinates.
 */
const getStonesConditions = (tile, coords) => {
  switch(tile) {
    case TileName.BRIDGE_MIDDLE:
      return [{ tile: TileName.BRIDGE_SHADOW, coords: [coords[0], coords[1] + 1] }];

    case TileName.ELEVATION_BOTTOM_LEFT:
      return [{ tile: TileName.ELEVATION_EDGE_LEFT, coords: [coords[0], coords[1] + 1] }];
    case TileName.ELEVATION_BOTTOM_MIDDLE:
      return [{ tile: TileName.ELEVATION_EDGE_MIDDLE, coords: [coords[0], coords[1] + 1] }];
    case TileName.ELEVATION_BOTTOM_RIGHT:
      return [{ tile: TileName.ELEVATION_EDGE_RIGHT, coords: [coords[0], coords[1] + 1] }];
  
    default:
      return [];
  }
}

/**
 * Generates elevation conditions for additional elevation layers, such as shadows under bridges, grass or sand on bridges, or foam.
 *
 * @param {LevelType} level - The level type associated with the elevation conditions.
 * @param {Layer} layer - The layer (missing type information) from which elevation conditions are derived.
 *
 * @returns {LayerCondition[]} An array of elevation conditions based on the specified level and layer.
 */
export const elevationConditions = (level: LevelType, layer: Layer): LayerCondition[] => {
  let conditions = [];
  
  if (level === LevelType.Stones) {
    layer.array.forEach(({ coords, options }) => {
      const conditionsCell = getStonesConditions(options[0], coords);

      if (conditionsCell.length) {
        conditions = [
          ...conditions,
          ...conditionsCell,
        ];
      }
    });
  }

  return conditions;
}
