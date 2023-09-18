import { Layers } from "../layers/layers";
import { SIZE_X, SIZE_Y } from "./level.const";

export const enum LevelType {
  Ground,
	Sand,
}

export class Level {
  #levelCounter = 1;

  next() {
    console.time();

    const currentLevelType = LevelType.Ground;
    const nextLevelType = LevelType.Sand;

    const {
      gridX,
      gridY,
      startCoords,
      endCoords,
      maps,
      boundaries,
    } = new Layers(currentLevelType, nextLevelType, SIZE_X, SIZE_Y);

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