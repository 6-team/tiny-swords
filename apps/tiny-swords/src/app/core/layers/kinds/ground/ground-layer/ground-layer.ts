import { Layer } from "../../../../layer/layer";
import { LevelType } from "../../../../level/level";
import { randomElement } from "../../../layers.utils";
import { borderWaterConditions, centerBridgeConditions, centerGroundConditions, leftGroundBridgeConditions, leftGroundConditions, rightGroundBridgeConditions3x2, rightGroundBridgeConditions3x3, rightGroundConditions3x2, rightGroundConditions3x3 } from "./ground-conditions";
import { GROUND_RULES, GROUND_WEIGHT } from "./ground-rules";

export class GroundLayer {
  constructor(gridX: number, gridY: number, border: number, startCoords: [number, number], endCoords: [number, number], nextLevelType: LevelType) {

    const leftBuild = randomElement([leftGroundConditions, leftGroundBridgeConditions]);
    const rightBuild = nextLevelType === LevelType.Sand
      ? randomElement([rightGroundConditions3x3, rightGroundBridgeConditions3x3])
      : randomElement([rightGroundConditions3x2, rightGroundBridgeConditions3x2]);

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