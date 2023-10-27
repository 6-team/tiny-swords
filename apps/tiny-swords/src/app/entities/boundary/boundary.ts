import { CoordsTuple, Tile } from '@entities/tile';
import { BoundaryType, mapBoundaryToCoords } from './boundary.const';

/**
 * Represents a BoundaryTile, a specific type of Tile with boundary-related information.
 */
export class BoundaryTile extends Tile<BoundaryType> {
  /**
   * The type of the boundary tile.
   */
  protected _type: BoundaryType;

  /**
   * The sprite URL for the boundary tile.
   */
  protected _sprite = './img/Boundary/Boundary.png';

  /**
   * Creates a new BoundaryTile instance.
   * @param {BoundaryType} type - The type of the boundary tile (default: BoundaryType.MIDDLE).
   */
  constructor(type: BoundaryType = BoundaryType.MIDDLE) {
    super();
    this.setType(type);
  }

  /**
   * Sets the type of the boundary tile.
   * @param {BoundaryType} type - The type of the boundary tile to set (default: BoundaryType.MIDDLE).
   */
  setType(type: BoundaryType = BoundaryType.MIDDLE): void {
    this._type = type;
  }

  /**
   * Retrieves the coordinate mapping for the boundary tile.
   * @returns {object} A mapping of boundary types to coordinate values.
   */
  protected _getCoordsMap(): Record<BoundaryType, CoordsTuple> {
    return mapBoundaryToCoords;
  }
}
