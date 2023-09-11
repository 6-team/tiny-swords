import { TileName } from "../../renderer/renderer.const";
import { weightedRandom, randomElement } from "../utils/layers.utils";

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

// const availableCells = grid.#grid.array.filter(({ coords, options }) => {
//   return conditionFn({ x: coords[0], y: coords[1], options });
// });

// if (availableCells.length) {
//   for (let i = 0; i < random; i++) {
//     const { coords } = availableCells[Math.floor(Math.random() * availableCells.length)];

//     this.#grid.set({ x: coords[0], y: coords[1] }, { 
//       collapsed: true,
//       coords: [coords[0], coords[1]],
//       options: [this.weightedRandom(data)],
//     });
//   }
// }

export const LAYER_DECO_WATER_CONDITIONS = {
  create: ({ grid }) => {
    const random = 8;
    const conditions = [];

    const availableCells = grid.array.filter(({ coords, options }) => {
      return TileName.WATER_MIDDLE_MIDDLE === options[0];
    });
    
    if (availableCells.length) {
      for (let i = 0; i < random; i++) {
        const { coords } = randomElement(availableCells) as any;
    
        conditions.push({
          tile: weightedRandom([
            [TileName.ROCKS_S, 7],
            [TileName.ROCKS_M, 5],
            [TileName.ROCKS_L, 2],
          ]),
          coords,
        });
      }
    }

    return conditions;
  }
};

export const LAYER_DECO_GROUND_CONDITIONS = {
  create: ({ grid }) => {
    const random = 30;
    const conditions = [];

    const availableCells = grid.array.filter(({ coords, options }) => {
      return TileName.WATER_MIDDLE_MIDDLE < options[0] && options[0] < TileName.BRIDGE_LEFT;
    });
    
    if (availableCells.length) {
      for (let i = 0; i < random; i++) {
        const { coords } = randomElement(availableCells) as any;
    
        conditions.push({
          tile: weightedRandom(LAYER_DECO_TILE_WEIGHT),
          coords,
        });
      }
    }

    return conditions;
  }
};