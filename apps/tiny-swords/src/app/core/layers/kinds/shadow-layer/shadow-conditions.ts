import { LayerCondition } from "../../../layer/layer.types";
import { LevelType } from "../../../level/level.types";
import { TileName } from "../../../renderer";

const getGroundConditions = (tile, coords) => {
  switch(tile) {
    // тень под мостом
    case TileName.BRIDGE_MIDDLE:
      return [{ tile: TileName.BRIDGE_SHADOW, coords }];

    // трава под основаниями моста
    case TileName.BRIDGE_LEFT:
      return [{ tile: TileName.GROUND_MIDDLE_RIGHT, coords }];
    case TileName.BRIDGE_RIGHT:
      return [{ tile: TileName.GROUND_MIDDLE_LEFT, coords }];
    case TileName.TREE_STRUMP:
      return [{ tile: TileName.GROUND_MIDDLE_MIDDLE, coords }];

    default:
      return [];
  }
}

const getSandConditions = (tile, coords) => {
  switch(tile) {
    // тень под мостом
    case TileName.BRIDGE_MIDDLE:
      return [{ tile: TileName.BRIDGE_SHADOW, coords }];

    // песок под основаниями моста
    case TileName.BRIDGE_LEFT:
      return [{ tile: TileName.SAND_MIDDLE_RIGHT, coords }];
    case TileName.BRIDGE_RIGHT:
      return [{ tile: TileName.SAND_MIDDLE_LEFT, coords }];

    default:
      return [];
  }
}

const getStonesConditions = (tile, coords) => {
  switch(tile) {
    // песок под основаниями моста
    case TileName.BRIDGE_LEFT:
      return [{ tile: TileName.ELEVATION_MIDDLE_RIGHT, coords }];
    case TileName.BRIDGE_RIGHT:
      return [{ tile: TileName.ELEVATION_MIDDLE_LEFT, coords }];

    default:
      return [];
  }
}

/**
 * Шаблон для дополнительных слоев:
 * - тень под мостами
 * - трава или песок по мостами
 * - пена
 */
export const shadowConditions = (level: LevelType, layer): LayerCondition[] => {
  let conditions = [];
  let getConditions;
  
  switch(level) {
    case LevelType.Ground:
      getConditions = getGroundConditions;
      break;
    case LevelType.Sand:
      getConditions = getSandConditions;
      break;
    case LevelType.Stones:
      getConditions = getStonesConditions;
      break;
  }

  layer.array.forEach(({ coords, options }) => {
    const conditionsCell = getConditions(options[0], coords);

    if (conditionsCell.length) {
      conditions = [
        ...conditions,
        ...conditionsCell,
      ];
    }
  });

  return conditions;
}
