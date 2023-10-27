import { CoordsTuple, Sprite } from '@entities/sprite';
import { BoundaryType, mapBoundaryToCoords } from './boundary.const';

/**
 * Represents a BoundarySprite, a specific type of Sprite with boundary-related information.
 */
export class BoundarySprite extends Sprite<BoundaryType> {
  /**
   * The type of the boundary sprite.
   */
  protected _type: BoundaryType;

  /**
   * The sprite URL for the boundary sprite.
   */
  protected _sprite = './img/Boundary/Boundary.png';

  /**
   * Creates a new BoundarySprite instance.
   * @param {BoundaryType} type - The type of the boundary sprite (default: BoundaryType.MIDDLE).
   */
  constructor(type: BoundaryType = BoundaryType.MIDDLE) {
    super();
    this.setType(type);
  }

  /**
   * Sets the type of the boundary sprite.
   * @param {BoundaryType} type - The type of the boundary sprite to set (default: BoundaryType.MIDDLE).
   */
  setType(type: BoundaryType = BoundaryType.MIDDLE): void {
    this._type = type;
  }

  /**
   * Retrieves the coordinate mapping for the boundary sprite.
   * @returns {object} A mapping of boundary types to coordinate values.
   */
  protected _getCoordsMap(): Record<BoundaryType, CoordsTuple> {
    return mapBoundaryToCoords;
  }
}
