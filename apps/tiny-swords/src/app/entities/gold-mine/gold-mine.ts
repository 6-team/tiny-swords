import { Sprite, CoordsTuple } from '@entities/sprite';
import { GoldMineType, mapTerrainToCoords } from './gold-mine.const';

/**
 * Represents a GoldMineSprite, a specific type of Sprite with gold mine-related information.
 */
export class GoldMineSprite extends Sprite<GoldMineType> {
  /**
   * The type of the gold mine sprite.
   * @type {GoldMineType}
   */
  protected _type: GoldMineType;

  /**
   * The sprite URL for the gold mine sprite.
   * @type {string}
   */
  protected _sprite = './img/Resources/Gold_mine/GoldMine_Inactive.png';

  /**
   * Creates a new GoldMineSprite instance.
   * @param {GoldMineType} type - The type of the gold mine sprite (default: GoldMineType.TOP_LEFT).
   */
  constructor(type: GoldMineType = GoldMineType.TOP_LEFT) {
    super();
    this.setType(type);
  }

  /**
   * Sets the type of the gold mine sprite.
   * @param {GoldMineType} type - The type of the gold mine sprite to set (default: GoldMineType.TOP_LEFT).
   * @returns {void}
   */
  setType(type: GoldMineType = GoldMineType.TOP_LEFT): void {
    this._type = type;
  }

  /**
   * Retrieves the coordinate mapping for the gold mine sprite.
   * @returns {object} A mapping of gold mine types to coordinate values.
   */
  protected _getCoordsMap(): Record<GoldMineType, CoordsTuple> {
    return mapTerrainToCoords;
  }
}
