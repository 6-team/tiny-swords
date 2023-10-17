import { CoordsTuple } from "../../../../entities/tile/tile.types";
import { Layer } from "../../../layer/layer";
import { LevelType } from "../../../level/level.types";
import { foregroundLeftHouseConditions, foregroundRightHouseConditions, foregroundTreeTopConditions } from "./foreground-conditions"

export class ForegroundLayer {
  constructor(gridX: number, gridY: number, level: LevelType, nextLevel: LevelType, startCoords: CoordsTuple, endCoords: CoordsTuple, layer) {
    let conditionsList = [];

    if (level === LevelType.Ground) {
      conditionsList = [
        foregroundLeftHouseConditions(startCoords),
        foregroundTreeTopConditions(layer),
      ]
    }

    if (nextLevel === LevelType.Ground) {
      conditionsList.push(foregroundRightHouseConditions(endCoords));
    }

    return new Layer(gridX, gridY).fill(conditionsList);
  }
}