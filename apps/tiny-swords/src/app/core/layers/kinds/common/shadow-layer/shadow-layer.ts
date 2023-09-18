import { shadowGroundConditions, shadowSandConditions } from "./shadow-conditions";
import { Layer } from "../../../../layer/layer";
import { LevelType } from "../../../../level/level";

export class ShadowLayer {
  constructor(gridX: number, gridY: number, level, layer) {
    const shadowCondotions = level === LevelType.Ground
      ? shadowGroundConditions
      : shadowSandConditions;
    return new Layer(gridX, gridY).fill([shadowCondotions(layer)]);
  }
}