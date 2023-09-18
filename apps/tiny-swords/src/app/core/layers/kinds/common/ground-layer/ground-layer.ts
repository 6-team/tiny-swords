import { Layer } from "../../../../layer/layer";
import { randomElement } from "../../../layers.utils";
import { borderWaterConditions, centerBridgeConditions, centerGroundConditions, leftGroundBridgeConditions, leftGroundConditions, rightGroundBridgeConditions, rightGroundConditions } from "./ground-conditions";
import { GROUND_RULES, GROUND_WEIGHT } from "./ground-rules";

export class GroundLayer {
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