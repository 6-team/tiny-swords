import { Layer } from "../../../layer/layer";
import { randomElement } from "../../layers.utils";
import { borderWaterConditions, centerBridgeConditions, centerSandConditions, leftSandBridgeConditions, leftSandConditions, rightSandBridgeConditions, rightSandConditions } from "./sand-conditions";
import { SAND_RULES, SAND_WEIGHT } from "./sand-rules";

export class SandLayer {
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