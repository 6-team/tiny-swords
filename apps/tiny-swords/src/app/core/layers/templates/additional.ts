import { TileName } from "../../renderer/renderer.const";
import { LayersTemplate } from "../layers.types";

/**
 * Шаблон для дополнительных слоев:
 * - тень под мостами
 * - трава по мостами
 * - трава под домом
 */
export const LAYER_ADDITIONAL_EMPTY_CONDITIONS: LayersTemplate = {
  create: ({ grid }) => {
    const conditions = [];

    const getCondition = (tile, coords) => {
      switch(tile) {
        case TileName.BRIDGE_MIDDLE:
          return { tile: TileName.BRIDGE_SHADOW, coords };
        case TileName.BRIDGE_LEFT:
          return { tile: TileName.GROUND_MIDDLE_RIGHT, coords };
        case TileName.BRIDGE_RIGHT:
          return { tile: TileName.GROUND_MIDDLE_LEFT, coords };
        case TileName.TREE_STRUMP:
          return { tile: TileName.GROUND_MIDDLE_MIDDLE, coords };
        case TileName.HOUSE_BOTTOM_LEFT:
          return { tile: TileName.GROUND_MIDDLE_LEFT, coords };
        case TileName.HOUSE_BOTTOM_RIGHT:
          return { tile: TileName.GROUND_MIDDLE_RIGHT, coords };
        case TileName.HOUSE_MIDDLE_LEFT:
          return { tile: TileName.GROUND_TOP_LEFT, coords };
        case TileName.HOUSE_MIDDLE_RIGHT:
          return { tile: TileName.GROUND_TOP_RIGHT, coords };
        default:
          return null;
      }
    }

    grid.array.forEach(({ coords, options }) => {
      const condition = getCondition(options[0], coords);

      if (condition) {
        conditions.push({
          ...condition,
        });
      }
    });

    return conditions;
  }
}

/**
 * Шаблон для дорисовки нижней части дерева
 */
export const LAYER_ADDITIONAL_TREE_BOTTOM_CONDITIONS: LayersTemplate = {
  create: ({ grid }) => {
    let conditions = [];

    grid.array.forEach(({ coords, options }) => {
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
}

/**
 * Шаблон для заливки всего слоя водой
 */
export const LAYER_ADDITIONAL_WATER_CONDITIONS: LayersTemplate = {
  create: ({ grid }) => {
    const conditions = [];

    grid.array.forEach(({ coords }) => {
      conditions.push({ tile: TileName.WATER_MIDDLE_MIDDLE, coords, })
    });

    return conditions;
  }
}

/**
 * Шаблон для дорисовки дома
 */
export const LAYER_ADDITIONAL_HOUSE_CONDITIONS: LayersTemplate = {
  create: ({ enter, exit }) => {
    return [
      // левый дом
      { tile: TileName.HOUSE_BOTTOM_LEFT, coords: [enter[0] - 1, enter[1] - 1], boundary: true },
      { tile: TileName.HOUSE_BOTTOM_RIGHT, coords: [enter[0], enter[1] - 1], boundary: true },
      { tile: TileName.HOUSE_MIDDLE_LEFT, coords: [enter[0] - 1, enter[1] - 2], boundary: true },
      { tile: TileName.HOUSE_MIDDLE_RIGHT, coords: [enter[0], enter[1] - 2 ], boundary: true },
      // правый дом
      { tile: TileName.HOUSE_BOTTOM_LEFT, coords: [exit[0], exit[1] - 1], boundary: true },
      { tile: TileName.HOUSE_BOTTOM_RIGHT, coords: [exit[0] + 1, exit[1] - 1], boundary: true },
      { tile: TileName.HOUSE_MIDDLE_LEFT, coords: [exit[0], exit[1] - 2], boundary: true },
      { tile: TileName.HOUSE_MIDDLE_RIGHT, coords: [exit[0] + 1, exit[1] - 2 ], boundary: true },
    ];
  }
}

/**
 * Шаблон для дорисовки знаков
 */
export const LAYER_ADDITIONAL_SIGN_CONDITIONS: LayersTemplate = {
  create: ({ enter, exit }) => {
    return [
      // левый знак
      { tile: TileName.DECO_SIGN_STOP_BOTTOM, coords: [enter[0] - 1, enter[1]], boundary: true },
      { tile: TileName.DECO_SIGN_STOP_TOP, coords: [enter[0] - 1, enter[1] - 1] },
      // правый знак
      { tile: TileName.DECO_SIGH_RIGHT_BOTTOM, coords: [exit[0] + 1, exit[1]], boundary: true },
      { tile: TileName.DECO_SIGH_RIGHT_TOP, coords: [exit[0] + 1, exit[1] - 1] },
    ];
  }
}

/**
 * Шаблон для границ
 */
export const LAYER_ADDITIONAL_BOUNDARY_CONDITIONS: LayersTemplate = {
  create: ({ boundaries }) => {
    const conditions = [];

    boundaries.forEach((coords) => {
      conditions.push({ tile: TileName.BOUNDARY, coords, })
    });

    return conditions;
  }
}