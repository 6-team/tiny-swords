/* eslint-disable @typescript-eslint/no-unused-vars */
import { TileName } from "../../../renderer";
import { createCoordsLayerDict, createLayerConditions, getQuantityCells, getShuffleFilterCoords, randomElement, randomInteger, weightedRandomElement } from "../../layers.utils";
import { LayerCondition } from "../../../layer/layer.types";
import { LevelType } from "../../../level/level.types";

const enemiesWeightedTiles = (cells: number) => [{
  count: getQuantityCells(cells, randomInteger(2, 5)),
  weightedTiles: [
    { tile: 1, weight: 7 },
  ],
}];

/**
 * Шаблон для врагов
 */
export const enemiesConditions = (level: LevelType, startCoords: [number, number], endCoords: [number, number], layers): LayerCondition[] => {
  const layerBoundaryCellsDict = (layer) => createCoordsLayerDict(layer, (tile, boundary) => {
    const isNotTerrain = tile >= TileName.BRIDGE_LEFT;
    return boundary || isNotTerrain
  });  
  const layersBoundaryCellsDict = layers.reduce((acc, layer) => ({...acc, ...layerBoundaryCellsDict(layer.array)}), {
    [`${startCoords[0]}-${startCoords[1]}`]: true,
    [`${endCoords[0]}-${endCoords[1]}`]: true,
  });
  const availableCells = getShuffleFilterCoords(layers[0], ([x, y]) => !layersBoundaryCellsDict[`${x}-${y}`]);
  const weightedTiles  = enemiesWeightedTiles(availableCells.length);

  return availableCells.length ? createLayerConditions(availableCells, weightedTiles) : [];
};
