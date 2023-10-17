import { Layer } from "../../../layer/layer";
import { elevationConditions } from "./elevation-conditions";

export class ElevationLayer {
  constructor(gridX: number, gridY: number, level, layer) {
    return new Layer(gridX, gridY).fill([
      elevationConditions(level, layer),
    ]);
  }
}