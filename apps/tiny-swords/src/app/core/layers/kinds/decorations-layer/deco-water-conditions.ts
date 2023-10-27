/* eslint-disable @typescript-eslint/no-unused-vars */
import { SpriteName } from "@core/renderer";
import { createCoordsLayerDict, createLayerConditions, getQuantityCells, getShuffleFilterCoords, randomElement, weightedRandomElement } from "../../layers.utils";
import { LayerCondition } from "@core/layer";

const waterWeightedSprites = (cells: number) => [{
  count: getQuantityCells(cells, 15),
  weightedSprites: [
    { sprite: SpriteName.ROCKS_S, weight: 5 },
    { sprite: SpriteName.ROCKS_M, weight: 2 },
    { sprite: SpriteName.ROCKS_L, weight: 1 },
  ],
}];

/**
 * Create a dictionary of water cells based on a layer.
 * 
 * @param {Layer} layer - The layer to analyze.
 * @returns {Object} A dictionary of water cells.
 */
const layerCellsDict = (layer) => createCoordsLayerDict(layer, (sprite) => {
  return sprite === SpriteName.WATER_MIDDLE_MIDDLE
});

/**
 * Generate water decoration conditions based on the layers.
 * 
 * @param {Array<Layer>} layers - An array of layers used for decoration elements.
 * @returns {Array<LayerCondition>} An array of decoration conditions for water.
 */
export const decorationsWaterConditions = (layers): LayerCondition[] => {
  const layersCellsDict = layers.reduce((acc, layer) => ({...acc, ...layerCellsDict(layer.array)}), {});
  const availableCells = getShuffleFilterCoords(layers[0], ([x, y]) => layersCellsDict[`${x}-${y}`]);  
  const weightedSprites  = waterWeightedSprites(availableCells.length);

  return availableCells.length ? createLayerConditions(availableCells, weightedSprites) : [];
};