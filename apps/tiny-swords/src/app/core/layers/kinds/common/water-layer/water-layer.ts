import { Layer } from "../../../../layer/layer";
import { fullWaterConditions } from "./water-conditions";

export class WaterLayer {
  constructor(gridX: number, gridY: number) {
    const layer = new Layer(gridX, gridY);

    return layer.fill([
      fullWaterConditions(layer)
    ]);
  }
}