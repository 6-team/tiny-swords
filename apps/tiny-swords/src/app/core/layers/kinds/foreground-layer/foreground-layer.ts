import { CoordsTuple } from "../../../../entities/tile/tile.types";
import { Layer } from "../../../layer/layer";
import { LevelType } from "../../../level/level.types";
import { foregroundLeftHouseConditions, foregroundLeftTowerConditions, foregroundRightHouseConditions, foregroundRightTowerConditions, foregroundTreeTopConditions } from "./foreground-conditions"

export class ForegroundLayer {
  constructor(gridX: number, gridY: number, level: LevelType, nextLevel: LevelType, startCoords: CoordsTuple, endCoords: CoordsTuple, layer) {
    let conditionsList = [];

    if (level === LevelType.Ground) {
      conditionsList = [
        foregroundLeftHouseConditions(startCoords),
        foregroundTreeTopConditions(layer),
      ]
    } else if (level === LevelType.Stones) {
      conditionsList = [
        foregroundLeftTowerConditions(startCoords),
      ]
    }

    if (nextLevel === LevelType.Ground) {
      conditionsList.push(foregroundRightHouseConditions(endCoords));
    } else if (nextLevel === LevelType.Stones) {
      conditionsList.push(foregroundRightTowerConditions(endCoords));
    }

    return new Layer(gridX, gridY).fill(conditionsList);
  }
}