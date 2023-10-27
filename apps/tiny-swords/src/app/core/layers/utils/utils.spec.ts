import {
  randomElement,
  randomInteger,
  weightedRandomElement,
  getStartEndCoords,
  getQuantityCells,
  createCoordsLayerDict,
  getShuffleFilterCoords,
  createLayerConditions,
} from './utils';
import { Layer } from '@core/layer';

describe('layers utils testing', () => {
  it('randomElement should return a random element from the array', () => {
    const inputArray = [1, 2, 3, 4, 5];
    const result = randomElement(inputArray);

    expect(inputArray).toContain(result);
  });

  it('randomInteger should return a random integer between the specified range (inclusive)', () => {
    const min = 1;
    const max = 10;
    const result = randomInteger(min, max);

    expect(result).toBeGreaterThanOrEqual(min);
    expect(result).toBeLessThanOrEqual(max);
    expect(Number.isInteger(result)).toBe(true);
  });

  it('weightedRandomElement should return a weighted random element from the array of items', () => {
    const items: any = [
      ['A', 2],
      ['B', 3],
      ['C', 1],
    ];
    const result = weightedRandomElement(items);

    expect(['A', 'B', 'C']).toContain(result);
  });

  it('getStartEndCoords should return an array of starting and ending coordinates', () => {
    const gridX = 10;
    const gridY = 10;
    const border = 1;
    const result = getStartEndCoords(gridX, gridY, border);

    expect(result).toHaveLength(2);
    expect(result[0]).toHaveLength(2);
    expect(result[1]).toHaveLength(2);
    expect(result[0][0]).toBeGreaterThanOrEqual(border + 1);
    expect(result[0][1]).toBeLessThanOrEqual(gridY - border - 2);
    expect(result[1][0]).toBeGreaterThanOrEqual(border + 1);
    expect(result[1][1]).toBeLessThanOrEqual(gridY - border - 2);
  });

  it('getQuantityCells should calculate the quantity of cells based on a percentage', () => {
    const allCells = 100;
    const percent = 25;
    const result = getQuantityCells(allCells, percent);

    expect(result).toBe(25);
  });

  it('createCoordsLayerDict should create a dictionary of coordinates that meet a specified condition', () => {
    const cells: any = [
      { coords: [1, 1], options: ['A'], boundary: false },
      { coords: [2, 2], options: ['B'], boundary: false },
      { coords: [3, 3], options: ['A'], boundary: true },
    ];
    const condition = (tile, boundary) => tile === 'A' && !boundary;
    const result = createCoordsLayerDict(cells, condition);

    expect(result).toStrictEqual({ '1-1': true });
  });

  it('getShuffleFilterCoords should shuffle and filter coordinates based on a specified condition', () => {
    const layer = new Layer(5, 5);
    const condition = ([x, y]) => x % 2 === 0 && y % 2 === 0;
    const result = getShuffleFilterCoords(layer, condition);

    expect(result).not.toStrictEqual(layer.array.map((cell) => cell.coords));

    result.forEach((coords) => expect(condition(coords)).toBe(true));
  });

  it('createLayerConditions should create an array of layer conditions for tile placement', () => {
    const availableCells = [
      [1, 1],
      [2, 2],
      [3, 3],
    ];
    const tilesList = [
      {
        count: 2,
        weightedTiles: [
          ['A', 2],
          ['B', 3],
        ],
      },
      { count: 1, weightedTiles: [['C', 1]] },
    ];
    const result = createLayerConditions(availableCells, tilesList);

    expect(result).toHaveLength(3);
  });
});
