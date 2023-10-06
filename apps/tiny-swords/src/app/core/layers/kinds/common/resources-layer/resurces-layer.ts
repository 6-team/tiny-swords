import { resourcesConditions } from "./resources-conditions";
import { Layer } from "../../../../layer/layer";
import { LevelType } from "../../../../level/level.types";

export class ResourcesLayer {
  constructor(gridX: number, gridY: number, level: LevelType, layers) {
    return new Layer(gridX, gridY).fill([
      resourcesConditions(level, layers),
    ]);
  }
}