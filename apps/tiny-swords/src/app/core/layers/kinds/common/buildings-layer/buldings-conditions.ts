import { LayerCondition } from "../../../../layer/layer.types";
import { TileName } from "../../../../renderer";

/**
 * Шаблон для дорисовки левого здания
 */
export const leftHouseConditions = (enter: [number, number]): LayerCondition[] => {
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
export const rightHouseConditions = (exit: [number, number]): LayerCondition[] => {
  return [
    { tile: TileName.HOUSE_BOTTOM_LEFT, coords: [exit[0], exit[1] - 1], boundary: true },
    { tile: TileName.HOUSE_BOTTOM_RIGHT, coords: [exit[0] + 1, exit[1] - 1], boundary: true },
    { tile: TileName.HOUSE_MIDDLE_LEFT, coords: [exit[0], exit[1] - 2], boundary: true },
    { tile: TileName.HOUSE_MIDDLE_RIGHT, coords: [exit[0] + 1, exit[1] - 2 ], boundary: true },
  ];
}

/**
 * Шаблон для дорисовки нижней части дерева
 */
export const treeBottomConditions = (layer): LayerCondition[] => {
  let conditions = [];

  layer.array.forEach(({ coords, options }) => {
    if (options[0] === TileName.TREE_STRUMP) {
      conditions = [
        ...conditions,
        ...[
          { tile: TileName.TREE_BOTTOM_LEFT, coords: [coords[0] - 1, coords[1]] },
          { tile: TileName.TREE_BOTTOM_MIDDLE, coords },
          { tile: TileName.TREE_BOTTOM_RIGHT, coords: [coords[0] + 1, coords[1]] }
        ]
      ];
    }
  });

  return conditions;
}

/**
 * Шаблон для дорисовки здания
 */
export const goldMineConditions = (exit: [number, number]): LayerCondition[] => {
  return [
    { tile: TileName.GOLDMINE_BOTTOM_LEFT, coords: [exit[0] - 1, exit[1] - 1], boundary: true },
    { tile: TileName.GOLDMINE_BOTTOM_MIDDLE, coords: [exit[0], exit[1] - 1], boundary: true },
    { tile: TileName.GOLDMINE_BOTTOM_RIGHT, coords: [exit[0] + 1, exit[1] - 1], boundary: true },
    { tile: TileName.GOLDMINE_TOP_LEFT, coords: [exit[0] - 1, exit[1] - 2], boundary: true },
    { tile: TileName.GOLDMINE_TOP_MIDDLE, coords: [exit[0], exit[1] - 2], boundary: true },
    { tile: TileName.GOLDMINE_TOP_RIGHT, coords: [exit[0] + 1, exit[1] - 2 ], boundary: true },
  ];
}