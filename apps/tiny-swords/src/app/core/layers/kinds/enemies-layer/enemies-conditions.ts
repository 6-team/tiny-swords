import { SpriteName } from "@core/renderer";
import { createCoordsLayerDict, createLayerConditions, getQuantityCells, getShuffleFilterCoords, randomInteger } from "@core/layers";
import { LayerCondition } from "@core/layer";
import { LevelType } from "@core/level";
import { Layer } from "@core/layer";

const enemiesWeightedSprites = (cells: number) => [{
  count: getQuantityCells(cells, randomInteger(2, 5)),
  weightedSprites: [
    { sprite: 1, weight: 7 },
  ],
}];

/**
 * Generates enemy conditions based on the provided parameters.
 *
 * @param {LevelType} level - The level type for the conditions.
 * @param {[number, number]} startCoords - The starting coordinates as an array [x, y].
 * @param {[number, number]} endCoords - The ending coordinates as an array [x, y].
 * @param {Layers[]} layers - An array of layers (missing type information).
 *
 * @returns {LayerCondition[]} An array of enemy conditions for the given level and coordinates.
 */
export const enemiesConditions = (level: LevelType, startCoords: [number, number], endCoords: [number, number], layers: Layer[]): LayerCondition[] => {
  const layerBoundaryCellsDict = (layer) => createCoordsLayerDict(layer, (sprite, boundary) => {
    const isNotTerrain = sprite >= SpriteName.BRIDGE_LEFT;
    return boundary || isNotTerrain
  });
  const layersBoundaryCellsDict = layers.reduce((acc, layer) => ({...acc, ...layerBoundaryCellsDict(layer.array)}), {
    [`${startCoords[0]}-${startCoords[1]}`]: true,
    [`${endCoords[0]}-${endCoords[1]}`]: true,
  });
  const availableCells = getShuffleFilterCoords(layers[0], ([x, y]) => !layersBoundaryCellsDict[`${x}-${y}`]);
  const weightedSprites  = enemiesWeightedSprites(availableCells.length);

  return availableCells.length ? createLayerConditions(availableCells, weightedSprites) : [];
};
