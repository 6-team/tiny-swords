/* eslint-disable @typescript-eslint/no-unused-vars */
import { SpriteName } from '@core/renderer';
import { Layer } from '@core/layer';
import { createCoordsLayerDict, createLayerConditions, getQuantityCells, getShuffleFilterCoords } from '@core/layers';
import { LayerCondition } from '@core/layer';
import { LevelType } from '@core/level';

const groundWeightedSprites = (cells: number) => [
  {
    count: getQuantityCells(cells, 15),
    weightedSprites: [
      { sprite: SpriteName.DECO_MUSHROOM_S, weight: 5 },
      { sprite: SpriteName.DECO_MUSHROOM_M, weight: 2 },
      { sprite: SpriteName.DECO_MUSHROOM_L, weight: 1 },
    ],
  },
  {
    count: getQuantityCells(cells, 15),
    weightedSprites: [
      { sprite: SpriteName.DECO_BUSH_S, weight: 5 },
      { sprite: SpriteName.DECO_BUSH_M, weight: 2 },
      { sprite: SpriteName.DECO_BUSH_L, weight: 1 },
    ],
  },
  {
    count: getQuantityCells(cells, 3),
    weightedSprites: [
      { sprite: SpriteName.DECO_PUMPKIN_S, weight: 3 },
      { sprite: SpriteName.DECO_PUMPKIN_M, weight: 1 },
    ],
  },
  {
    count: getQuantityCells(cells, 10),
    weightedSprites: [
      { sprite: SpriteName.DECO_WEED_S, weight: 2 },
      { sprite: SpriteName.DECO_WEED_M, weight: 1 },
    ],
  },
  {
    count: getQuantityCells(cells, 1),
    weightedSprites: [
      { sprite: SpriteName.SHEEP_RIGHT, weight: 1 },
      { sprite: SpriteName.SHEEP_LEFT, weight: 1 },
    ],
  },
];

const sandWeightedSprites = (cells: number) => [
  {
    count: getQuantityCells(cells, 5),
    weightedSprites: [
      { sprite: SpriteName.DECO_BUSH_S, weight: 5 },
      { sprite: SpriteName.DECO_BUSH_M, weight: 2 },
      { sprite: SpriteName.DECO_BUSH_L, weight: 1 },
    ],
  },
  {
    count: getQuantityCells(cells, 15),
    weightedSprites: [
      { sprite: SpriteName.DECO_WEED_S, weight: 2 },
      { sprite: SpriteName.DECO_WEED_M, weight: 1 },
    ],
  },
  {
    count: getQuantityCells(cells, 15),
    weightedSprites: [
      { sprite: SpriteName.DECO_BONE_S_RIGHT, weight: 1 },
      { sprite: SpriteName.DECO_BONE_S_LEFT, weight: 1 },
      { sprite: SpriteName.DECO_BONE_M_RIGHT, weight: 1 },
      { sprite: SpriteName.DECO_BONE_M_LEFT, weight: 1 },
    ],
  },
  {
    count: getQuantityCells(cells, 7),
    weightedSprites: [
      { sprite: SpriteName.DECO_SKULL_RIGHT, weight: 1 },
      { sprite: SpriteName.DECO_SKULL_LEFT, weight: 1 },
    ],
  },
  {
    count: getQuantityCells(cells, 1),
    weightedSprites: [
      { sprite: SpriteName.SHEEP_RIGHT, weight: 1 },
      { sprite: SpriteName.SHEEP_LEFT, weight: 1 },
    ],
  },
];

const stonesWeightedSprites = (cells: number) => [
  {
    count: getQuantityCells(cells, 20),
    weightedSprites: [
      { sprite: SpriteName.DECO_STONE_S, weight: 3 },
      { sprite: SpriteName.DECO_STONE_M, weight: 2 },
      { sprite: SpriteName.DECO_STONE_L, weight: 1 },
    ],
  },
  {
    count: getQuantityCells(cells, 3),
    weightedSprites: [
      { sprite: SpriteName.DECO_BUSH_S, weight: 5 },
      { sprite: SpriteName.DECO_BUSH_M, weight: 2 },
      { sprite: SpriteName.DECO_BUSH_L, weight: 1 },
    ],
  },
  {
    count: getQuantityCells(cells, 5),
    weightedSprites: [
      { sprite: SpriteName.DECO_WEED_S, weight: 2 },
      { sprite: SpriteName.DECO_WEED_M, weight: 1 },
    ],
  },
  {
    count: getQuantityCells(cells, 10),
    weightedSprites: [
      { sprite: SpriteName.DECO_BONE_S_RIGHT, weight: 1 },
      { sprite: SpriteName.DECO_BONE_S_LEFT, weight: 1 },
      { sprite: SpriteName.DECO_BONE_M_RIGHT, weight: 1 },
      { sprite: SpriteName.DECO_BONE_M_LEFT, weight: 1 },
    ],
  },
  {
    count: getQuantityCells(cells, 7),
    weightedSprites: [
      { sprite: SpriteName.SHEEP_RIGHT, weight: 1 },
      { sprite: SpriteName.SHEEP_LEFT, weight: 1 },
    ],
  },
];

/**
 * Create a dictionary of boundary cells based on a layer.
 *
 * @param {Layer} layer - The layer to analyze.
 * @returns {Object} A dictionary of boundary cells.
 */
const layerBoundaryCellsDict = (layer) =>
  createCoordsLayerDict(layer, (sprite, boundary) => {
    const isNotTerrain = sprite >= SpriteName.BRIDGE_LEFT;
    return boundary || isNotTerrain;
  });

/**
 * Generate terrain decoration conditions based on the level and available cells.
 *
 * @param {LevelType} level - The level type for the decorations.
 * @param {Array<Layer>} layers - An array of layers used for decoration elements.
 * @returns {Array<LayerCondition>} An array of decoration conditions for the terrain.
 */
export const decorationsTerrainConditions = (level: LevelType, layers: Layer[]): LayerCondition[] => {
  const layersBoundaryCellsDict = layers.reduce(
    (acc, layer) => ({ ...acc, ...layerBoundaryCellsDict(layer.array) }),
    {},
  );
  const availableCells = getShuffleFilterCoords(layers[0], ([x, y]) => !layersBoundaryCellsDict[`${x}-${y}`]);

  let weightedSprites;

  switch (level) {
    case LevelType.Ground:
      weightedSprites = groundWeightedSprites(availableCells.length);
      break;
    case LevelType.Sand:
      weightedSprites = sandWeightedSprites(availableCells.length);
      break;
    case LevelType.Stones:
      weightedSprites = stonesWeightedSprites(availableCells.length);
      break;
  }

  return availableCells.length ? createLayerConditions(availableCells, weightedSprites) : [];
};
