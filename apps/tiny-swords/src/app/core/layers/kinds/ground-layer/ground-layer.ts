import { Layer } from "@core/layer";
import { randomElement } from "@core/layers";
import { borderWaterConditions, centerBridgeConditions, centerGroundConditions, leftGroundBridgeConditions, leftGroundConditions, rightGroundBridgeConditions, rightGroundConditions } from "./ground-conditions";
import { GROUND_RULES, GROUND_WEIGHT } from "./ground-rules";

/**
 * A class representing a ground layer that generates ground and terrain features.
 */
export class GroundLayer {
  /**
   * Creates a new GroundLayer with specified parameters.
   * @param {number} gridX - The width of the grid for the ground layer.
   * @param {number} gridY - The height of the grid for the ground layer.
   * @param {number} border - The border size for the ground layer.
   * @param {Array<number>} startCoords - The starting coordinates [x, y] for the ground.
   * @param {Array<number>} endCoords - The ending coordinates [x, y] for the ground.
   */
  constructor(gridX: number, gridY: number, border: number, startCoords: [number, number], endCoords: [number, number]) {

    const leftBuild = randomElement([leftGroundConditions, leftGroundBridgeConditions]);
    const rightBuild = randomElement([rightGroundConditions, rightGroundBridgeConditions])

    const feature = randomElement([centerBridgeConditions, centerGroundConditions]);

    return new Layer(gridX, gridY)
      .fill([
        borderWaterConditions(gridX, gridY, border),
        leftBuild(startCoords),
        rightBuild(endCoords),
        feature(gridX, gridY, border),
      ])
      .wfc(GROUND_RULES, GROUND_WEIGHT);
  }
}
