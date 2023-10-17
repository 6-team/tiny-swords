/* eslint-disable @typescript-eslint/no-unused-vars */
import { TileName } from "../../../renderer";
import { Layer } from "../../../layer/layer";
import { createCoordsLayerDict, createLayerConditions, getQuantityCells, getShuffleFilterCoords, randomElement, randomInteger, weightedRandomElement } from "../../layers.utils";
import { LayerCondition } from "../../../layer/layer.types";
import { LevelType } from "../../../level/level.types";

const groundWeightedTiles = (cells: number) => [
  {
    count: getQuantityCells(cells, 15),
    weightedTiles: [
      { tile: TileName.DECO_MUSHROOM_S, weight: 5 },
      { tile: TileName.DECO_MUSHROOM_M, weight: 2 },
      { tile: TileName.DECO_MUSHROOM_L, weight: 1 },
    ],
  },
  {
    count: getQuantityCells(cells, 15),
    weightedTiles: [
      { tile: TileName.DECO_BUSH_S, weight: 5 },
      { tile: TileName.DECO_BUSH_M, weight: 2 },
      { tile: TileName.DECO_BUSH_L, weight: 1 },
    ],
  },
  {
    count: getQuantityCells(cells, 3),
    weightedTiles: [
      { tile: TileName.DECO_PUMPKIN_S, weight: 3 },
      { tile: TileName.DECO_PUMPKIN_M, weight: 1 },
    ],
  },
  {
    count: getQuantityCells(cells, 10),
    weightedTiles: [
      { tile: TileName.DECO_WEED_S, weight: 2 },
      { tile: TileName.DECO_WEED_M, weight: 1 },
    ],
  },
  {
    count: getQuantityCells(cells, 1),
    weightedTiles: [
      { tile: TileName.SHEEP_RIGHT, weight: 1 },
      { tile: TileName.SHEEP_LEFT, weight: 1 },
    ],
  }
];

const sandWeightedTiles = (cells: number) => [
  {
    count: getQuantityCells(cells, 5),
    weightedTiles: [
      { tile: TileName.DECO_BUSH_S, weight: 5 },
      { tile: TileName.DECO_BUSH_M, weight: 2 },
      { tile: TileName.DECO_BUSH_L, weight: 1 },
    ],
  },
  {
    count: getQuantityCells(cells, 15),
    weightedTiles: [
      { tile: TileName.DECO_WEED_S, weight: 2 },
      { tile: TileName.DECO_WEED_M, weight: 1 },
    ],
  },
  {
    count: getQuantityCells(cells, 15),
    weightedTiles: [
      { tile: TileName.DECO_BONE_S_RIGHT, weight: 1 },
      { tile: TileName.DECO_BONE_S_LEFT, weight: 1 },
      { tile: TileName.DECO_BONE_M_RIGHT, weight: 1 },
      { tile: TileName.DECO_BONE_M_LEFT, weight: 1 },
    ],
  },
  {
    count: getQuantityCells(cells, 7),
    weightedTiles: [
      { tile: TileName.DECO_SKULL_RIGHT, weight: 1 },
      { tile: TileName.DECO_SKULL_LEFT, weight: 1 },
    ],
  },
  {
    count: getQuantityCells(cells, 1),
    weightedTiles: [
      { tile: TileName.SHEEP_RIGHT, weight: 1 },
      { tile: TileName.SHEEP_LEFT, weight: 1 },
    ],
  }
];

const stonesWeightedTiles = (cells: number) => [
  {
    count: getQuantityCells(cells, 20),
    weightedTiles: [
      { tile: TileName.DECO_STONE_S, weight: 3 },
      { tile: TileName.DECO_STONE_M, weight: 2 },
      { tile: TileName.DECO_STONE_L, weight: 1 },
    ],
  },
  {
    count: getQuantityCells(cells, 3),
    weightedTiles: [
      { tile: TileName.DECO_BUSH_S, weight: 5 },
      { tile: TileName.DECO_BUSH_M, weight: 2 },
      { tile: TileName.DECO_BUSH_L, weight: 1 },
    ],
  },
  {
    count: getQuantityCells(cells, 5),
    weightedTiles: [
      { tile: TileName.DECO_WEED_S, weight: 2 },
      { tile: TileName.DECO_WEED_M, weight: 1 },
    ],
  },
  {
    count: getQuantityCells(cells, 10),
    weightedTiles: [
      { tile: TileName.DECO_BONE_S_RIGHT, weight: 1 },
      { tile: TileName.DECO_BONE_S_LEFT, weight: 1 },
      { tile: TileName.DECO_BONE_M_RIGHT, weight: 1 },
      { tile: TileName.DECO_BONE_M_LEFT, weight: 1 },
    ],
  },
  {
    count: getQuantityCells(cells, 7),
    weightedTiles: [
      { tile: TileName.SHEEP_RIGHT, weight: 1 },
      { tile: TileName.SHEEP_LEFT, weight: 1 },
    ],
  },
];

/**
 * Шаблон для декораций на поверхности
 */
export const decorationsTerrainConditions = (level: LevelType, layers): LayerCondition[] => {
  const layerBoundaryCellsDict = (layer) => createCoordsLayerDict(layer, (tile, boundary) => {
    const isNotTerrain = tile >= TileName.BRIDGE_LEFT;
    return boundary || isNotTerrain
  });
  const layersBoundaryCellsDict = layers.reduce((acc, layer) => ({...acc, ...layerBoundaryCellsDict(layer.array)}), {});
  const availableCells = getShuffleFilterCoords(layers[0], ([x, y]) => !layersBoundaryCellsDict[`${x}-${y}`]);   
  
  let weightedTiles;
  
  switch(level) {
    case LevelType.Ground:
      weightedTiles = groundWeightedTiles(availableCells.length);
      break;
    case LevelType.Sand:
      weightedTiles = sandWeightedTiles(availableCells.length);
      break;
    case LevelType.Stones:
      weightedTiles = stonesWeightedTiles(availableCells.length);
      break;
  }

  return availableCells.length
    ? createLayerConditions(availableCells, weightedTiles)
    : [];
};