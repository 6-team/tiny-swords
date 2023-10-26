import { CoordsTuple, Tile } from '@entities/tile';

import { TowerType, mapTerrainToCoords } from './tower.const';

/**
 * Represents a tile with a tower entity.
 *
 * @extends Tile
 */
export class TowerTile extends Tile<TowerType> {
  /**
   * The type of the tower.
   * @protected
   * @type {TowerType}
   */
  protected _type: TowerType;

  /**
   * The sprite URL for the tower tile.
   * @protected
   * @type {string}
   */
  protected _sprite = './img/Factions/Knights/Buildings/Tower/Tower_Blue.png';

  /**
   * Creates a new `TowerTile` instance with the specified type.
   *
   * @param {TowerType} type - The type of the tower tile.
   */
  constructor(type: TowerType = TowerType.TOP_LEFT) {
    super();

    this.setType(type);
  }

  /**
   * Sets the type of the tower.
   *
   * @param {TowerType} type - The type of the tower.
   */
  setType(type: TowerType = TowerType.TOP_LEFT): void {
    this._type = type;
  }

  /**
   * Gets the coordinates map for tower tiles.
   * @protected
   * @returns {Record<T, CoordsTuple>} - The coordinates map.
   */
  protected _getCoordsMap(): Record<TowerType, CoordsTuple> {
    return mapTerrainToCoords;
  }
}
