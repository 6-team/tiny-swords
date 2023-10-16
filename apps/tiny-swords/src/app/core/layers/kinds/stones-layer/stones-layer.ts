import { Layer } from "../../../layer/layer";
import { randomElement } from "../../layers.utils";
import { borderWaterConditions, centerBridgeConditions, centerStonesConditions, leftGroundBridgeConditions, leftGroundConditions, rightGroundBridgeConditions, rightGroundConditions } from "./stones-conditions";
import { STONES_RULES, STONES_WEIGHT } from "./stones-rules";

export class StonesLayer {
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