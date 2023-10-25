import { goldMineConditions, leftHouseConditions, leftTowerConditions, rightHouseConditions, rightTowerConditions, treeBottomConditions } from "./buldings-conditions";
import { Layer } from "../../../layer/layer";
import { LevelType } from "../../../level/level.types";

/**
 * Represents a class for creating a layer that includes buildings based on the current and next level types.
 */
export class BuildingsLayer {
  /**
   * Constructs a new buildings layer with specified conditions.
   *
   * @param {number} gridX - The size of the grid by width.
   * @param {number} gridY - The size of the grid by height.
   * @param {LevelType} level - The type of the current level.
   * @param {LevelType} nextLevel - The type of the next level.
   * @param {[number, number]} startCoords - Coordinates to place the left house.
   * @param {[number, number]} endCoords - Coordinates to place the right house.
   * @param {object} layer - The layer to determine tree bottom conditions.
   * @returns {Layer} - A layer filled with building conditions.
   */
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