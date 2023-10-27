import { LayerCondition } from "@core/layer";
import { SpriteName } from "@core/renderer";

/**
 * Generates water conditions for a given layer.
 * 
 * @param {Layer} layer - The layer object representing the grid.
 * @returns {LayerCondition[]} An array of water conditions for the layer.
 */
export const fullWaterConditions = (layer): LayerCondition[] => {
  const conditions = [];

  layer.array.forEach(({ coords }) => {
    conditions.push({ sprite: SpriteName.WATER_MIDDLE_MIDDLE, coords, })
  });

  return conditions;
}
