import { boundaryConditions } from "./boundary-conditions";
import { Layer } from "@core/layer";

/**
 * Represents a class for creating a boundary layer that defines collisions with static map objects.
 */
export class BoundaryLayer {
  /**
   * Constructs a new boundary layer.
   *
   * @param {number} gridX - The size of the grid by width.
   * @param {number} gridY - The size of the grid by height.
   * @param {Layer[]} layers - An array of layers used to determine boundary conditions.
   * @returns {Layer} - A layer filled with boundary conditions for collisions.
   */
  constructor(gridX: number, gridY: number, layers: Layer[]) {

    return new Layer(gridX, gridY).fill([
      boundaryConditions(layers),
    ]);
  }
}