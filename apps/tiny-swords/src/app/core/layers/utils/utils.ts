import { Layer } from '@core/layer';
import { LayerCell, LayerCondition } from '@core/layer';
import { SpriteName } from '@core/renderer';

/**
 * Returns a random element from an array.
 *
 * @template T
 * @param {Array<T>} array - The input array from which to select a random element.
 * @returns {T} - A random element from the input array.
 */
export const randomElement = <T>(array: Array<T>): T => {
  return array[Math.floor(Math.random() * array.length)];
};

/**
 * Generates a random integer between a specified range (inclusive).
 *
 * @param {number} min - The minimum value of the range (inclusive).
 * @param {number} max - The maximum value of the range (inclusive).
 * @returns {number} - A random integer between `min` and `max`, inclusive.
 */
export const randomInteger = (min: number, max: number): number => {
  const rand = min + Math.random() * (max + 1 - min);

  return Math.floor(rand);
};

/**
 * Randomly selects an element from an array of items with weighted probabilities.
 *
 * @param {[SpriteName, number, boolean?][]} items - An array of items, each represented as [element, weight, boundary?].
 * @returns {SpriteName} - A randomly selected element based on weights.
 */
export const weightedRandomElement = (items: [SpriteName, number, boolean?][]): SpriteName => {
  const table = items.flatMap(([item, weight]) => Array(weight).fill(item));

  return randomElement(table);
};

/**
 * Generates random starting and ending coordinates for a level within the specified grid.
 *
 * @param {number} gridX - The width of the grid.
 * @param {number} gridY - The height of the grid.
 * @param {number} border - The size of the border around the grid.
 * @returns {[number, number][]} - An array of starting and ending coordinates.
 */
export const getStartEndCoords = (gridX: number, gridY: number, border: number): [number, number][] => {
  const TERRAIN_SIZE = 3;
  const startY = randomInteger(border + TERRAIN_SIZE, gridY - border - TERRAIN_SIZE + 1);
  const endY = randomInteger(border + TERRAIN_SIZE, gridY - border - TERRAIN_SIZE);

  return [
    [border + 1, startY],
    [gridX - border - 2, endY],
  ];
};

/**
 * Calculates the quantity of cells based on a percentage of the total cells.
 *
 * @param {number} allCells - The total number of cells.
 * @param {number} percent - The percentage of cells to calculate.
 * @returns {number} - The calculated quantity of cells.
 */
export const getQuantityCells = (allCells: number, percent: number): number => {
  return Math.floor((allCells / 100) * percent);
};

/**
 * Creates a dictionary of coordinates for cells that meet a specified condition.
 *
 * @param {LayerCell[]} cells - An array of layer cells to evaluate.
 * @param {function} condition - A condition function that takes a sprite name and boundary flag.
 * @returns {Record<string, true>} - A dictionary of coordinates where the condition is met.
 */
export const createCoordsLayerDict = (
  cells: LayerCell[],
  condition: (sprite: SpriteName, boundary: boolean) => boolean,
): Record<string, true> => {
  return cells.reduce((acc, { coords, options, boundary }) => {
    if (condition(options[0], boundary)) {
      return {
        ...acc,
        [`${coords[0]}-${coords[1]}`]: true,
      };
    }
    return acc;
  }, {});
};

/**
 * Shuffles the elements in an array randomly.
 *
 * @template T
 * @param {Array<T>} array - The input array to shuffle.
 * @returns {Array<T>} - The shuffled array.
 */
const shuffleArray = <T>(array: Array<T>): Array<T> => {
  let currentIndex = array.length;
  let temporaryValue;
  let randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};

/**
 * Shuffles and filters coordinates from a layer based on a specified condition.
 *
 * @param {Layer} layer - The layer from which to extract coordinates.
 * @param {function} condition - A condition function to filter coordinates.
 * @returns {Array<[number, number]>} - An array of shuffled and filtered coordinates.
 */
export const getShuffleFilterCoords = (
  layer: Layer,
  condition: (coords: [number, number]) => boolean,
): Array<[number, number]> => {
  return shuffleArray(layer.array.map(({ coords }) => coords).filter(condition));
};

/**
 * Creates an array of layer conditions for filling a layer with sprites.
 *
 * @param {Array<[number, number]>} availableCells - An array of available cell coordinates.
 * @param {Array<{ count: number, weightedSprites: Array<{ sprite: SpriteName, weight: number }> }>} spritesList - A list of sprites with counts and weights.
 * @returns {Array<LayerCondition>} - An array of layer conditions for sprite placement.
 */
export const createLayerConditions = (availableCells, spritesList): LayerCondition[] => {
  const conditions = [];

  let cursor = 0;

  for (let i = 0; i < spritesList.length; i++) {
    const { count, weightedSprites } = spritesList[i];

    for (let j = 0; j < count; j++) {
      const coords = availableCells[cursor];

      conditions.push({
        sprite: weightedRandomElement(weightedSprites.map(({ sprite, weight }) => [sprite, weight])),
        coords,
        boundary: false,
      });

      cursor++;
    }
  }

  return conditions;
};
