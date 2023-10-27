import { CoordsTuple } from '@entities/tile';
import { Layer } from '@core/layer';
import { LevelType } from '@core/level';
import {
  foregroundLeftHouseConditions,
  foregroundLeftTowerConditions,
  foregroundRightHouseConditions,
  foregroundRightTowerConditions,
  foregroundTreeTopConditions,
} from './foreground-conditions';

/**
 * A class representing a foreground layer with different conditions based on the level and next level.
 */
export class ForegroundLayer {
  /**
   * Creates a new ForegroundLayer.
   * @param {number} gridX - The width of the grid for the foreground layer.
   * @param {number} gridY - The height of the grid for the foreground layer.
   * @param {LevelType} level - The level type of the current layer.
   * @param {LevelType} nextLevel - The level type of the next layer.
   * @param {CoordsTuple} startCoords - The starting coordinates.
   * @param {CoordsTuple} endCoords - The ending coordinates.
   * @param {Layer} layer - The base layer for conditions.
   */
  constructor(
    gridX: number,
    gridY: number,
    level: LevelType,
    nextLevel: LevelType,
    startCoords: CoordsTuple,
    endCoords: CoordsTuple,
    layer,
  ) {
    let conditionsList = [];

    if (level === LevelType.Ground) {
      conditionsList = [foregroundLeftHouseConditions(startCoords), foregroundTreeTopConditions(layer)];
    } else if (level === LevelType.Stones) {
      conditionsList = [foregroundLeftTowerConditions(startCoords)];
    }

    if (nextLevel === LevelType.Ground) {
      conditionsList.push(foregroundRightHouseConditions(endCoords));
    } else if (nextLevel === LevelType.Stones) {
      conditionsList.push(foregroundRightTowerConditions(endCoords));
    }

    return new Layer(gridX, gridY).fill(conditionsList);
  }
}
