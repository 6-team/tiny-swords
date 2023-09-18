import { LayerCondition } from "../../../../layer/layer.types";
import { TileName } from "../../../../renderer";

/**
 * Шаблон для дополнительных слоев травы:
 * - тень под мостами
 * - трава по мостами
 * - трава под домом
 */
export const shadowGroundConditions = (layer): LayerCondition[] => {
  const conditions = [];

  const getCondition = (tile, coords) => {
    switch(tile) {
      case TileName.BRIDGE_MIDDLE:
        return { tile: TileName.BRIDGE_SHADOW, coords };
      case TileName.BRIDGE_LEFT:
        return { tile: TileName.GROUND_MIDDLE_RIGHT, coords };
      case TileName.BRIDGE_RIGHT:
        return { tile: TileName.GROUND_MIDDLE_LEFT, coords };
      case TileName.TREE_STRUMP:
        return { tile: TileName.GROUND_MIDDLE_MIDDLE, coords };
      case TileName.HOUSE_BOTTOM_LEFT:
        return { tile: TileName.GROUND_MIDDLE_LEFT, coords };
      case TileName.HOUSE_BOTTOM_RIGHT:
        return { tile: TileName.GROUND_MIDDLE_RIGHT, coords };
      case TileName.HOUSE_MIDDLE_LEFT:
        return { tile: TileName.GROUND_TOP_LEFT, coords };
      case TileName.HOUSE_MIDDLE_RIGHT:
        return { tile: TileName.GROUND_TOP_RIGHT, coords };
      default:
        return null;
    }
  }

  layer.array.forEach(({ coords, options }) => {
    const condition = getCondition(options[0], coords);

    if (condition) {
      conditions.push({
        ...condition,
      });
    }
  });

  return conditions;
}

/**
 * Шаблон для дополнительных слоев песка:
 * - тень под мостами
 * - трава по мостами
 * - трава под домом
 */
export const shadowSandConditions = (layer): LayerCondition[] => {
  const conditions = [];

  const getCondition = (tile, coords) => {
    switch(tile) {
      case TileName.BRIDGE_MIDDLE:
        return { tile: TileName.BRIDGE_SHADOW, coords };
      case TileName.BRIDGE_LEFT:
        return { tile: TileName.SAND_MIDDLE_RIGHT, coords };
      case TileName.BRIDGE_RIGHT:
        return { tile: TileName.SAND_MIDDLE_LEFT, coords };
      case TileName.HOUSE_BOTTOM_LEFT:
        return { tile: TileName.SAND_MIDDLE_LEFT, coords };
      case TileName.HOUSE_BOTTOM_RIGHT:
        return { tile: TileName.SAND_MIDDLE_RIGHT, coords };
      case TileName.HOUSE_MIDDLE_LEFT:
        return { tile: TileName.SAND_TOP_LEFT, coords };
      case TileName.HOUSE_MIDDLE_RIGHT:
        return { tile: TileName.SAND_TOP_RIGHT, coords };
      default:
        return null;
    }
  }

  layer.array.forEach(({ coords, options }) => {
    const condition = getCondition(options[0], coords);

    if (condition) {
      conditions.push({
        ...condition,
      });
    }
  });

  return conditions;
}
