import { decorationsTerrainConditions, decorationsWaterConditions } from "./decorations-conditions";
import { Layer } from "../../../../layer/layer";

export class DecoLayer {
  constructor(gridX: number, gridY: number, currentLevelType, layer) {
    return new Layer(gridX, gridY).fill([
      decorationsWaterConditions(layer),
      decorationsTerrainConditions(currentLevelType, layer),
    ]);
  }
}