/* eslint-disable @typescript-eslint/no-unused-vars */
import { TileName } from "../../../renderer";
import { createCoordsLayerDict, createLayerConditions, getQuantityCells, getShuffleFilterCoords, randomElement, weightedRandomElement } from "../../layers.utils";
import { LayerCondition } from "../../../layer/layer.types";

const waterWeightedTiles = (cells: number) => [{
  count: getQuantityCells(cells, 15),
  weightedTiles: [
    { tile: TileName.ROCKS_S, weight: 5 },
    { tile: TileName.ROCKS_M, weight: 2 },
    { tile: TileName.ROCKS_L, weight: 1 },
  ],
}];

/**
 * Create a dictionary of water cells based on a layer.
 * 
 * @param {Layer} layer - The layer to analyze.
 * @returns {Object} A dictionary of water cells.
 */
const layerCellsDict = (layer) => createCoordsLayerDict(layer, (tile) => {
  return tile === TileName.WATER_MIDDLE_MIDDLE
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
  const weightedTiles  = waterWeightedTiles(availableCells.length);

  return availableCells.length ? createLayerConditions(availableCells, weightedTiles) : [];
};