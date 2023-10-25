import { LayerRules, TileWight } from "../../../layer/layer.types";
import { TileName } from "../../../renderer";

export const STONES_WEIGHT: TileWight[] = [
  [TileName.WATER_MIDDLE_MIDDLE,  1, true],

  [TileName.ELEVATION_TOP_LEFT,      1, false],
  [TileName.ELEVATION_TOP_MIDDLE,    10, false],
  [TileName.ELEVATION_TOP_RIGHT,     1, false],
  [TileName.ELEVATION_MIDDLE_LEFT,   10, false],
  [TileName.ELEVATION_MIDDLE_MIDDLE, 100, false],
  [TileName.ELEVATION_MIDDLE_RIGHT,  10, false],
  [TileName.ELEVATION_BOTTOM_LEFT,   1, false],
  [TileName.ELEVATION_BOTTOM_MIDDLE, 10, false],
  [TileName.ELEVATION_BOTTOM_RIGHT,  1, false],

  [TileName.BRIDGE_LEFT,          1, false],
  [TileName.BRIDGE_MIDDLE,        1, false],
  [TileName.BRIDGE_RIGHT,         1, false],
];

export const STONES_RULES: LayerRules = {
  [TileName.WATER_MIDDLE_MIDDLE]: [
    [
      TileName.WATER_MIDDLE_MIDDLE,
      TileName.ELEVATION_BOTTOM_LEFT,
      TileName.ELEVATION_BOTTOM_MIDDLE,
      TileName.ELEVATION_BOTTOM_RIGHT,
      TileName.BRIDGE_MIDDLE,
    ],
    [
      TileName.WATER_MIDDLE_MIDDLE,
      TileName.ELEVATION_TOP_LEFT,
      TileName.ELEVATION_MIDDLE_LEFT,
      TileName.ELEVATION_BOTTOM_LEFT,
    ],
    [
      TileName.WATER_MIDDLE_MIDDLE,
      TileName.ELEVATION_TOP_LEFT,
      TileName.ELEVATION_TOP_MIDDLE,
      TileName.ELEVATION_TOP_RIGHT,
      TileName.BRIDGE_MIDDLE,
    ],
    [
      TileName.WATER_MIDDLE_MIDDLE,
      TileName.ELEVATION_TOP_RIGHT,
      TileName.ELEVATION_MIDDLE_RIGHT,
      TileName.ELEVATION_BOTTOM_RIGHT,
    ],
  ],
  [TileName.ELEVATION_TOP_LEFT]: [
    [TileName.WATER_MIDDLE_MIDDLE],
    [
      TileName.ELEVATION_TOP_MIDDLE,
      TileName.ELEVATION_TOP_RIGHT,
      TileName.ELEVATION_MIDDLE_MIDDLE,
      TileName.ELEVATION_MIDDLE_RIGHT,
      TileName.ELEVATION_BOTTOM_MIDDLE,
      TileName.ELEVATION_BOTTOM_RIGHT,
    ],
    [
      TileName.ELEVATION_MIDDLE_LEFT,
      TileName.ELEVATION_MIDDLE_MIDDLE,
      TileName.ELEVATION_MIDDLE_RIGHT,
      TileName.ELEVATION_BOTTOM_LEFT,
      TileName.ELEVATION_BOTTOM_MIDDLE,
      TileName.ELEVATION_BOTTOM_RIGHT,
      TileName.BRIDGE_RIGHT,
    ],
    [TileName.WATER_MIDDLE_MIDDLE],
  ],
  [TileName.ELEVATION_TOP_MIDDLE]: [
    [TileName.WATER_MIDDLE_MIDDLE],
    [
      TileName.ELEVATION_TOP_MIDDLE,
      TileName.ELEVATION_TOP_RIGHT,
      TileName.ELEVATION_MIDDLE_MIDDLE,
      TileName.ELEVATION_MIDDLE_RIGHT,
      TileName.ELEVATION_BOTTOM_MIDDLE,
      TileName.ELEVATION_BOTTOM_RIGHT,
    ],
    [
      TileName.ELEVATION_MIDDLE_LEFT,
      TileName.ELEVATION_MIDDLE_MIDDLE,
      TileName.ELEVATION_MIDDLE_RIGHT,
      TileName.ELEVATION_BOTTOM_LEFT,
      TileName.ELEVATION_BOTTOM_MIDDLE,
      TileName.ELEVATION_BOTTOM_RIGHT,
    ],
    [
      TileName.ELEVATION_TOP_LEFT,
      TileName.ELEVATION_TOP_MIDDLE,
      TileName.ELEVATION_MIDDLE_LEFT,
      TileName.ELEVATION_MIDDLE_MIDDLE,
      TileName.ELEVATION_BOTTOM_LEFT,
      TileName.ELEVATION_BOTTOM_MIDDLE,
    ],
  ],
  [TileName.ELEVATION_TOP_RIGHT]: [
    [TileName.WATER_MIDDLE_MIDDLE],
    [TileName.WATER_MIDDLE_MIDDLE],
    [
      TileName.ELEVATION_MIDDLE_LEFT,
      TileName.ELEVATION_MIDDLE_MIDDLE,
      TileName.ELEVATION_MIDDLE_RIGHT,
      TileName.ELEVATION_BOTTOM_LEFT,
      TileName.ELEVATION_BOTTOM_MIDDLE,
      TileName.ELEVATION_BOTTOM_RIGHT,
    ],
    [
      TileName.ELEVATION_TOP_LEFT,
      TileName.ELEVATION_TOP_MIDDLE,
      TileName.ELEVATION_MIDDLE_LEFT,
      TileName.ELEVATION_MIDDLE_MIDDLE,
      TileName.ELEVATION_BOTTOM_LEFT,
      TileName.ELEVATION_BOTTOM_MIDDLE,
      TileName.BRIDGE_LEFT,
    ],
  ],
  [TileName.ELEVATION_MIDDLE_LEFT]: [
    [
      TileName.ELEVATION_TOP_LEFT,
      TileName.ELEVATION_TOP_MIDDLE,
      TileName.ELEVATION_TOP_RIGHT,
      TileName.ELEVATION_MIDDLE_LEFT,
      TileName.ELEVATION_MIDDLE_MIDDLE,
      TileName.ELEVATION_MIDDLE_RIGHT,
      TileName.BRIDGE_RIGHT,
    ],
    [
      TileName.ELEVATION_TOP_MIDDLE,
      TileName.ELEVATION_TOP_RIGHT,
      TileName.ELEVATION_MIDDLE_MIDDLE,
      TileName.ELEVATION_MIDDLE_RIGHT,
      TileName.ELEVATION_BOTTOM_MIDDLE,
      TileName.ELEVATION_BOTTOM_RIGHT,
      TileName.BRIDGE_LEFT,
    ],
    [
      TileName.ELEVATION_MIDDLE_LEFT,
      TileName.ELEVATION_MIDDLE_MIDDLE,
      TileName.ELEVATION_MIDDLE_RIGHT,
      TileName.ELEVATION_BOTTOM_LEFT,
      TileName.ELEVATION_BOTTOM_MIDDLE,
      TileName.ELEVATION_BOTTOM_RIGHT,
      TileName.BRIDGE_RIGHT,
    ],
    [TileName.WATER_MIDDLE_MIDDLE],
  ],
  [TileName.ELEVATION_MIDDLE_MIDDLE]: [
    [
      TileName.ELEVATION_TOP_LEFT,
      TileName.ELEVATION_TOP_MIDDLE,
      TileName.ELEVATION_TOP_RIGHT,
      TileName.ELEVATION_MIDDLE_LEFT,
      TileName.ELEVATION_MIDDLE_MIDDLE,
      TileName.ELEVATION_MIDDLE_RIGHT,
    ],
    [
      TileName.ELEVATION_TOP_MIDDLE,
      TileName.ELEVATION_TOP_RIGHT,
      TileName.ELEVATION_MIDDLE_MIDDLE,
      TileName.ELEVATION_MIDDLE_RIGHT,
      TileName.ELEVATION_BOTTOM_MIDDLE,
      TileName.ELEVATION_BOTTOM_RIGHT,
      TileName.BRIDGE_LEFT,
    ],
    [
      TileName.ELEVATION_MIDDLE_LEFT,
      TileName.ELEVATION_MIDDLE_MIDDLE,
      TileName.ELEVATION_MIDDLE_RIGHT,
      TileName.ELEVATION_BOTTOM_LEFT,
      TileName.ELEVATION_BOTTOM_MIDDLE,
      TileName.ELEVATION_BOTTOM_RIGHT,
    ],
    [
      TileName.ELEVATION_TOP_LEFT,
      TileName.ELEVATION_TOP_MIDDLE,
      TileName.ELEVATION_MIDDLE_LEFT,
      TileName.ELEVATION_MIDDLE_MIDDLE,
      TileName.ELEVATION_BOTTOM_LEFT,
      TileName.ELEVATION_BOTTOM_MIDDLE,
      TileName.BRIDGE_RIGHT,
    ],
  ],
  [TileName.ELEVATION_MIDDLE_RIGHT]: [
    [
      TileName.ELEVATION_TOP_LEFT,
      TileName.ELEVATION_TOP_MIDDLE,
      TileName.ELEVATION_TOP_RIGHT,
      TileName.ELEVATION_MIDDLE_LEFT,
      TileName.ELEVATION_MIDDLE_MIDDLE,
      TileName.ELEVATION_MIDDLE_RIGHT,
      TileName.BRIDGE_LEFT,
    ],
    [TileName.WATER_MIDDLE_MIDDLE],
    [
      TileName.ELEVATION_MIDDLE_LEFT,
      TileName.ELEVATION_MIDDLE_MIDDLE,
      TileName.ELEVATION_MIDDLE_RIGHT,
      TileName.ELEVATION_BOTTOM_LEFT,
      TileName.ELEVATION_BOTTOM_MIDDLE,
      TileName.ELEVATION_BOTTOM_RIGHT,
      TileName.BRIDGE_LEFT,
    ],
    [
      TileName.ELEVATION_TOP_LEFT,
      TileName.ELEVATION_TOP_MIDDLE,
      TileName.ELEVATION_MIDDLE_LEFT,
      TileName.ELEVATION_MIDDLE_MIDDLE,
      TileName.ELEVATION_BOTTOM_LEFT,
      TileName.ELEVATION_BOTTOM_MIDDLE,
      TileName.BRIDGE_RIGHT,
    ],
  ],
  [TileName.ELEVATION_BOTTOM_LEFT]: [
    [
      TileName.ELEVATION_TOP_LEFT,
      TileName.ELEVATION_TOP_MIDDLE,
      TileName.ELEVATION_TOP_RIGHT,
      TileName.ELEVATION_MIDDLE_LEFT,
      TileName.ELEVATION_MIDDLE_MIDDLE,
      TileName.ELEVATION_MIDDLE_RIGHT,
      TileName.BRIDGE_RIGHT,
    ],
    [
      TileName.ELEVATION_TOP_MIDDLE,
      TileName.ELEVATION_TOP_RIGHT,
      TileName.ELEVATION_MIDDLE_MIDDLE,
      TileName.ELEVATION_MIDDLE_RIGHT,
      TileName.ELEVATION_BOTTOM_MIDDLE,
      TileName.ELEVATION_BOTTOM_RIGHT,
    ],
    [TileName.WATER_MIDDLE_MIDDLE],
    [TileName.WATER_MIDDLE_MIDDLE],
  ],
  [TileName.ELEVATION_BOTTOM_MIDDLE]: [
    [
      TileName.ELEVATION_TOP_LEFT,
      TileName.ELEVATION_TOP_MIDDLE,
      TileName.ELEVATION_TOP_RIGHT,
      TileName.ELEVATION_MIDDLE_LEFT,
      TileName.ELEVATION_MIDDLE_MIDDLE,
      TileName.ELEVATION_MIDDLE_RIGHT,
    ],
    [
      TileName.ELEVATION_TOP_MIDDLE,
      TileName.ELEVATION_TOP_RIGHT,
      TileName.ELEVATION_MIDDLE_MIDDLE,
      TileName.ELEVATION_MIDDLE_RIGHT,
      TileName.ELEVATION_BOTTOM_MIDDLE,
      TileName.ELEVATION_BOTTOM_RIGHT,
    ],
    [TileName.WATER_MIDDLE_MIDDLE],
    [
      TileName.ELEVATION_TOP_LEFT,
      TileName.ELEVATION_TOP_MIDDLE,
      TileName.ELEVATION_MIDDLE_LEFT,
      TileName.ELEVATION_MIDDLE_MIDDLE,
      TileName.ELEVATION_BOTTOM_LEFT,
      TileName.ELEVATION_BOTTOM_MIDDLE,
    ],
  ],
  [TileName.ELEVATION_BOTTOM_RIGHT]: [
    [
      TileName.ELEVATION_TOP_LEFT,
      TileName.ELEVATION_TOP_MIDDLE,
      TileName.ELEVATION_TOP_RIGHT,
      TileName.ELEVATION_MIDDLE_LEFT,
      TileName.ELEVATION_MIDDLE_MIDDLE,
      TileName.ELEVATION_MIDDLE_RIGHT,
      TileName.BRIDGE_LEFT,
    ],
    [TileName.WATER_MIDDLE_MIDDLE],
    [TileName.WATER_MIDDLE_MIDDLE],
    [
      TileName.ELEVATION_TOP_LEFT,
      TileName.ELEVATION_TOP_MIDDLE,
      TileName.ELEVATION_MIDDLE_LEFT,
      TileName.ELEVATION_MIDDLE_MIDDLE,
      TileName.ELEVATION_BOTTOM_LEFT,
      TileName.ELEVATION_BOTTOM_MIDDLE,
    ],
  ],
  [TileName.BRIDGE_LEFT]: [
    [
      TileName.ELEVATION_TOP_RIGHT,
      TileName.ELEVATION_MIDDLE_RIGHT,
    ],
    [TileName.BRIDGE_MIDDLE],
    [
      TileName.ELEVATION_MIDDLE_RIGHT,
      TileName.ELEVATION_BOTTOM_RIGHT,
    ],
    [
      TileName.ELEVATION_MIDDLE_MIDDLE,
      TileName.ELEVATION_MIDDLE_LEFT,
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
      TileName.ELEVATION_TOP_LEFT,
      TileName.ELEVATION_MIDDLE_LEFT,
    ],
    [
      TileName.ELEVATION_MIDDLE_MIDDLE,
      TileName.ELEVATION_MIDDLE_RIGHT,
    ],
    [
      TileName.ELEVATION_MIDDLE_LEFT,
      TileName.ELEVATION_BOTTOM_LEFT,
    ],
    [
      TileName.BRIDGE_MIDDLE,
      TileName.BRIDGE_LEFT
    ],
  ],
};