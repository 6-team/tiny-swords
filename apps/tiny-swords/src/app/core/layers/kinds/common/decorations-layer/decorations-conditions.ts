/* eslint-disable @typescript-eslint/no-unused-vars */
import { TileName } from "../../../../renderer";
import { Layer } from "../../../../layer/layer";
import { randomElement, shuffleArray, weightedRandomElement } from "../../../layers.utils";
import { LayerCondition } from "../../../../layer/layer.types";
import { LevelType } from "../../../../level/level.types";

export const GROUND_DECO_TILE_WEIGHT: Record<number, [TileName, number, boolean][]> = {
  10: [
    [TileName.DECO_MUSHROOM_S, 3, false],
    [TileName.DECO_MUSHROOM_M, 2, false],
    [TileName.DECO_MUSHROOM_L, 1, false],
  ],
  6: [
    [TileName.DECO_STONE_S,    3, false],
    [TileName.DECO_STONE_M,    2, false],
    [TileName.DECO_STONE_L,    1, false],
  ],
  15: [
    [TileName.DECO_BUSH_S,     3, false],
    [TileName.DECO_BUSH_M,     2, false],
    [TileName.DECO_BUSH_L,     1, false],
  ],
  3: [
    [TileName.DECO_PUMPKIN_S,  5, false],
    [TileName.DECO_PUMPKIN_M,  1, false],
  ],
  11: [
    [TileName.DECO_WEED_S,     2, false],
    [TileName.DECO_WEED_M,     1, false],
  ],
  5: [
    [TileName.DECO_BONE_S_RIGHT, 1, false],
    [TileName.DECO_BONE_S_LEFT,  1, false],
    [TileName.DECO_BONE_M_RIGHT, 1, false],
    [TileName.DECO_BONE_M_LEFT,  1, false],
  ],
  [randomElement([2, 4])]: [
    [TileName.SHEEP_RIGHT, 1, false],
    [TileName.SHEEP_LEFT,  1, false],
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
  [randomElement([1, 2, 3, 4])]: [
    [TileName.SHEEP_RIGHT, 1, false],
    [TileName.SHEEP_LEFT,  1, false],
  ],
};

/**
 * Создание перемешанного и фильтрованного массива координат
 */
const getShuffleFilterCoords = (layer, condition) => {
  return shuffleArray(
    layer.array
      .map(({ coords }) => coords)
      .filter(condition)
  );
}

/**
 * Хелперы для создания декораций в воде
 */
const waterDictionaryLayer = (layer) => {
  return layer.array.reduce((acc, { coords, options }) => {
    if (options[0] === TileName.WATER_MIDDLE_MIDDLE) {
      return {
        ...acc,
        [`${coords[0]}${coords[1]}`]: true
      }
    }
    return acc;
  }, {});
}

const waterDictionaryLayers = (layers) => {
  return layers.reduce((acc, layer) => {
    return {
      ...acc,
      ...waterDictionaryLayer(layer),
    }
  }, {});
}

/**
 * Шаблон для декораций в воде
 */
export const decorationsWaterConditions = (layers): LayerCondition[] => {
  const random = 20;
  const conditions = [];

    // создаем массив координат где нельзя поставить декорации
    const waterCoords = waterDictionaryLayers(layers);

    // создаем массив координат куда можно размещать декорации
    const availableCells = getShuffleFilterCoords(layers[0], ([x, y]) => waterCoords[`${x}${y}`]);

  if (availableCells.length) {
    for (let i = 0; i < random; i++) {
      const coords = availableCells[i];

      conditions.push({
        tile: weightedRandomElement([
          [TileName.ROCKS_S, 3],
          [TileName.ROCKS_M, 2],
          [TileName.ROCKS_L, 1],
        ]),
        coords,
        boundary: false,
      });
    }
  }

  return conditions;
};

/**
 * Хелперы для создания декораций на поверхности
 */
const boundariesDictionaryLayer = (layer) => {
  return layer.array.reduce((acc, { boundary, coords, options }) => {
    const isNotTerrain = options[0] >= TileName.BRIDGE_LEFT;

    if (boundary || isNotTerrain) {
      return {
        ...acc,
        [`${coords[0]}${coords[1]}`]: true
      }
    }
    return acc;
  }, {});
}

const boundariesDictionaryLayers = (layers) => {
  return layers.reduce((acc, layer) => {
    return {
      ...acc,
      ...boundariesDictionaryLayer(layer),
    }
  }, {});
}

/**
 * Шаблон для декораций на поверхности
 */
export const decorationsTerrainConditions = (level: LevelType, layers): LayerCondition[] => {
  const conditions = [];

  // создаем массив координат где нельзя поставить декорации
  const boundariesCoords = boundariesDictionaryLayers(layers);

  // создаем перемешанный массив координат куда можно размещать декорации
  const availableCells = getShuffleFilterCoords(layers[0], ([x, y]) => !boundariesCoords[`${x}${y}`]);

  const decoWeight = level === LevelType.Ground
    ? GROUND_DECO_TILE_WEIGHT
    : SAND_DECO_TILE_WEIGHT;

    let cursor = 0;
    
    Object.keys(decoWeight).forEach((key: string) => {
      for (let i = 0; i < +key; i++) {
        const coords = availableCells[cursor];

        const tile = weightedRandomElement(decoWeight[key]);
        const [_, __, boundary] = decoWeight[key].find(([tileName]) => tileName === tile);


        console.log(boundary);

        conditions.push({
          tile,
          coords,
          boundary,
        });

        cursor++;
      }
    });

  return conditions;
};
