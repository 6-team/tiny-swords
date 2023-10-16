/* eslint-disable @typescript-eslint/no-unused-vars */
import { TileName } from "../../../renderer";
import { createCoordsLayerDict, createLayerConditions, getQuantityCells, getShuffleFilterCoords, randomElement, randomInteger, weightedRandomElement } from "../../layers.utils";
import { LayerCondition } from "../../../layer/layer.types";
import { LevelType } from "../../../level/level.types";
import { ResourcesType } from "../../../../entities/resource";

const resourcesWeightedTiles = (cells: number, level: LevelType) => [{
  count: getQuantityCells(cells, randomInteger(3, 6)),
  weightedTiles: [
    { tile: ResourcesType.GOLD, weight: level === LevelType.Sand ? 10 : 2 },
    { tile: ResourcesType.MEAT, weight: level === LevelType.Stones ? 10 : 2 },
    { tile: ResourcesType.WOOD, weight: level === LevelType.Ground ? 10 : 2 },
  ],
}];

/**
 * Шаблон для ресурсов на поверхности
 */
export const resourcesConditions = (level: LevelType, layers): LayerCondition[] => {
  const layerBoundaryCellsDict = (layer) => createCoordsLayerDict(layer, (tile, boundary) => {
    const isNotTerrain = tile >= TileName.BRIDGE_LEFT;
    return boundary || isNotTerrain
  });
  const layersBoundaryCellsDict = layers.reduce((acc, layer) => ({...acc, ...layerBoundaryCellsDict(layer.array)}), {});
  const availableCells = getShuffleFilterCoords(layers[0], ([x, y]) => !layersBoundaryCellsDict[`${x}-${y}`]);  
  const weightedTiles  = resourcesWeightedTiles(availableCells.length, level);

  return availableCells.length ? createLayerConditions(availableCells, weightedTiles) : [];
};