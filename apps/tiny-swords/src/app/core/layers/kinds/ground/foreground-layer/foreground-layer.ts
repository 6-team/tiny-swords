import { CoordsTuple } from "../../../../../entities/tile/tile.types";
import { Layer } from "../../../../layer/layer";
import { LevelType } from "../../../../level/level";
import { foregroundLeftHouseConditions, foregroundRightHouseConditions, foregroundTreeTopConditions } from "./foreground-conditions"
export class ForegroundLayer {
  constructor(gridX: number, gridY: number, nextLevelType: LevelType, startCoords: CoordsTuple, endCoords: CoordsTuple, layer) {

    const conditionList = [
      foregroundLeftHouseConditions(startCoords),
      foregroundTreeTopConditions(layer)
    ];

    if (nextLevelType === LevelType.Ground) {
      conditionList.push(foregroundRightHouseConditions(endCoords));
    }


    return new Layer(gridX, gridY).fill(conditionList);
  }
}