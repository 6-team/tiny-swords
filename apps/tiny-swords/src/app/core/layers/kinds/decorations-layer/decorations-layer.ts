import { decorationsTerrainConditions } from "./deco-ground-conditions";
import { Layer } from "../../../layer/layer";
import { LevelType } from "../../../level/level.types";
import { decorationsWaterConditions } from "./deco-water-conditions";

export class DecoLayer {
  constructor(gridX: number, gridY: number, level: LevelType, layers) {
    return new Layer(gridX, gridY).fill([
      decorationsWaterConditions(layers),
      decorationsTerrainConditions(level, layers),
    ]);
  }
}