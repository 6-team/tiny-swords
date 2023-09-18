import { additionalConditions } from "./shadow-conditions";
import { Layer } from "../../../../layer/layer";

export class ShadowLayer {
  constructor(gridX: number, gridY: number, layer) {
    return new Layer(gridX, gridY).fill([additionalConditions(layer)]);
  }
}