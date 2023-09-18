import { LevelType } from "../../../../level/level";
import { goldMineConditions, leftHouseConditions, rightHouseConditions, treeBottomConditions } from "./buldings-conditions";
import { Layer } from "../../../../layer/layer";

export class BuildingsLayer {
  constructor(gridX: number, gridY: number, level: LevelType, nextLevel: LevelType, startCoords: [number, number], endCoords: [number, number], layer) {
    const leftHouse = level === LevelType.Sand
      ? goldMineConditions
      : leftHouseConditions;
    
    const rightHouse = nextLevel === LevelType.Sand
      ? goldMineConditions
      : rightHouseConditions;
    
    return new Layer(gridX, gridY).fill([
      leftHouse(startCoords),
      rightHouse(endCoords),
      treeBottomConditions(layer),
    ]);
  }
}