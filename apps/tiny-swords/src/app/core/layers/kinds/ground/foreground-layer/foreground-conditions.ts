import { LayerCondition } from "../../../../layer/layer.types";
import { TileName } from "../../../../renderer";

/**
 * Шаблон для верхней части левого дома
 */
export const foregroundLeftHouseConditions = (enter: [number, number]): LayerCondition[] => {
  return [
    // правый дом
    { tile: TileName.HOUSE_TOP_LEFT, coords: [enter[0] - 1, enter[1] - 3] },
    { tile: TileName.HOUSE_TOP_RIGHT, coords: [enter[0], enter[1] - 3] },
  ];
}

/**
 * Шаблон для верхней части правого дома
 */
export const foregroundRightHouseConditions = (exit: [number, number]): LayerCondition[] => {
  return [
    // правый дом
    { tile: TileName.HOUSE_TOP_LEFT, coords: [exit[0], exit[1] - 3] },
    { tile: TileName.HOUSE_TOP_RIGHT, coords: [exit[0] + 1, exit[1] - 3] },
  ];
}

/**
 * Шаблон для верхней части дерева
 */
export const foregroundTreeTopConditions = (layer): LayerCondition[] => {
  let conditions = [];

  layer.array.forEach(({ coords, options }) => {
    if (options[0] === TileName.TREE_STRUMP) {
      conditions = [
        ...conditions,
        ...[
          { tile: TileName.TREE_TOP_MIDDLE, coords: [coords[0], coords[1] - 2] },
          { tile: TileName.TREE_MIDDLE_LEFT, coords: [coords[0] - 1, coords[1] - 1] },
          { tile: TileName.TREE_MIDDLE_MIDDLE, coords: [coords[0], coords[1] - 1] },
          { tile: TileName.TREE_MIDDLE_RIGHT, coords: [coords[0] + 1, coords[1] - 1] },
        ]
      ];
    }
  });

  return conditions;
}