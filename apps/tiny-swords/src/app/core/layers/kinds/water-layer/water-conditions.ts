import { LayerCondition } from "../../../layer/layer.types";
import { TileName } from "../../../renderer";

/**
 * Generates water conditions for a given layer.
 * 
 * @param {Layer} layer - The layer object representing the grid.
 * @returns {LayerCondition[]} An array of water conditions for the layer.
 */
export const fullWaterConditions = (layer): LayerCondition[] => {
  const conditions = [];

  layer.array.forEach(({ coords }) => {
    conditions.push({ tile: TileName.WATER_MIDDLE_MIDDLE, coords, })
  });

  return conditions;
}
