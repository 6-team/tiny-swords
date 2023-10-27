import { Sprite, CoordsTuple } from '@entities/sprite';
import { FoamType, mapTerrainToCoords } from './foam.const';

/**
 * Represents a FoamSprite, a specific type of Sprite with foam-related information.
 */
export class FoamSprite extends Sprite<FoamType> {
  /**
   * The type of the foam sprite.
   * @type {FoamType}
   */
  protected _type: FoamType;

  /**
   * The sprite URL for the foam sprite.
   * @type {string}
   */
  protected _sprite = './img/Terrain/Water/Foam/Foam.png';

  /**
   * Creates a new FoamSprite instance.
   * @param {FoamType} type - The type of the foam sprite (default: FoamType.MIDDLE).
   */
  constructor(type: FoamType = FoamType.MIDDLE) {
    super();
    this.setType(type);
  }

  /**
   * Sets the type of the foam sprite.
   * @param {FoamType} type - The type of the foam sprite to set (default: FoamType.MIDDLE).
   * @returns {void}
   */
  setType(type: FoamType = FoamType.MIDDLE): void {
    this._type = type;
  }

  /**
   * Retrieves the coordinate mapping for the foam sprite.
   * @returns {object} A mapping of foam types to coordinate values.
   */
  protected _getCoordsMap(): Record<FoamType, CoordsTuple> {
    return mapTerrainToCoords;
  }
}
