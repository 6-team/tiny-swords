import { Layer } from "../../../layer/layer";
import { shadowConditions } from "./shadow-conditions";

/**
 * A class representing a layer for shadows.
 */
export class ShadowLayer {
  /**
   * Creates a new ShadowLayer.
   * @param {number} gridX - The width of the grid for the shadow layer.
   * @param {number} gridY - The height of the grid for the shadow layer.
   * @param {number} level - The level or intensity of shadows.
   * @param {Layer} layer - The base layer to apply shadows to.
   */
  constructor(gridX: number, gridY: number, level, layer) {
    return new Layer(gridX, gridY).fill([
      shadowConditions(level, layer),
    ]);
  }
}