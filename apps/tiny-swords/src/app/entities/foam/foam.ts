import { Tile, CoordsTuple } from '@entities/tile';
import { FoamType, mapTerrainToCoords } from './foam.const';

/**
 * Represents a FoamTile, a specific type of Tile with foam-related information.
 */
export class FoamTile extends Tile<FoamType> {
  /**
   * The type of the foam tile.
   * @type {FoamType}
   */
  protected _type: FoamType;

  /**
   * The sprite URL for the foam tile.
   * @type {string}
   */
  protected _sprite = './img/Terrain/Water/Foam/Foam.png';

  /**
   * Creates a new FoamTile instance.
   * @param {FoamType} type - The type of the foam tile (default: FoamType.MIDDLE).
   */
  constructor(type: FoamType = FoamType.MIDDLE) {
    super();
    this.setType(type);
  }

  /**
   * Sets the type of the foam tile.
   * @param {FoamType} type - The type of the foam tile to set (default: FoamType.MIDDLE).
   * @returns {void}
   */
  setType(type: FoamType = FoamType.MIDDLE): void {
    this._type = type;
  }

  /**
   * Retrieves the coordinate mapping for the foam tile.
   * @returns {object} A mapping of foam types to coordinate values.
   */
  protected _getCoordsMap(): Record<FoamType, CoordsTuple> {
    return mapTerrainToCoords;
  }
}
