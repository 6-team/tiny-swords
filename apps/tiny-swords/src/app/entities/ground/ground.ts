import { Tile } from '@entities/tile';
import { GroundType, mapTerrainToCoords } from './ground.const';

/**
 * Represents a GroundTile, a specific type of Tile with ground-related information.
 */
export class GroundTile extends Tile<GroundType> {
  /**
   * The type of the ground tile.
   * @type {GroundType}
   */
  protected _type: GroundType;

  /**
   * The sprite URL for the ground tile.
   * @type {string}
   */
  protected _sprite = './img/Terrain/Ground/Tilemap_Flat.png';

  /**
   * Creates a new GroundTile instance.
   * @param {GroundType} type - The type of the ground tile (default: GroundType.MIDDLE_MIDDLE).
   */
  constructor(type: GroundType = GroundType.MIDDLE_MIDDLE) {
    super();
    this.setType(type);
  }

  /**
   * Sets the type of the ground tile.
   * @param {GroundType} type - The type of the ground tile to set (default: GroundType.MIDDLE_MIDDLE).
   * @returns {void}
   */
  setType(type: GroundType = GroundType.MIDDLE_MIDDLE): void {
    this._type = type;
  }

  /**
   * Retrieves the coordinate mapping for the ground tile.
   * @returns {object} A mapping of ground types to coordinate values.
   */
  protected _getCoordsMap() {
    return mapTerrainToCoords;
  }
}
