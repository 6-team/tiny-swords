import { decorationsTerrainConditions, decorationsWaterConditions } from "./decorations-conditions";
import { Layer } from "../../../../layer/layer";
import { LevelType } from "../../../../level/level";

export class DecoLayer {
  constructor(gridX: number, gridY: number, level: LevelType, layers) {
    return new Layer(gridX, gridY).fill([
      decorationsWaterConditions(layers),
      decorationsTerrainConditions(level, layers),
    ]);
  }
}