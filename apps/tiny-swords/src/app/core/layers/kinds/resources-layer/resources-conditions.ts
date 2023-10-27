/* eslint-disable @typescript-eslint/no-unused-vars */
import { TileName } from '@core/renderer';
import {
  createCoordsLayerDict,
  createLayerConditions,
  getQuantityCells,
  getShuffleFilterCoords,
  randomInteger,
} from '@core/layers';
import { LayerCondition } from '@core/layer';
import { LevelType } from '@core/level';
import { ResourcesType } from '@entities/resource';
import { Layer } from '@core/layer';

const resourcesWeightedTiles = (cells: number, level: LevelType) => [
  {
    count: getQuantityCells(cells, randomInteger(3, 6)),
    weightedTiles: [
      { tile: ResourcesType.GOLD, weight: level === LevelType.Sand ? 10 : 2 },
      { tile: ResourcesType.MEAT, weight: level === LevelType.Stones ? 10 : 2 },
      { tile: ResourcesType.WOOD, weight: level === LevelType.Ground ? 10 : 2 },
    ],
  },
];

/**
 * Generates resource conditions for surface resources.
 *
 * @param {LevelType} level - The level type associated with the resource conditions.
 * @param {Layer[]} layers - An array of layers (missing type information) containing resource data.
 *
 * @returns {LayerCondition[]} An array of resource conditions based on the specified level and layers.
 */
export const resourcesConditions = (level: LevelType, layers: Layer[]): LayerCondition[] => {
  const layerBoundaryCellsDict = (layer) =>
    createCoordsLayerDict(layer, (tile, boundary) => {
      const isNotTerrain = tile >= TileName.BRIDGE_LEFT;
      return boundary || isNotTerrain;
    });
  const layersBoundaryCellsDict = layers.reduce(
    (acc, layer) => ({ ...acc, ...layerBoundaryCellsDict(layer.array) }),
    {},
  );
  const availableCells = getShuffleFilterCoords(layers[0], ([x, y]) => !layersBoundaryCellsDict[`${x}-${y}`]);
  const weightedTiles = resourcesWeightedTiles(availableCells.length, level);

  return availableCells.length ? createLayerConditions(availableCells, weightedTiles) : [];
};
