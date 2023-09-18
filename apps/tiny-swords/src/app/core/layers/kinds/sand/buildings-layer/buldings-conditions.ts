import { LayerCondition } from "../../../../layer/layer.types";
import { TileName } from "../../../../renderer";

/**
 * Шаблон для дорисовки левого здания
 */
export const leftGoldMineConditions = (enter: [number, number]): LayerCondition[] => {
  return [
    { tile: TileName.HOUSE_BOTTOM_LEFT, coords: [enter[0] - 1, enter[1] - 1], boundary: true },
    { tile: TileName.HOUSE_BOTTOM_RIGHT, coords: [enter[0], enter[1] - 1], boundary: true },
    { tile: TileName.HOUSE_MIDDLE_LEFT, coords: [enter[0] - 1, enter[1] - 2], boundary: true },
    { tile: TileName.HOUSE_MIDDLE_RIGHT, coords: [enter[0], enter[1] - 2 ], boundary: true },
  ];
}

/**
 * Шаблон для дорисовки левого здания
 */
export const rightGoldMineConditions = (exit: [number, number]): LayerCondition[] => {
  return [
    { tile: TileName.GOLDMINE_BOTTOM_LEFT, coords: [exit[0] - 1, exit[1] - 1], boundary: true },
    { tile: TileName.GOLDMINE_BOTTOM_MIDDLE, coords: [exit[0], exit[1] - 1], boundary: true },
    { tile: TileName.GOLDMINE_BOTTOM_RIGHT, coords: [exit[0] + 1, exit[1] - 1], boundary: true },
    { tile: TileName.GOLDMINE_TOP_LEFT, coords: [exit[0] - 1, exit[1] - 2], boundary: true },
    { tile: TileName.GOLDMINE_TOP_MIDDLE, coords: [exit[0], exit[1] - 2], boundary: true },
    { tile: TileName.GOLDMINE_TOP_RIGHT, coords: [exit[0] + 1, exit[1] - 2 ], boundary: true },
  ];
}