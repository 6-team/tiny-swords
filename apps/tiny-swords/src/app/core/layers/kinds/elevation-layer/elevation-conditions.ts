import { Layer } from "@core/layer";
import { LayerCondition } from "@core/layer";
import { LevelType } from "@core/level";
import { SpriteName } from "@core/renderer";

/**
 * Generates elevation conditions based on the provided sprite and coordinates.
 *
 * @param {number} sprite - The sprite value for which elevation conditions are determined.
 * @param {[number, number]} coords - The coordinates [x, y] associated with the sprite.
 *
 * @returns {Array} An array of elevation conditions, each containing a sprite and new coordinates.
 */
const getStonesConditions = (sprite, coords) => {
  switch(sprite) {
    case SpriteName.BRIDGE_MIDDLE:
      return [{ sprite: SpriteName.BRIDGE_SHADOW, coords: [coords[0], coords[1] + 1] }];

    case SpriteName.ELEVATION_BOTTOM_LEFT:
      return [{ sprite: SpriteName.ELEVATION_EDGE_LEFT, coords: [coords[0], coords[1] + 1] }];
    case SpriteName.ELEVATION_BOTTOM_MIDDLE:
      return [{ sprite: SpriteName.ELEVATION_EDGE_MIDDLE, coords: [coords[0], coords[1] + 1] }];
    case SpriteName.ELEVATION_BOTTOM_RIGHT:
      return [{ sprite: SpriteName.ELEVATION_EDGE_RIGHT, coords: [coords[0], coords[1] + 1] }];
  
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
