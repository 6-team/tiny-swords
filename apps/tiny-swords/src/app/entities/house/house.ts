import { Tile } from '@entities/tile';
import { HouseType, mapTerrainToCoords } from './house.const';

/**
 * Represents a tile with a house entity.
 * @extends Tile
 */
export class HouseTile extends Tile<HouseType> {
  /**
   * The type of the house.
   * @type {HouseType}
   * @private
   */
  protected _type: HouseType;

  /**
   * The sprite URL for the house.
   * @type {string}
   * @private
   */
  protected _sprite = './img/Factions/Knights/Buildings/House/House_Blue.png';

  /**
   * Creates an instance of the HouseTile.
   * @param {HouseTile} type - The type of the house (default is HouseTile.TOP_LEFT).
   */
  constructor(type: HouseType = HouseType.TOP_LEFT) {
    super();

    this.setType(type);
  }

  /**
   * Sets the type of the house.
   * @param {HouseType} type - The type of the house (default is HouseTile.TOP_LEFT).
   */
  setType(type: HouseType = HouseType.TOP_LEFT): void {
    this._type = type;
  }

  /**
   * Gets the coordinates map for house.
   * @private
   * @returns {Record<HouseType, CoordsTuple>} - The map of house coordinates.
   */
  protected _getCoordsMap() {
    return mapTerrainToCoords;
  }
}
