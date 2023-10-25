import { Layer } from "../../../layer/layer";
import { LevelType } from "../../../level/level.types";
import { elevationConditions } from "./elevation-conditions";

/**
 * Represents an ElevationLayer class responsible for creating
 * and populating an instance of Layer with elevation conditions.
 */
export class ElevationLayer {
  /**
   * Creates a new ElevationLayer instance with the specified parameters and fills it with elevation conditions.
   *
   * @param {number} gridX - The X coordinate of the grid.
   * @param {number} gridY - The Y coordinate of the grid.
   * @param {LevelType} level - The level (missing type information) associated with the layer.
   * @param {Layer} layer - The layer (missing type information) from which elevation conditions are derived.
   * 
   * @returns {Layer} A new Layer instance filled with elevation conditions for the given level and layer.
   */
  constructor(gridX: number, gridY: number, level: LevelType, layer: Layer) {
    return new Layer(gridX, gridY).fill([
      elevationConditions(level, layer),
    ]);
  }
}