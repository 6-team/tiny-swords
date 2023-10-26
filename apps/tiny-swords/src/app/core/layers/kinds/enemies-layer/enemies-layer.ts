import { enemiesConditions } from "./enemies-conditions";
import { Layer } from "@core/layer";
import { LevelType } from "@core/level";

/**
 * Represents an EnemiesLayer class responsible for creating and populating an instance of Layer.
 */
export class EnemiesLayer {
  /**
   * Creates a new EnemiesLayer instance with the specified parameters.
   * @param {number} gridX - The X coordinate of the grid.
   * @param {number} gridY - The Y coordinate of the grid.
   * @param {LevelType} level - The level type for the layer.
   * @param {[number, number]} startCoords - The starting coordinates as an array [x, y].
   * @param {[number, number]} endCoords - The ending coordinates as an array [x, y].
   * @param {Layer[]} layers - The layers parameter (missing type information).
   * @returns {Layer} A new Layer instance filled with data based on enemiesConditions.
   */
  constructor(gridX: number, gridY: number, level: LevelType, startCoords: [number, number], endCoords: [number, number], layers: Layer[]) {
    return new Layer(gridX, gridY).fill([
      enemiesConditions(level, startCoords, endCoords, layers),
    ]);
  }
}