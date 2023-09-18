import { LevelType } from "../../../../level/level";
import { leftHouseConditions, rightHouseConditions, treeBottomConditions } from "./buldings-conditions";
import { Layer } from "../../../../layer/layer";
import { rightGoldMineConditions } from "../../sand/buildings-layer/buldings-conditions";

export class BuildingsLayer {
  constructor(gridX: number, gridY: number, nextLevelType: LevelType, startCoords: [number, number], endCoords: [number, number], layer) {
    const rightHouse = nextLevelType === LevelType.Sand
      ? rightGoldMineConditions
      : rightHouseConditions;
    
    return new Layer(gridX, gridY).fill([
      leftHouseConditions(startCoords),
      rightHouse(endCoords),
      treeBottomConditions(layer),
    ]);
  }
}