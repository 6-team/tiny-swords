import { LayerCondition } from "@core/layer";
import { TileName } from "@core/renderer";

/**
 * Generates an array of layer conditions for placing the left house based on the given entrance coordinates.
 *
 * @param {[number, number]} enter - The entrance coordinates for the left house.
 * @returns {LayerCondition[]} - An array of layer conditions for the left house placement.
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
 * Generates an array of layer conditions for placing the right house based on the given exit coordinates.
 *
 * @param {[number, number]} exit - The exit coordinates for the right house.
 * @returns {LayerCondition[]} - An array of layer conditions for the right house placement.
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
 * Generates an array of layer conditions for placing the bottom part of trees based on the provided layer.
 *
 * @param {object} layer - The layer used to determine tree bottom conditions.
 * @returns {LayerCondition[]} - An array of layer conditions for tree bottom placement.
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
 * This function defines conditions for tiles around a gold mine exit.
 * 
 * @param exit - An array representing the coordinates of the exit [x, y].
 * @returns An array of LayerCondition objects.
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

/**
 * This function defines conditions for tiles around a left tower.
 * 
 * @param enter - An array representing the coordinates of the tower's entrance [x, y].
 * @returns An array of LayerCondition objects.
 */
export const leftTowerConditions = (enter: [number, number]): LayerCondition[] => {
  return [
    { tile: TileName.TOWER_BOTTOM_LEFT, coords: [enter[0] - 1, enter[1] - 1], boundary: true },
    { tile: TileName.TOWER_BOTTOM_RIGHT, coords: [enter[0], enter[1] - 1], boundary: true },
    { tile: TileName.TOWER_MIDDLE_LEFT, coords: [enter[0] - 1, enter[1] - 2], boundary: true },
    { tile: TileName.TOWER_MIDDLE_RIGHT, coords: [enter[0], enter[1] - 2 ], boundary: true },
  ];
}

/**
 * This function defines conditions for tiles around a right tower.
 * 
 * @param exit - An array representing the coordinates of the tower's exit [x, y].
 * @returns An array of LayerCondition objects.
 */
export const rightTowerConditions = (exit: [number, number]): LayerCondition[] => {
  return [
    { tile: TileName.TOWER_BOTTOM_LEFT, coords: [exit[0], exit[1] - 1], boundary: true },
    { tile: TileName.TOWER_BOTTOM_RIGHT, coords: [exit[0] + 1, exit[1] - 1], boundary: true },
    { tile: TileName.TOWER_MIDDLE_LEFT, coords: [exit[0], exit[1] - 2], boundary: true },
    { tile: TileName.TOWER_MIDDLE_RIGHT, coords: [exit[0] + 1, exit[1] - 2 ], boundary: true },
  ];
}