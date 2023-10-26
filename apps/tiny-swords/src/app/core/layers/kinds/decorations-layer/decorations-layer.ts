import { decorationsTerrainConditions } from "./deco-ground-conditions";
import { Layer } from "@core/layer";
import { LevelType } from "@core/level";
import { decorationsWaterConditions } from "./deco-water-conditions";

/**
 * A class representing a decoration layer that adds decorative elements to the map.
 */
export class DecoLayer {
  /**
   * Creates a new DecoLayer.
   * @param {number} gridX - The width of the grid for the decoration layer.
   * @param {number} gridY - The height of the grid for the decoration layer.
   * @param {LevelType} level - The level type for the decorations.
   * @param {Array<Layer>} layers - An array of layers used for decoration elements.
   */
  constructor(gridX: number, gridY: number, level: LevelType, layers: Layer[]) {
    return new Layer(gridX, gridY).fill([
      decorationsWaterConditions(layers),
      decorationsTerrainConditions(level, layers),
    ]);
  }
}