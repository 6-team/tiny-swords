import { TileName } from "../../renderer/renderer.const";

export const LAYER_FOREGROUND_TREE_TOP_CONDITIONS = [
  {
    data: [
      // { tile: TileName.TREE_TOP_LEFT, coords: ({ x, y }) => ({ x: x - 1, y: y - 2 }) },
      { tile: TileName.TREE_TOP_MIDDLE, coords: ({ x, y }) => ({ x, y: y - 2 }) },
      // { tile: TileName.TREE_TOP_RIGHT, coords: ({ x, y }) => ({ x: x + 1, y: y - 2 }) },
      { tile: TileName.TREE_MIDDLE_LEFT, coords: ({ x, y }) => ({ x: x - 1, y: y - 1 }) },
      { tile: TileName.TREE_MIDDLE_MIDDLE, coords: ({ x, y }) => ({ x, y: y - 1 }) },
      { tile: TileName.TREE_MIDDLE_RIGHT, coords: ({ x, y }) => ({ x: x + 1, y: y - 1 }) },
    ],
    conditionFn: (tile) => tile === TileName.TREE_STRUMP,
    random: null,
  },
];