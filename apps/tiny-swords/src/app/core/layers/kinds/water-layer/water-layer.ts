import { Layer } from "@core/layer";
import { fullWaterConditions } from "./water-conditions";

/**
 * A class representing a layer of water on a grid.
 */
export class WaterLayer {
  /**
   * Creates a new WaterLayer.
   * @param {number} gridX - The width of the grid for the layer.
   * @param {number} gridY - The height of the grid for the layer.
   */
  constructor(gridX: number, gridY: number) {
    const layer = new Layer(gridX, gridY);

    return layer.fill([
      fullWaterConditions(layer)
    ]);
  }
}