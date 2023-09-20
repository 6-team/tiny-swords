import { Layers } from "../layers/layers";
import { randomElement } from "../layers/layers.utils";
import { SIZE_X, SIZE_Y } from "./level.const";

export const enum LevelType {
  Ground,
	Sand,
}

export class Level {
  #levelCounter = 1;

  next() {
    console.time();

    const currentLevelType = randomElement([LevelType.Ground, LevelType.Sand]);
    const nextLevelType = randomElement([LevelType.Ground, LevelType.Sand]);
    const border = randomElement([1, 2]);
    
    const {
      gridX,
      gridY,
      startCoords,
      endCoords,
      maps,
      boundaries,
    } = new Layers(currentLevelType, nextLevelType, SIZE_X, SIZE_Y, border);

    console.timeEnd();

    return {
      gridX,
      gridY,
      startCoords,
      endCoords,
      maps,
      boundaries,
    };
  }
}