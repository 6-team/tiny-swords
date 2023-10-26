import { Layer } from "@core/layer";
import { randomElement } from "../../layers.utils";
import { borderWaterConditions, centerBridgeConditions, centerStonesConditions, leftGroundBridgeConditions, leftGroundConditions, rightGroundBridgeConditions, rightGroundConditions } from "./stones-conditions";
import { STONES_RULES, STONES_WEIGHT } from "./stones-rules";

/**
 * Represents a StonesLayer class responsible for creating
 * and populating an instance of Layer with stone-related conditions.
 */
export class StonesLayer {
  /**
   * Creates a new StonesLayer instance with the specified parameters and populates it with stone-related conditions.
   *
   * @param {number} gridX - The X coordinate of the grid.
   * @param {number} gridY - The Y coordinate of the grid.
   * @param {number} border - The border value for the stone layer.
   * @param {[number, number]} startCoords - The starting coordinates as an array [x, y].
   * @param {[number, number]} endCoords - The ending coordinates as an array [x, y].
   *
   * @returns {Layer} A new Layer instance filled with stone-related conditions based on the provided parameters.
   */
  constructor(gridX: number, gridY: number, border: number, startCoords: [number, number], endCoords: [number, number]) {

    const leftBuild = randomElement([leftGroundConditions, leftGroundBridgeConditions]);
    const rightBuild = randomElement([rightGroundConditions, rightGroundBridgeConditions])

    const feature = randomElement([centerBridgeConditions, centerStonesConditions]);

    return new Layer(gridX, gridY)
      .fill([
        borderWaterConditions(gridX, gridY, border),
        leftBuild(startCoords),
        rightBuild(endCoords),
        feature(gridX, gridY, border),
      ])
      .wfc(STONES_RULES, STONES_WEIGHT);
  }
}