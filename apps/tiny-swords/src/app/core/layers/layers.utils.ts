import { LayerCell, LayerCondition } from "../layer/layer.types";
import { TileName } from "../renderer";

export const randomElement = <T>(array: Array<T>): T => {
  return array[Math.floor(Math.random() * array.length)];
}

export const randomInteger = (min: number, max: number): number => {
  const rand = min + Math.random() * (max + 1 - min);

  return Math.floor(rand);
}

export const weightedRandomElement = (items: [TileName, number][]): TileName => {
  const table = items
    .flatMap(([item, weight]) => Array(weight).fill(item));

  return randomElement(table);
}

/**
 * Создаем рандомно координаты для входа и выхода карты
 * Надо переписать!
 */
export const getStartEndCoords = (gridX, gridY, border): [number, number][] => {
  const TERRAIN_SIZE = 3;
  const startY = randomInteger(border + TERRAIN_SIZE, gridY - border - TERRAIN_SIZE + 1);
  const endY = randomInteger(border + TERRAIN_SIZE, gridY - border - TERRAIN_SIZE);

  return [
    [border + 1, startY],
    [gridX - border - 2, endY],
  ];
}

/**
 * Получения количества ячеек по проценту от общего числа
 * 
 * @param allCells Количество всех ячеек
 * @param percent Процент
 * @returns Количество
 */
export const getQuantityCells = (allCells: number, percent: number) => {
  return Math.floor(allCells / 100 * percent);
}

/**
 * Создание словаря с координатами ячеек
 * 
 * @param layer массив ячеек слоя
 * @param condition условие для добавления координат в словарь
 * @returns 
 */
export const createCoordsLayerDict = (cells: LayerCell[], condition: (tile: TileName, boundary: boolean) => boolean): Record<string, true> => {
  return cells.reduce((acc, { coords, options, boundary }) => {
    if (condition(options[0], boundary)) {
      return {
        ...acc,
        [`${coords[0]}-${coords[1]}`]: true
      }
    }
    return acc;
  }, {});
}

/**
 * Перемешивание массива
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
}

/**
 * Перемешивание и фильтрация массива координат для слоя
 */
export const getShuffleFilterCoords = (layer, condition) => {
  return shuffleArray(
    layer.array
      .map(({ coords }) => coords)
      .filter(condition)
  );
}

export const createLayerConditions = (availableCells, tilesList): LayerCondition[] => {
  const conditions = [];

  let cursor = 0;

  for (let i = 0; i < tilesList.length; i++) {
    const { count, weightedTiles } = tilesList[i];

    for (let j = 0; j < count; j++) {
      const coords = availableCells[cursor];
  
      conditions.push({
        tile: weightedRandomElement(weightedTiles.map(({ tile, weight }) => [tile, weight])),
        coords,
        boundary: false,
      });

      cursor++;
    }
  };

  return conditions;
};