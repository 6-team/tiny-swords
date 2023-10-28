import { CoordsTuple, Sprite } from '@entities/sprite';

import { WaterType, mapWaterToCoords } from './water.const';

/**
 * Represents a sprite with a water entity.
 * @extends Sprite
 */
export class WaterSprite extends Sprite<WaterType> {
  /**
   * The type of the water.
   * @type {WaterType}
   * @private
   */
  protected _type: WaterType;

  /**
   * The sprite URL for the water.
   * @type {string}
   * @private
   */
  protected _sprite = './img/Terrain/Water/Water.png';

  /**
   * Creates an instance of the WaterSprite.
   * @param {WaterType} type - The type of the water (default is WaterType.MIDDLE_MIDDLE).
   */
  constructor(type = WaterType.MIDDLE_MIDDLE) {
    super();

    this.setType(type);
  }

  /**
   * Sets the type of the water.
   * @param {WaterType} type - The type of the water (default is WaterType.MIDDLE_MIDDLE).
   */
  setType(type = WaterType.MIDDLE_MIDDLE): void {
    this._type = type;
  }

  /**
   * Gets the coordinates map for water.
   * @private
   * @returns {Record<WaterType, CoordsTuple>} - The map of water coordinates.
   */
  protected _getCoordsMap(): Record<WaterType, CoordsTuple> {
    return mapWaterToCoords;
  }
}
