/* eslint-disable @typescript-eslint/no-unused-vars */
import { TileName } from "../../../renderer";
import { getShuffleFilterCoords, randomElement, weightedRandomElement } from "../../layers.utils";
import { LayerCondition } from "../../../layer/layer.types";
import { LevelType } from "../../../level/level.types";
import { ResourcesType } from "../../../../entities/resource";

export const RESOURCES_TILE_WEIGHT: Record<number, [ResourcesType, number, boolean][]> = {
  [randomElement([3, 4, 5, 6])]: [
    [ResourcesType.GOLD, 10, false],
    [ResourcesType.MEAT, 1, false],
    [ResourcesType.WOOD, 10, false],
  ],
};

/**
 * Хелперы для создания ресурсов на поверхности
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
 * Шаблон для ресурсов на поверхности
 */
export const resourcesConditions = (level: LevelType, layers): LayerCondition[] => {
  const conditions = [];

  // создаем массив координат где нельзя поставить ресурсы
  const boundariesCoords = boundariesDictionaryLayers(layers);

  // создаем перемешанный массив координат куда можно размещать ресурсы
  const availableCells = getShuffleFilterCoords(layers[0], ([x, y]) => !boundariesCoords[`${x}${y}`]);

    let cursor = 0;
    
    Object.keys(RESOURCES_TILE_WEIGHT).forEach((key: string) => {
      for (let i = 0; i < +key; i++) {
        const coords = availableCells[cursor];

        const tile = weightedRandomElement(RESOURCES_TILE_WEIGHT[key]);
        const [_, __, boundary] = RESOURCES_TILE_WEIGHT[key].find(([tileName]) => tileName === tile);

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
