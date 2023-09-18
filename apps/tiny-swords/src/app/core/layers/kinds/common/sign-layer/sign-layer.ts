import { signConditions } from "./sign-conditions";
import { Layer } from "../../../../layer/layer";

export class SignLayer {
  constructor(gridX: number, gridY: number, startCoords, endCoords) {
    return new Layer(gridX, gridY).fill([
      signConditions(startCoords, endCoords),
    ]);
  }
}