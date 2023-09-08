import { TileName } from "../renderer/renderer.const";

export const LEVEL_SURFACE_TILE_TYPES = [
  TileName.WATER_MIDDLE_MIDDLE,
  TileName.GROUND_TOP_LEFT,
  TileName.GROUND_TOP_MIDDLE,
  TileName.GROUND_TOP_RIGHT,
  TileName.GROUND_MIDDLE_LEFT,
  TileName.GROUND_MIDDLE_MIDDLE,
  TileName.GROUND_MIDDLE_RIGHT,
  TileName.GROUND_BOTTOM_LEFT,
  TileName.GROUND_BOTTOM_MIDDLE,
  TileName.GROUND_BOTTOM_RIGHT,
  TileName.BRIDGE_LEFT,
  TileName.BRIDGE_MIDDLE,
  TileName.BRIDGE_RIGHT,
];

export const LEVEL_SURFACE_TILE_WEIGHT = [
  [TileName.WATER_MIDDLE_MIDDLE,  1],
  [TileName.GROUND_TOP_LEFT,      10],
  [TileName.GROUND_TOP_MIDDLE,    10],
  [TileName.GROUND_TOP_RIGHT,     10],
  [TileName.GROUND_MIDDLE_LEFT,   10],
  [TileName.GROUND_MIDDLE_MIDDLE, 100],
  [TileName.GROUND_MIDDLE_RIGHT,  10],
  [TileName.GROUND_BOTTOM_LEFT,   10],
  [TileName.GROUND_BOTTOM_MIDDLE, 10],
  [TileName.GROUND_BOTTOM_RIGHT,  10],
  [TileName.BRIDGE_LEFT,          20],
  [TileName.BRIDGE_MIDDLE,        20],
  [TileName.BRIDGE_RIGHT,         20],
];

export const LEVEL_TILE_DECO_WEIGHT = [
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
  [TileName.TREE_STRUMP,     2],
];

export const LEVEL_SURFACE_TILE_RULES = {
  [TileName.WATER_MIDDLE_MIDDLE]: [
    [
      TileName.WATER_MIDDLE_MIDDLE,
      TileName.GROUND_BOTTOM_LEFT,
      TileName.GROUND_BOTTOM_MIDDLE,
      TileName.GROUND_BOTTOM_RIGHT,
      TileName.BRIDGE_MIDDLE,
    ],
    [
      TileName.WATER_MIDDLE_MIDDLE,
      TileName.GROUND_TOP_LEFT,
      TileName.GROUND_MIDDLE_LEFT,
      TileName.GROUND_BOTTOM_LEFT,
    ],
    [
      TileName.WATER_MIDDLE_MIDDLE,
      TileName.GROUND_TOP_LEFT,
      TileName.GROUND_TOP_MIDDLE,
      TileName.GROUND_TOP_RIGHT,
      TileName.BRIDGE_MIDDLE,
    ],
    [
      TileName.WATER_MIDDLE_MIDDLE,
      TileName.GROUND_TOP_RIGHT,
      TileName.GROUND_MIDDLE_RIGHT,
      TileName.GROUND_BOTTOM_RIGHT,
    ],
  ],
  [TileName.GROUND_TOP_LEFT]: [
    [TileName.WATER_MIDDLE_MIDDLE],
    [
      TileName.GROUND_TOP_MIDDLE,
      TileName.GROUND_TOP_RIGHT,
      TileName.GROUND_MIDDLE_MIDDLE,
      TileName.GROUND_MIDDLE_RIGHT,
      TileName.GROUND_BOTTOM_MIDDLE,
      TileName.GROUND_BOTTOM_RIGHT,
    ],
    [
      TileName.GROUND_MIDDLE_LEFT,
      TileName.GROUND_MIDDLE_MIDDLE,
      TileName.GROUND_MIDDLE_RIGHT,
      TileName.GROUND_BOTTOM_LEFT,
      TileName.GROUND_BOTTOM_MIDDLE,
      TileName.GROUND_BOTTOM_RIGHT,
      TileName.BRIDGE_RIGHT,
    ],
    [TileName.WATER_MIDDLE_MIDDLE],
  ],
  [TileName.GROUND_TOP_MIDDLE]: [
    [TileName.WATER_MIDDLE_MIDDLE],
    [
      TileName.GROUND_TOP_MIDDLE,
      TileName.GROUND_TOP_RIGHT,
      TileName.GROUND_MIDDLE_MIDDLE,
      TileName.GROUND_MIDDLE_RIGHT,
      TileName.GROUND_BOTTOM_MIDDLE,
      TileName.GROUND_BOTTOM_RIGHT,
    ],
    [
      TileName.GROUND_MIDDLE_LEFT,
      TileName.GROUND_MIDDLE_MIDDLE,
      TileName.GROUND_MIDDLE_RIGHT,
      TileName.GROUND_BOTTOM_LEFT,
      TileName.GROUND_BOTTOM_MIDDLE,
      TileName.GROUND_BOTTOM_RIGHT,
    ],
    [
      TileName.GROUND_TOP_LEFT,
      TileName.GROUND_TOP_MIDDLE,
      TileName.GROUND_MIDDLE_LEFT,
      TileName.GROUND_MIDDLE_MIDDLE,
      TileName.GROUND_BOTTOM_LEFT,
      TileName.GROUND_BOTTOM_MIDDLE,
    ],
  ],
  [TileName.GROUND_TOP_RIGHT]: [
    [TileName.WATER_MIDDLE_MIDDLE],
    [TileName.WATER_MIDDLE_MIDDLE],
    [
      TileName.GROUND_MIDDLE_LEFT,
      TileName.GROUND_MIDDLE_MIDDLE,
      TileName.GROUND_MIDDLE_RIGHT,
      TileName.GROUND_BOTTOM_LEFT,
      TileName.GROUND_BOTTOM_MIDDLE,
      TileName.GROUND_BOTTOM_RIGHT,
    ],
    [
      TileName.GROUND_TOP_LEFT,
      TileName.GROUND_TOP_MIDDLE,
      TileName.GROUND_MIDDLE_LEFT,
      TileName.GROUND_MIDDLE_MIDDLE,
      TileName.GROUND_BOTTOM_LEFT,
      TileName.GROUND_BOTTOM_MIDDLE,
      TileName.BRIDGE_LEFT,
    ],
  ],
  [TileName.GROUND_MIDDLE_LEFT]: [
    [
      TileName.GROUND_TOP_LEFT,
      TileName.GROUND_TOP_MIDDLE,
      TileName.GROUND_TOP_RIGHT,
      TileName.GROUND_MIDDLE_LEFT,
      TileName.GROUND_MIDDLE_MIDDLE,
      TileName.GROUND_MIDDLE_RIGHT,
      TileName.BRIDGE_RIGHT,
    ],
    [
      TileName.GROUND_TOP_MIDDLE,
      TileName.GROUND_TOP_RIGHT,
      TileName.GROUND_MIDDLE_MIDDLE,
      TileName.GROUND_MIDDLE_RIGHT,
      TileName.GROUND_BOTTOM_MIDDLE,
      TileName.GROUND_BOTTOM_RIGHT,
      TileName.BRIDGE_LEFT,
    ],
    [
      TileName.GROUND_MIDDLE_LEFT,
      TileName.GROUND_MIDDLE_MIDDLE,
      TileName.GROUND_MIDDLE_RIGHT,
      TileName.GROUND_BOTTOM_LEFT,
      TileName.GROUND_BOTTOM_MIDDLE,
      TileName.GROUND_BOTTOM_RIGHT,
      TileName.BRIDGE_RIGHT,
    ],
    [TileName.WATER_MIDDLE_MIDDLE],
  ],
  [TileName.GROUND_MIDDLE_MIDDLE]: [
    [
      TileName.GROUND_TOP_LEFT,
      TileName.GROUND_TOP_MIDDLE,
      TileName.GROUND_TOP_RIGHT,
      TileName.GROUND_MIDDLE_LEFT,
      TileName.GROUND_MIDDLE_MIDDLE,
      TileName.GROUND_MIDDLE_RIGHT,
    ],
    [
      TileName.GROUND_TOP_MIDDLE,
      TileName.GROUND_TOP_RIGHT,
      TileName.GROUND_MIDDLE_MIDDLE,
      TileName.GROUND_MIDDLE_RIGHT,
      TileName.GROUND_BOTTOM_MIDDLE,
      TileName.GROUND_BOTTOM_RIGHT,
      TileName.BRIDGE_LEFT,
    ],
    [
      TileName.GROUND_MIDDLE_LEFT,
      TileName.GROUND_MIDDLE_MIDDLE,
      TileName.GROUND_MIDDLE_RIGHT,
      TileName.GROUND_BOTTOM_LEFT,
      TileName.GROUND_BOTTOM_MIDDLE,
      TileName.GROUND_BOTTOM_RIGHT,
    ],
    [
      TileName.GROUND_TOP_LEFT,
      TileName.GROUND_TOP_MIDDLE,
      TileName.GROUND_MIDDLE_LEFT,
      TileName.GROUND_MIDDLE_MIDDLE,
      TileName.GROUND_BOTTOM_LEFT,
      TileName.GROUND_BOTTOM_MIDDLE,
      TileName.BRIDGE_RIGHT,
    ],
  ],
  [TileName.GROUND_MIDDLE_RIGHT]: [
    [
      TileName.GROUND_TOP_LEFT,
      TileName.GROUND_TOP_MIDDLE,
      TileName.GROUND_TOP_RIGHT,
      TileName.GROUND_MIDDLE_LEFT,
      TileName.GROUND_MIDDLE_MIDDLE,
      TileName.GROUND_MIDDLE_RIGHT,
      TileName.BRIDGE_LEFT,
    ],
    [TileName.WATER_MIDDLE_MIDDLE],
    [
      TileName.GROUND_MIDDLE_LEFT,
      TileName.GROUND_MIDDLE_MIDDLE,
      TileName.GROUND_MIDDLE_RIGHT,
      TileName.GROUND_BOTTOM_LEFT,
      TileName.GROUND_BOTTOM_MIDDLE,
      TileName.GROUND_BOTTOM_RIGHT,
      TileName.BRIDGE_LEFT,
    ],
    [
      TileName.GROUND_TOP_LEFT,
      TileName.GROUND_TOP_MIDDLE,
      TileName.GROUND_MIDDLE_LEFT,
      TileName.GROUND_MIDDLE_MIDDLE,
      TileName.GROUND_BOTTOM_LEFT,
      TileName.GROUND_BOTTOM_MIDDLE,
      TileName.BRIDGE_RIGHT,
    ],
  ],
  [TileName.GROUND_BOTTOM_LEFT]: [
    [
      TileName.GROUND_TOP_LEFT,
      TileName.GROUND_TOP_MIDDLE,
      TileName.GROUND_TOP_RIGHT,
      TileName.GROUND_MIDDLE_LEFT,
      TileName.GROUND_MIDDLE_MIDDLE,
      TileName.GROUND_MIDDLE_RIGHT,
      TileName.BRIDGE_RIGHT,
    ],
    [
      TileName.GROUND_TOP_MIDDLE,
      TileName.GROUND_TOP_RIGHT,
      TileName.GROUND_MIDDLE_MIDDLE,
      TileName.GROUND_MIDDLE_RIGHT,
      TileName.GROUND_BOTTOM_MIDDLE,
      TileName.GROUND_BOTTOM_RIGHT,
    ],
    [TileName.WATER_MIDDLE_MIDDLE],
    [TileName.WATER_MIDDLE_MIDDLE],
  ],
  [TileName.GROUND_BOTTOM_MIDDLE]: [
    [
      TileName.GROUND_TOP_LEFT,
      TileName.GROUND_TOP_MIDDLE,
      TileName.GROUND_TOP_RIGHT,
      TileName.GROUND_MIDDLE_LEFT,
      TileName.GROUND_MIDDLE_MIDDLE,
      TileName.GROUND_MIDDLE_RIGHT,
    ],
    [
      TileName.GROUND_TOP_MIDDLE,
      TileName.GROUND_TOP_RIGHT,
      TileName.GROUND_MIDDLE_MIDDLE,
      TileName.GROUND_MIDDLE_RIGHT,
      TileName.GROUND_BOTTOM_MIDDLE,
      TileName.GROUND_BOTTOM_RIGHT,
    ],
    [TileName.WATER_MIDDLE_MIDDLE],
    [
      TileName.GROUND_TOP_LEFT,
      TileName.GROUND_TOP_MIDDLE,
      TileName.GROUND_MIDDLE_LEFT,
      TileName.GROUND_MIDDLE_MIDDLE,
      TileName.GROUND_BOTTOM_LEFT,
      TileName.GROUND_BOTTOM_MIDDLE,
    ],
  ],
  [TileName.GROUND_BOTTOM_RIGHT]: [
    [
      TileName.GROUND_TOP_LEFT,
      TileName.GROUND_TOP_MIDDLE,
      TileName.GROUND_TOP_RIGHT,
      TileName.GROUND_MIDDLE_LEFT,
      TileName.GROUND_MIDDLE_MIDDLE,
      TileName.GROUND_MIDDLE_RIGHT,
      TileName.BRIDGE_LEFT,
    ],
    [TileName.WATER_MIDDLE_MIDDLE],
    [TileName.WATER_MIDDLE_MIDDLE],
    [
      TileName.GROUND_TOP_LEFT,
      TileName.GROUND_TOP_MIDDLE,
      TileName.GROUND_MIDDLE_LEFT,
      TileName.GROUND_MIDDLE_MIDDLE,
      TileName.GROUND_BOTTOM_LEFT,
      TileName.GROUND_BOTTOM_MIDDLE,
    ],
  ],
  [TileName.BRIDGE_LEFT]: [
    [
      TileName.GROUND_TOP_RIGHT,
      TileName.GROUND_MIDDLE_RIGHT,
    ],
    [TileName.BRIDGE_MIDDLE],
    [
      TileName.GROUND_MIDDLE_RIGHT,
      TileName.GROUND_BOTTOM_RIGHT,
    ],
    [
      TileName.GROUND_MIDDLE_MIDDLE,
      TileName.GROUND_MIDDLE_LEFT,
    ],
  ],
  [TileName.BRIDGE_MIDDLE]: [
    [TileName.WATER_MIDDLE_MIDDLE],
    [TileName.BRIDGE_MIDDLE, TileName.BRIDGE_RIGHT],
    [TileName.WATER_MIDDLE_MIDDLE],
    [TileName.BRIDGE_MIDDLE, TileName.BRIDGE_LEFT],
  ],
  [TileName.BRIDGE_RIGHT]: [
    [
      TileName.GROUND_TOP_LEFT,
      TileName.GROUND_MIDDLE_LEFT,
    ],
    [
      TileName.GROUND_MIDDLE_MIDDLE,
      TileName.GROUND_MIDDLE_RIGHT,
    ],
    [
      TileName.GROUND_MIDDLE_LEFT,
      TileName.GROUND_BOTTOM_LEFT,
    ],
    [
      TileName.BRIDGE_MIDDLE,
      TileName.BRIDGE_LEFT
    ],
  ]
};

export const LEVEL_TEMPLATE_BRIDGE_CENTER = [{
  tile: TileName.BRIDGE_MIDDLE,
  conditionFn: ({ x, y }) => {
    return x === 10 && y === 6;
  },
}];

export const LEVEL_TEMPLATE_GROUND_PLAYER = [{
  tile: TileName.GROUND_MIDDLE_LEFT,
  conditionFn: ({ x, y }) => {
    return x === 2 && y === 4;
  }
}];

export const LEVEL_TEMPLATE_WATER_BORDER_2 = [
  {
    tile: TileName.WATER_MIDDLE_MIDDLE,
    conditionFn: ({ x, y }) => {
      return x < 2 || x > 17 || y < 2 || y > 10;
    } 
  }
];

export const LEVEL_TEMPLATE_WATER_BORDER_3 = [
  {
    tile: TileName.WATER_MIDDLE_MIDDLE,
    conditionFn: ({ x, y }) => {
      return x < 3 || x > 16 || y < 3 || y > 9;
    } 
  }
];

export const LEVEL_ADD_TILE_BRIDGE = [
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
  }
];

export const LEVEL_ADD_TILE_TREE = [
  {
    data: [
      { tile: TileName.TREE_TOP_LEFT, coords: ({ x, y }) => ({ x: x - 1, y: y - 2 }) },
      { tile: TileName.TREE_TOP_MIDDLE, coords: ({ x, y }) => ({ x, y: y - 2 }) },
      { tile: TileName.TREE_TOP_RIGHT, coords: ({ x, y }) => ({ x: x + 1, y: y - 2 }) },
      { tile: TileName.TREE_MIDDLE_LEFT, coords: ({ x, y }) => ({ x: x - 1, y: y - 1 }) },
      { tile: TileName.TREE_MIDDLE_MIDDLE, coords: ({ x, y }) => ({ x, y: y - 1 }) },
      { tile: TileName.TREE_MIDDLE_RIGHT, coords: ({ x, y }) => ({ x: x + 1, y: y - 1 }) },
      { tile: TileName.TREE_BOTTOM_LEFT, coords: ({ x, y }) => ({ x: x - 1, y }) },
      { tile: TileName.TREE_BOTTOM_MIDDLE, coords: null },
      { tile: TileName.TREE_BOTTOM_RIGHT, coords: ({ x, y }) => ({ x: x + 1, y }) },
    ],
    conditionFn: (tile) => tile === TileName.TREE_STRUMP,
    random: null,
  },
];

export const LEVEL_DECO_CONDITION = [
  {
    data: [
      [TileName.ROCKS_S, 7],
      [TileName.ROCKS_M, 5],
      [TileName.ROCKS_L, 2],
    ],
    conditionFn: ({ x, y, options }) => {
      return options[0] === 54 && y > 0 && x > 0  && y < 12 && x < 19;
    },
    random: 8,
  },
  {
    data: LEVEL_TILE_DECO_WEIGHT,
    conditionFn: ({ options }) => options[0] < 54,
    random: 30,
  },
];