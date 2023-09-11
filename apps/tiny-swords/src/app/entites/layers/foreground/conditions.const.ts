import { TileName } from "../../renderer/renderer.const";

export const LAYER_FOREGROUND_TREE_TOP_CONDITIONS = {
  create: ({ grid }) => {
    let conditions = [];

    grid.array.forEach(({ coords, options }) => {
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
};

export const LAYER_FOREGROUND_HOUSE_CONDITIONS = {
  create: ({ grid }) => {
    let conditions = [];

    grid.array.forEach(({ coords, options }) => {
      if (options[0] === TileName.HOUSE_MIDDLE_LEFT) {
        conditions = [
          ...conditions,
          ...[
            { tile: TileName.HOUSE_TOP_LEFT, coords: [coords[0], coords[1] - 1] },
            { tile: TileName.HOUSE_TOP_RIGHT, coords: [coords[0] + 1, coords[1] - 1] },
          ]
        ];
      }
    });

    return conditions;
  }
};
