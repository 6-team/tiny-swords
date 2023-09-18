/* eslint-disable @typescript-eslint/no-unused-vars */
import { LevelType } from "../../../../level/level";
import { TileName } from "../../../../renderer";
import { Layer } from "../../../../layer/layer";
import { randomElement, shuffleArray, weightedRandomElement } from "../../../layers.utils";
import { LayerCell, LayerCondition } from "../../../../layer/layer.types";


export const GROUND_DECO_TILE_WEIGHT: Record<number, [TileName, number, boolean][]> = {
  10: [
    [TileName.DECO_MUSHROOM_S, 3, false],
    [TileName.DECO_MUSHROOM_M, 2, false],
    [TileName.DECO_MUSHROOM_L, 1, false],
  ],
  5: [
    [TileName.DECO_STONE_S,    3, false],
    [TileName.DECO_STONE_M,    2, false],
    [TileName.DECO_STONE_L,    1, false],
  ],
  15: [
    [TileName.DECO_BUSH_S,     3, false],
    [TileName.DECO_BUSH_M,     2, false],
    [TileName.DECO_BUSH_L,     1, false],
  ],
  6: [
    [TileName.DECO_PUMPKIN_S,  2, false],
    [TileName.DECO_PUMPKIN_M,  1, false],
  ],
  11: [
    [TileName.DECO_WEED_S,     2, false],
    [TileName.DECO_WEED_M,     1, false],
  ],
  4: [
    [TileName.DECO_BONE_S_RIGHT, 1, false],
    [TileName.DECO_BONE_S_LEFT,  1, false],
    [TileName.DECO_BONE_M_RIGHT, 1, false],
    [TileName.DECO_BONE_M_LEFT,  1, false],
  ],
};

export const SAND_DECO_TILE_WEIGHT: Record<number, [TileName, number, boolean][]> = {
  18: [
    [TileName.DECO_STONE_S,    3, false],
    [TileName.DECO_STONE_M,    2, false],
    [TileName.DECO_STONE_L,    1, false],
  ],
  5: [
    [TileName.DECO_BUSH_S,     3, false],
    [TileName.DECO_BUSH_M,     2, false],
    [TileName.DECO_BUSH_L,     1, false],
  ],
  20: [
    [TileName.DECO_WEED_S,     2, false],
    [TileName.DECO_WEED_M,     1, false],
  ],
  10: [
    [TileName.DECO_BONE_S_RIGHT, 1, false],
    [TileName.DECO_BONE_S_LEFT,  1, false],
    [TileName.DECO_BONE_M_RIGHT, 1, false],
    [TileName.DECO_BONE_M_LEFT,  1, false],
  ],
};

/**
 * Шаблон для декораций в воде
 */
export const decorationsWaterConditions = (layer): LayerCondition[] => {
  const random = 20;
  const conditions = [];

  let availableCells: LayerCell[] = layer.array.filter(({ options }) => {
    return TileName.WATER_MIDDLE_MIDDLE === options[0];
  });

  if (availableCells.length) {
    availableCells = shuffleArray(availableCells);

    for (let i = 0; i < random; i++) {
      const { coords } = availableCells[i];

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
};

/**
 * Шаблон для декораций на поверхности
 */
export const decorationsTerrainConditions = (level: LevelType, layer): LayerCondition[] => {
  const conditions = [];

  let availableCells: LayerCell[] = layer.array.filter(({ options }) => {
    return TileName.WATER_MIDDLE_MIDDLE < options[0] && options[0] < TileName.BRIDGE_LEFT;
  });

  const decoWeight = level === LevelType.Ground
    ? GROUND_DECO_TILE_WEIGHT
    : SAND_DECO_TILE_WEIGHT;

  if (availableCells.length) {
    Object.keys(decoWeight).forEach((key: string) => {
      availableCells = shuffleArray(availableCells);

      for (let i = 0; i < +key; i++) {
        const { coords } = availableCells[i];

        const tile = weightedRandomElement(decoWeight[key]);
        const [_, __, boundary] = decoWeight[key].find(([tileName]) => tileName === tile);

        conditions.push({
          tile,
          coords,
          boundary,
        });
      }
    });
  }

  return conditions;
};
