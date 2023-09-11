import { TileName } from "../../renderer/renderer.const";
import { ILayersGridTemplate, RoleType } from "../grid/grid.types";
import { randomInteger } from "../utils/layers.utils";

/**
 * Шаблон для вертикальной реки по середине карты с мостом
 */
export const LAYER_MAIN_TEMPLATE_BRIDGE_CENTER: ILayersGridTemplate = {
  create: ({ gridX, gridY }) => {
    const centerX = Math.floor(gridX / 2);
    const centerY = Math.floor(gridY / 2);
    const x = randomInteger(centerX - 2, centerX);
    const y = randomInteger(centerY - 1, centerY + 1);

    const conditions = [];

    for (let i = 0; i < gridY; i++) {
      if (i === y) {
        conditions.push({
          tile: TileName.BRIDGE_MIDDLE,
          coords: [x, y],
        });
      } else {
        conditions.push({
          tile: TileName.WATER_MIDDLE_MIDDLE,
          coords: [x, i],
        });
      }
    }

    return conditions;
  }
}

/**
 * Шаблон рамки из воды
 */
export const LAYER_MAIN_TEMPLATE_WATER_BORDER_1: ILayersGridTemplate = {
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

/**
 * Шаблон для левого дома
 */
export const LAYER_MAIN_TEMPLATE_LEFT_HOUSE: ILayersGridTemplate = {
  create: ({ gridX, gridY }) => {
    const firstPart = Math.floor(gridX / 5);
    const x = randomInteger(1, firstPart - 2);
    const y = randomInteger(2, gridY - 4);

    return [
      // Нижняя часть земли под остров
      {
        tile: TileName.GROUND_MIDDLE_LEFT,
        coords: [x, y],
      },
      {
        tile: TileName.GROUND_MIDDLE_RIGHT,
        coords: [x + 1, y],
      },
      // Верхняя часть земли под остров
      {
        tile: TileName.GROUND_TOP_LEFT,
        coords: [x, y - 1],
      },
      {
        tile: TileName.GROUND_TOP_RIGHT,
        coords: [x + 1, y - 1],
      },
      // Под домом у нас мост и угол земли чтобы замкнуть остров
      {
        tile: TileName.GROUND_MIDDLE_LEFT,
        coords: [x, y + 1],
      },
      {
        tile: TileName.BRIDGE_LEFT,
        coords: [x + 1, y + 1],
        role: RoleType.ENTER,
      }
    ];
  },
}

/**
 * Шаблон для правого дома
 */
export const LAYER_MAIN_TEMPLATE_RIGHT_HOUSE: ILayersGridTemplate = {
  create: ({ gridX, gridY }) => {
    const lastPart = gridX - Math.floor(gridX / 5) - 1;
    const x = randomInteger(lastPart, gridX - 3); // [14, 17]
    const y = randomInteger(2, gridY - 4);

    return [
      // Нижняя часть земли под остров
      {
        tile: TileName.GROUND_MIDDLE_LEFT,
        coords: [x, y],
      },
      {
        tile: TileName.GROUND_MIDDLE_RIGHT,
        coords: [x + 1, y],
      },
      // Верхняя часть земли под остров
      {
        tile: TileName.GROUND_TOP_LEFT,
        coords: [x, y - 1],
      },
      {
        tile: TileName.GROUND_TOP_RIGHT,
        coords: [x + 1, y - 1],
      },
      // Под домом у нас мост и угол земли чтобы замкнуть остров
      {
        tile: TileName.BRIDGE_RIGHT,
        coords: [x, y + 1],
        role: RoleType.EXIT,
      },
      {
        tile: TileName.GROUND_MIDDLE_RIGHT,
        coords: [x + 1, y + 1],
      },
    ];
  },
}

/**
 * Шаблон для дерева
 */
export const LAYER_MAIN_TEMPLATE_TREE: ILayersGridTemplate = {
  create: ({ gridX }) => {
    
    return [{
      tile: TileName.TREE_STRUMP,
      coords: [gridX - 3, 2],
    }];
  },
};