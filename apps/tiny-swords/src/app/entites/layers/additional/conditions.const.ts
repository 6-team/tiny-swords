import { TileName } from "../../renderer/renderer.const";

/**
 * Шаблон для дополнительных слоев:
 * - тень под мостами
 * - трава по мостами
 * - трава под домом
 */
export const LAYER_ADDITIONAL_EMPTY_CONDITIONS = {
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
export const LAYER_ADDITIONAL_TREE_BOTTOM_CONDITIONS = {
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
export const LAYER_ADDITIONAL_WATER_CONDITIONS = {
  create: ({ grid }) => {
    const conditions = [];

    grid.array.forEach(({ coords }) => {
      conditions.push({ tile: TileName.WATER_MIDDLE_MIDDLE, coords, })
    });

    return conditions;
  }
}