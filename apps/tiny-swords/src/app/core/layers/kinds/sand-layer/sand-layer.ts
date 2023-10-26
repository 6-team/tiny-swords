import { Layer } from "@core/layer";
import { randomElement } from "../../layers.utils";
import { borderWaterConditions, centerBridgeConditions, centerSandConditions, leftSandBridgeConditions, leftSandConditions, rightSandBridgeConditions, rightSandConditions } from "./sand-conditions";
import { SAND_RULES, SAND_WEIGHT } from "./sand-rules";

/**
 * Represents a SandLayer class responsible for creating
 * and populating an instance of Layer with sand-related conditions.
 */
export class SandLayer {
  /**
   * Creates a new SandLayer instance with the specified parameters and populates it with sand-related conditions.
   *
   * @param {number} gridX - The X coordinate of the grid.
   * @param {number} gridY - The Y coordinate of the grid.
   * @param {number} border - The border value for the sand layer.
   * @param {[number, number]} startCoords - The starting coordinates as an array [x, y].
   * @param {[number, number]} endCoords - The ending coordinates as an array [x, y].
   *
   * @returns {Layer} A new Layer instance filled with sand-related conditions based on the provided parameters.
   */
  constructor(gridX: number, gridY: number, border: number, startCoords: [number, number], endCoords: [number, number]) {

    const leftBuild = randomElement([leftSandConditions, leftSandBridgeConditions]);
    const rightBuild = randomElement([rightSandConditions, rightSandBridgeConditions])
    const feature = randomElement([centerBridgeConditions, centerSandConditions]);

    return new Layer(gridX, gridY)
      .fill([
        borderWaterConditions(gridX, gridY, border),
        leftBuild(startCoords),
        rightBuild(endCoords),
        feature(gridX, gridY, border),
      ])
      .wfc(SAND_RULES, SAND_WEIGHT);
  }
}