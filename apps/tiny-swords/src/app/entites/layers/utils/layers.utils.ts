import { TileName } from "../../renderer/renderer.const";

export const randomElement = <T>(array: Array<T>): T => {
  return array[Math.floor(Math.random() * array.length)];
}

export const randomInteger = (min: number, max: number): number => {
  const rand = min + Math.random() * (max + 1 - min);

  return Math.floor(rand);
}

export const weightedRandomElement = (items: [TileName, number][]) => {
  const table = items
    .flatMap(([item, weight]) => Array(weight).fill(item));
  
  return randomElement(table);
}