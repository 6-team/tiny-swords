import { Tile } from '@entities/tile';
import { ElevationType, mapTerrainToCoords } from './elevation.const';

/**
 * Represents an ElevationTile, a specific type of Tile with elevation-related information.
 */
export class ElevationTile extends Tile<ElevationType> {
  /**
   * The type of the elevation tile.
   * @type {ElevationType}
   */
  protected _type: ElevationType;

  /**
   * The sprite URL for the elevation tile.
   * @type {string}
   */
  protected _sprite = './img/Terrain/Ground/Tilemap_Elevation.png';

  /**
   * Creates a new ElevationTile instance.
   * @param {ElevationType} type - The type of the elevation tile (default: ElevationType.MIDDLE_MIDDLE).
   */
  constructor(type: ElevationType = ElevationType.MIDDLE_MIDDLE) {
    super();
    this.setType(type);
  }

  /**
   * Sets the type of the elevation tile.
   * @param {ElevationType} type - The type of the elevation tile to set (default: ElevationType.MIDDLE_MIDDLE).
   * @returns {void}
   */
  setType(type: ElevationType = ElevationType.MIDDLE_MIDDLE): void {
    this._type = type;
  }

  /**
   * Retrieves the coordinate mapping for the elevation tile.
   * @returns {object} A mapping of elevation types to coordinate values.
   */
  protected _getCoordsMap() {
    return mapTerrainToCoords;
  }
}
