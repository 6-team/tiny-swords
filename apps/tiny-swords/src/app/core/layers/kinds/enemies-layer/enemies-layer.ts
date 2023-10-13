import { enemiesConditions } from "./enemies-conditions";
import { Layer } from "../../../layer/layer";
import { LevelType } from "../../../level/level.types";

export class EnemiesLayer {
  constructor(gridX: number, gridY: number, level: LevelType, layers) {
    return new Layer(gridX, gridY).fill([
      enemiesConditions(level, layers),
    ]);
  }
}