import { goldMineConditions, leftHouseConditions, leftTowerConditions, rightHouseConditions, rightTowerConditions, treeBottomConditions } from "./buldings-conditions";
import { Layer } from "../../../layer/layer";
import { LevelType } from "../../../level/level.types";

export class BuildingsLayer {
  constructor(gridX: number, gridY: number, level: LevelType, nextLevel: LevelType, startCoords: [number, number], endCoords: [number, number], layer) {
    let leftHouse;

    switch(level) {
      case LevelType.Ground:
        leftHouse = leftHouseConditions;
        break;
      case LevelType.Sand:
        leftHouse = goldMineConditions;
        break;
      case LevelType.Stones:
        leftHouse = leftTowerConditions;
        break;
    }

    let rightHouse;

    switch(nextLevel) {
      case LevelType.Ground:
        rightHouse = rightHouseConditions;
        break;
      case LevelType.Sand:
        rightHouse = goldMineConditions;
        break;
      case LevelType.Stones:
        rightHouse = rightTowerConditions;
        break;
    }

    return new Layer(gridX, gridY).fill([
      leftHouse(startCoords),
      rightHouse(endCoords),
      treeBottomConditions(layer),
    ]);
  }
}