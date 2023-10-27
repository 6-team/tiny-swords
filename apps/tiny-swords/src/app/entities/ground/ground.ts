import { Sprite } from '@entities/sprite';
import { GroundType, mapTerrainToCoords } from './ground.const';

/**
 * Represents a GroundSprite, a specific type of Sprite with ground-related information.
 */
export class GroundSprite extends Sprite<GroundType> {
  /**
   * The type of the ground sprite.
   * @type {GroundType}
   */
  protected _type: GroundType;

  /**
   * The sprite URL for the ground sprite.
   * @type {string}
   */
  protected _sprite = './img/Terrain/Ground/Tilemap_Flat.png';

  /**
   * Creates a new GroundSprite instance.
   * @param {GroundType} type - The type of the ground sprite (default: GroundType.MIDDLE_MIDDLE).
   */
  constructor(type: GroundType = GroundType.MIDDLE_MIDDLE) {
    super();
    this.setType(type);
  }

  /**
   * Sets the type of the ground sprite.
   * @param {GroundType} type - The type of the ground sprite to set (default: GroundType.MIDDLE_MIDDLE).
   * @returns {void}
   */
  setType(type: GroundType = GroundType.MIDDLE_MIDDLE): void {
    this._type = type;
  }

  /**
   * Retrieves the coordinate mapping for the ground sprite.
   * @returns {object} A mapping of ground types to coordinate values.
   */
  protected _getCoordsMap() {
    return mapTerrainToCoords;
  }
}
