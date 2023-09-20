import { boundaryConditions } from "./boundary-conditions";
import { Layer } from "../../../../layer/layer";

export class BoundaryLayer {
  constructor(gridX: number, gridY: number, layers) {

    return new Layer(gridX, gridY).fill([
      boundaryConditions(layers),
    ]);
  }
}