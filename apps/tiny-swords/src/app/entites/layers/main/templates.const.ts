import { TileName } from "../../renderer/renderer.const";
import { randomInteger } from "../utils/layers.utils";

export const LAYER_MAIN_TEMPLATE_BRIDGE_CENTER = {
  create: ({ gridX, gridY }) => {
    const centerX = Math.floor(gridX / 2);
    const centerY = Math.floor(gridY / 2);
    const x = randomInteger(centerX - 2, centerX + 2);
    const y = randomInteger(centerY - 2, centerY + 2);

    return [{
      tile: TileName.BRIDGE_MIDDLE,
      coords: [x, y],
    }];
  }
}

export const LAYER_MAIN_TEMPLATE_WATER_BORDER_1 = {
  create: ({ gridX, gridY }) => {
    const conditions = [];

    for (let y = 0; y < gridY; y++) {
      for (let x = 0; x < gridX; x++) {
        if (y === 0 || x === gridX - 1 || y === gridY - 1 || x === 0) {
          conditions.push({
            tile: TileName.WATER_MIDDLE_MIDDLE,
            coords: [x, y],
          });
        }
      }
    }

    return conditions;
  }
}

export const LAYER_MAIN_TEMPLATE_HOUSE = {
  create: ({ gridX, gridY }) => {
    const firstPart = Math.floor(gridX / 5);
    const x = randomInteger(1, firstPart - 1);
    const y = randomInteger(2, gridY - 3);

    return [
      {
        tile: TileName.HOUSE_BOTTOM_LEFT,
        coords: [x, y],
      },
      {
        tile: TileName.HOUSE_BOTTOM_RIGHT,
        coords: [x + 1, y],
      },
      {
        tile: TileName.GROUND_BOTTOM_LEFT,
        coords: [x, y + 1],
      }
    ];
  },
}

export const LAYER_MAIN_TEMPLATE_TREE = {
  create: ({ gridX }) => {
    
    return [{
      tile: TileName.TREE_STRUMP,
      coords: [gridX - 3, 2],
    }];
  },
};