import { enemiesConditions } from "./enemies-conditions";
import { Layer } from "../../../layer/layer";
import { LevelType } from "../../../level/level.types";

export class EnemiesLayer {
  constructor(gridX: number, gridY: number, level: LevelType, startCoords: [number, number], endCoords: [number, number], layers) {
    return new Layer(gridX, gridY).fill([
      enemiesConditions(level, startCoords, endCoords, layers),
    ]);
  }
}