import { Sprite } from '@entities/sprite';
import { HouseType, mapTerrainToCoords } from './house.const';

/**
 * Represents a sprite with a house entity.
 * @extends Sprite
 */
export class HouseSprite extends Sprite<HouseType> {
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
   * Creates an instance of the HouseSprite.
   * @param {HouseSprite} type - The type of the house (default is HouseSprite.TOP_LEFT).
   */
  constructor(type: HouseType = HouseType.TOP_LEFT) {
    super();

    this.setType(type);
  }

  /**
   * Sets the type of the house.
   * @param {HouseType} type - The type of the house (default is HouseSprite.TOP_LEFT).
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
