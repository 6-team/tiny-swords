import { Layer, LayerCondition } from '@core/layer';
import { LevelType } from '@core/level';
import { SpriteName } from '@core/renderer';

/**
 * Get ground conditions based on the given sprite and coordinates.
 *
 * @param {SpriteName} sprite - The sprite type.
 * @param {Array<number>} coords - The coordinates [x, y] for the sprite.
 * @returns {Array<LayerCondition>} An array of ground conditions.
 */
const getGroundConditions = (sprite: SpriteName, coords: [number, number]): LayerCondition[] => {
  switch (sprite) {
    // shadow bridge
    case SpriteName.BRIDGE_MIDDLE:
      return [{ sprite: SpriteName.BRIDGE_SHADOW, coords }];

    // Grass under the bridge foundations
    case SpriteName.BRIDGE_LEFT:
      return [{ sprite: SpriteName.GROUND_MIDDLE_RIGHT, coords }];
    case SpriteName.BRIDGE_RIGHT:
      return [{ sprite: SpriteName.GROUND_MIDDLE_LEFT, coords }];
    case SpriteName.TREE_STRUMP:
      return [{ sprite: SpriteName.GROUND_MIDDLE_MIDDLE, coords }];

    default:
      return [];
  }
};

/**
 * Get sand conditions based on the given sprite and coordinates.
 *
 * @param {SpriteName} sprite - The sprite type.
 * @param {Array<number>} coords - The coordinates [x, y] for the sprite.
 * @returns {Array<LayerCondition>} An array of sand conditions.
 */
const getSandConditions = (sprite: SpriteName, coords: [number, number]): LayerCondition[] => {
  switch (sprite) {
    // Shadow under the bridge
    case SpriteName.BRIDGE_MIDDLE:
      return [{ sprite: SpriteName.BRIDGE_SHADOW, coords }];

    // Sand under the bridge foundations
    case SpriteName.BRIDGE_LEFT:
      return [{ sprite: SpriteName.SAND_MIDDLE_RIGHT, coords }];
    case SpriteName.BRIDGE_RIGHT:
      return [{ sprite: SpriteName.SAND_MIDDLE_LEFT, coords }];

    default:
      return [];
  }
};

/**
 * Get stone conditions based on the given sprite and coordinates.
 *
 * @param {SpriteName} sprite - The sprite type.
 * @param {Array<number>} coords - The coordinates [x, y] for the sprite.
 * @returns {Array<LayerCondition>} An array of stone conditions.
 */
const getStonesConditions = (sprite: SpriteName, coords: [number, number]): LayerCondition[] => {
  switch (sprite) {
    // Stone under the bridge foundations
    case SpriteName.BRIDGE_LEFT:
      return [{ sprite: SpriteName.ELEVATION_MIDDLE_RIGHT, coords }];
    case SpriteName.BRIDGE_RIGHT:
      return [{ sprite: SpriteName.ELEVATION_MIDDLE_LEFT, coords }];

    default:
      return [];
  }
};

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
export const shadowConditions = (level: LevelType, layer: Layer): LayerCondition[] => {
  let conditions = [];
  let getConditions;

  switch (level) {
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
      conditions = [...conditions, ...conditionsCell];
    }
  });

  return conditions;
};
