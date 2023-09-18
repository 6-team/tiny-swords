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
 * Перемешивание массива
 */
export const shuffleArray = <T>(array: Array<T>): Array<T> => {
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