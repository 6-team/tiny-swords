import { Sprite } from '@entities/sprite';
import { ElevationType, mapTerrainToCoords } from './elevation.const';

/**
 * Represents an ElevationSprite, a specific type of Sprite with elevation-related information.
 */
export class ElevationSprite extends Sprite<ElevationType> {
  /**
   * The type of the elevation sprite.
   * @type {ElevationType}
   */
  protected _type: ElevationType;

  /**
   * The sprite URL for the elevation sprite.
   * @type {string}
   */
  protected _sprite = './img/Terrain/Ground/Tilemap_Elevation.png';

  /**
   * Creates a new ElevationSprite instance.
   * @param {ElevationType} type - The type of the elevation sprite (default: ElevationType.MIDDLE_MIDDLE).
   */
  constructor(type: ElevationType = ElevationType.MIDDLE_MIDDLE) {
    super();
    this.setType(type);
  }

  /**
   * Sets the type of the elevation sprite.
   * @param {ElevationType} type - The type of the elevation sprite to set (default: ElevationType.MIDDLE_MIDDLE).
   * @returns {void}
   */
  setType(type: ElevationType = ElevationType.MIDDLE_MIDDLE): void {
    this._type = type;
  }

  /**
   * Retrieves the coordinate mapping for the elevation sprite.
   * @returns {object} A mapping of elevation types to coordinate values.
   */
  protected _getCoordsMap() {
    return mapTerrainToCoords;
  }
}
