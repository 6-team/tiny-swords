import { TileName } from "../../renderer/renderer.const";

export const LAYER_ADDITIONAL_EMPTY_CONDITIONS = [
  {
    data: [{ tile: TileName.GROUND_MIDDLE_RIGHT, coords: null }],
    conditionFn: (tile) => tile === TileName.BRIDGE_LEFT,
    random: null,
  },
  {
    data: [{ tile: TileName.GROUND_MIDDLE_LEFT, coords: null }],
    conditionFn: (tile) => tile === TileName.BRIDGE_RIGHT,
    random: null,
  },
  {
    data: [{ tile: TileName.BRIDGE_SHADOW, coords: null }],
    conditionFn: (tile) => tile === TileName.BRIDGE_MIDDLE,
    random: null,
  },
  {
    data: [{ tile: TileName.GROUND_MIDDLE_MIDDLE, coords: null }],
    conditionFn: (tile) => tile === TileName.TREE_STRUMP,
    random: null,
  },
];

export const LAYER_ADDITIONAL_TREE_BOTTOM_CONDITIONS = [
  {
    data: [
      { tile: TileName.TREE_BOTTOM_LEFT, coords: ({ x, y }) => ({ x: x - 1, y }) },
      { tile: TileName.TREE_BOTTOM_MIDDLE, coords: null },
      { tile: TileName.TREE_BOTTOM_RIGHT, coords: ({ x, y }) => ({ x: x + 1, y }) },
    ],
    conditionFn: (tile) => tile === TileName.TREE_STRUMP,
    random: null,
  },
];