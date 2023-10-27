import { Tile, CoordsTuple } from '@entities/tile';
import { GoldMineType, mapTerrainToCoords } from './gold-mine.const';

/**
 * Represents a GoldMineTile, a specific type of Tile with gold mine-related information.
 */
export class GoldMineTile extends Tile<GoldMineType> {
  /**
   * The type of the gold mine tile.
   * @type {GoldMineType}
   */
  protected _type: GoldMineType;

  /**
   * The sprite URL for the gold mine tile.
   * @type {string}
   */
  protected _sprite = './img/Resources/Gold_mine/GoldMine_Inactive.png';

  /**
   * Creates a new GoldMineTile instance.
   * @param {GoldMineType} type - The type of the gold mine tile (default: GoldMineType.TOP_LEFT).
   */
  constructor(type: GoldMineType = GoldMineType.TOP_LEFT) {
    super();
    this.setType(type);
  }

  /**
   * Sets the type of the gold mine tile.
   * @param {GoldMineType} type - The type of the gold mine tile to set (default: GoldMineType.TOP_LEFT).
   * @returns {void}
   */
  setType(type: GoldMineType = GoldMineType.TOP_LEFT): void {
    this._type = type;
  }

  /**
   * Retrieves the coordinate mapping for the gold mine tile.
   * @returns {object} A mapping of gold mine types to coordinate values.
   */
  protected _getCoordsMap(): Record<GoldMineType, CoordsTuple> {
    return mapTerrainToCoords;
  }
}
