import { signConditions } from "./sign-conditions";
import { Layer } from "../../../layer/layer";

/**
 * A class representing a layer for signs.
 */
export class SignLayer {
  /**
   * Creates a new SignLayer.
   * @param {number} gridX - The width of the grid for the sign layer.
   * @param {number} gridY - The height of the grid for the sign layer.
   * @param {any} startCoords - The starting coordinates for the signs.
   * @param {any} endCoords - The ending coordinates for the signs.
   */
  constructor(gridX: number, gridY: number, startCoords, endCoords) {
    return new Layer(gridX, gridY).fill([
      signConditions(startCoords, endCoords),
    ]);
  }
}