import { Layer } from "../../../layer/layer";
import { foamConditions } from "./foam-conditions";

export class FoamLayer {
  constructor(gridX: number, gridY: number, layer) {
    return new Layer(gridX, gridY).fill([
      foamConditions(layer)
    ]);
  }
}