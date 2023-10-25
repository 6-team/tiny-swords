import { LayerCondition } from "../../../layer/layer.types";
import { TileName } from "../../../renderer";

/**
 * Template for the upper part of the left house.
 * 
 * @param {Array<number>} enter - The entrance coordinates [x, y].
 * @returns {Array<LayerCondition>} An array of conditions for the upper part of the left house.
 */
export const foregroundLeftHouseConditions = (enter: [number, number]): LayerCondition[] => {
  return [
    { tile: TileName.HOUSE_TOP_LEFT, coords: [enter[0] - 1, enter[1] - 3] },
    { tile: TileName.HOUSE_TOP_RIGHT, coords: [enter[0], enter[1] - 3] },
  ];
}

/**
 * Template for the upper part of the right house.
 * 
 * @param {Array<number>} exit - The exit coordinates [x, y].
 * @returns {Array<LayerCondition>} An array of conditions for the upper part of the right house.
 */
export const foregroundRightHouseConditions = (exit: [number, number]): LayerCondition[] => {
  return [
    { tile: TileName.HOUSE_TOP_LEFT, coords: [exit[0], exit[1] - 3] },
    { tile: TileName.HOUSE_TOP_RIGHT, coords: [exit[0] + 1, exit[1] - 3] },
  ];
}

/**
 * Template for the upper part of a tree.
 * 
 * @param {Layer} layer - The base layer to apply conditions to.
 * @returns {Array<LayerCondition>} An array of conditions for the upper part of a tree.
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

/**
 * Template for the upper part of the left tower.
 * 
 * @param {Array<number>} enter - The entrance coordinates [x, y].
 * @returns {Array<LayerCondition>} An array of conditions for the upper part of the left tower.
 */
export const foregroundLeftTowerConditions = (enter: [number, number]): LayerCondition[] => {
  return [
    { tile: TileName.TOWER_TOP_LEFT, coords: [enter[0] - 1, enter[1] - 3] },
    { tile: TileName.TOWER_TOP_RIGHT, coords: [enter[0], enter[1] - 3] },
  ];
}

/**
 * Template for the upper part of the right tower.
 * 
 * @param {Array<number>} exit - The exit coordinates [x, y].
 * @returns {Array<LayerCondition>} An array of conditions for the upper part of the right tower.
 */
export const foregroundRightTowerConditions = (exit: [number, number]): LayerCondition[] => {
  return [
    { tile: TileName.TOWER_TOP_LEFT, coords: [exit[0], exit[1] - 3] },
    { tile: TileName.TOWER_TOP_RIGHT, coords: [exit[0] + 1, exit[1] - 3] },
  ];
}