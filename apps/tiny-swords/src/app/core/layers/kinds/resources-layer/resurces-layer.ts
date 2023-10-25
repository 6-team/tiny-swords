import { resourcesConditions } from "./resources-conditions";
import { Layer } from "../../../layer/layer";
import { LevelType } from "../../../level/level.types";

/**
 * Represents a ResourcesLayer class responsible for creating
 * and populating an instance of Layer with resource conditions.
 */
export class ResourcesLayer {
  /**
   * Creates a new ResourcesLayer instance with the specified parameters and fills it with resource conditions.
   *
   * @param {number} gridX - The X coordinate of the grid.
   * @param {number} gridY - The Y coordinate of the grid.
   * @param {LevelType} level - The level type associated with the layer.
   * @param {Array<Layer>} layers - An array of layers containing resources (e.g., minerals or ores).
   * 
   * @returns {Layer} A new Layer instance filled with resource conditions for the given level and layers.
   */
  constructor(gridX: number, gridY: number, level: LevelType, layers: Layer[]) {
    return new Layer(gridX, gridY).fill([
      resourcesConditions(level, layers),
    ]);
  }
}