import { Layer } from "../../../layer/layer";
import { shadowConditions } from "./shadow-conditions";

export class ShadowLayer {
  constructor(gridX: number, gridY: number, level, layer) {
    return new Layer(gridX, gridY).fill([
      shadowConditions(level, layer),
    ]);
  }
}