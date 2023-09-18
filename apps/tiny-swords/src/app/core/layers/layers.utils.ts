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
 */
export const getStartEndCoords = (gridX, gridY, border, leftSize, rightSize): [number, number][] => {
  // const startX = randomInteger(border, leftSize[0]);
  const startY = randomInteger(border + leftSize[1], gridY - border - leftSize[1]);

  // const endX = randomInteger(gridX - rightSize[0] - border - 1, gridX - border - 1);
  const endY = randomInteger(border + rightSize[1] + 1, gridY - border - rightSize[1]);

  return [
    [border + 1, startY],
    [gridX - border - 2, endY],
  ];
}