import { TileName } from "../../renderer/renderer.const";
import { ILayersGridTemplate } from "../grid/grid.types";
import { weightedRandomElement, randomElement } from "../utils/layers.utils";

export const LAYER_DECO_TILE_WEIGHT: Record<number, [TileName, number][]> = {
  10: [
    [TileName.DECO_MUSHROOM_S, 3],
    [TileName.DECO_MUSHROOM_M, 2],
    [TileName.DECO_MUSHROOM_L, 1],
  ],
  5: [
    [TileName.DECO_STONE_S,    3],
    [TileName.DECO_STONE_M,    2],
    [TileName.DECO_STONE_L,    1],
  ],
  15: [
    [TileName.DECO_BUSH_S,     3],
    [TileName.DECO_BUSH_M,     2],
    [TileName.DECO_BUSH_L,     1],
  ],
  6: [
    [TileName.DECO_PUMPKIN_S,  2],
    [TileName.DECO_PUMPKIN_M,  1],
  ],
  11: [
    [TileName.DECO_WEED_S,     2],
    [TileName.DECO_WEED_M,     1],
  ],
};

/**
 * Шаблон для декораций в воде
 */
export const LAYER_DECO_WATER_CONDITIONS: ILayersGridTemplate = {
  create: ({ grid }) => {
    const random = 20;
    const conditions = [];

    const availableCells = grid.array.filter(({ options }) => {
      return TileName.WATER_MIDDLE_MIDDLE === options[0];
    });
    
    if (availableCells.length) {
      for (let i = 0; i < random; i++) {
        const { coords } = randomElement(availableCells);
    
        conditions.push({
          tile: weightedRandomElement([
            [TileName.ROCKS_S, 3],
            [TileName.ROCKS_M, 2],
            [TileName.ROCKS_L, 1],
          ]),
          coords,
        });
      }
    }

    return conditions;
  }
};

/**
 * Шаблон для декораций на траве
 */
export const LAYER_DECO_GROUND_CONDITIONS: ILayersGridTemplate = {
  create: ({ grid }) => {
    const conditions = [];

    const availableCells = grid.array.filter(({ options }) => {
      return TileName.WATER_MIDDLE_MIDDLE < options[0] && options[0] < TileName.BRIDGE_LEFT;
    });
    
    if (availableCells.length) {
      Object.keys(LAYER_DECO_TILE_WEIGHT).forEach((key: string) => {
        for (let i = 0; i < +key; i++) {
          const { coords } = randomElement(availableCells);
      
          conditions.push({
            tile: weightedRandomElement(LAYER_DECO_TILE_WEIGHT[key]),
            coords,
          });
        }
      });
    }

    return conditions;
  }
};