import { Tile } from '@entities/tile';
import { SandType, mapTerrainToCoords } from './sand.const';

/**
 * Represents a tile with a sand entity.
 * @extends Tile
 */
export class SandTile extends Tile<SandType> {
  /**
   * The type of the sand.
   * @type {SandType}
   * @private
   */
  protected _type: SandType;

  /**
   * The sprite URL for the sand.
   * @type {string}
   * @private
   */
  protected _sprite = './img/Terrain/Ground/Tilemap_Flat.png';

  /**
   * Creates an instance of the SandTile.
   * @param {SandTile} type - The type of the sand (default is SandTile.TOP_LEFT).
   */
  constructor(type: SandType = SandType.MIDDLE_MIDDLE) {
    super();

    this.setType(type);
  }

  /**
   * Sets the type of the sand.
   * @param {SandType} type - The type of the sand (default is SandTile.TOP_LEFT).
   */
  setType(type: SandType = SandType.MIDDLE_MIDDLE): void {
    this._type = type;
  }

  /**
   * Gets the coordinates map for sand.
   * @private
   * @returns {Record<SandType, CoordsTuple>} - The map of sand coordinates.
   */
  protected _getCoordsMap() {
    return mapTerrainToCoords;
  }
}
