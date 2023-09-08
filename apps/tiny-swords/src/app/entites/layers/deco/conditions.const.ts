import { TileName } from "../../renderer/renderer.const";

export const LAYER_DECO_TILE_WEIGHT = [
  [TileName.DECO_MUSHROOM_S, 10],
  [TileName.DECO_MUSHROOM_M, 5],
  [TileName.DECO_MUSHROOM_L, 1],
  [TileName.DECO_STONE_S,    10],
  [TileName.DECO_STONE_M,    5],
  [TileName.DECO_STONE_L,    1],
  [TileName.DECO_BUSH_S,     10],
  [TileName.DECO_BUSH_M,     5],
  [TileName.DECO_BUSH_L,     1],
  [TileName.DECO_PUMPKIN_S,  5],
  [TileName.DECO_PUMPKIN_M,  1],
  [TileName.DECO_WEED_S,     10],
  [TileName.DECO_WEED_M,     5],
];

export const LAYER_DECO_CONDITIONS = [
  {
    data: [
      [TileName.ROCKS_S, 7],
      [TileName.ROCKS_M, 5],
      [TileName.ROCKS_L, 2],
    ],
    conditionFn: ({ x, y, options }) => {
      return options[0] === TileName.WATER_MIDDLE_MIDDLE && y > 0 && x > 0  && y < 12 && x < 19;
    },
    random: 8,
  },
  {
    data: LAYER_DECO_TILE_WEIGHT,
    conditionFn: ({ options }) => TileName.WATER_MIDDLE_MIDDLE < options[0] && options[0] < TileName.BRIDGE_LEFT,
    random: 30,
  },
];