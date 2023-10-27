import { Tile } from '../tile';
import { RocksType, mapTerrainToCoords } from './rocks.const';

/**
 * Represents a tile with a rocks entity.
 * @extends Tile
 */
export class RocksTile extends Tile<RocksType> {
  /**
   * The type of the rocks.
   * @type {RocksType}
   * @private
   */
  protected _type: RocksType;

  /**
   * The sprite URL for the rocks.
   * @type {string}
   * @private
   */
  protected _sprite:string;

  /**
   * Creates an instance of the RocksTile.
   * @param {RocksTile} type - The type of the rocks (default is RocksTile.ROCKS_M).
   */
  constructor(type: RocksType = RocksType.ROCKS_M) {
    super();

    this.setType(type);
  }

  /**
   * Sets the type of the rocks.
   * @param {RocksType} type - The type of the rocks (default is RocksTile.ROCKS_M).
   */
  setType(type: RocksType = RocksType.ROCKS_M) {
    this._type = type;

    switch (type) {
      case RocksType.ROCKS_S:
        this._sprite = './img/Terrain/Water/Rocks/Rocks_01.png';
        break;
      case RocksType.ROCKS_M:
        this._sprite = './img/Terrain/Water/Rocks/Rocks_02.png';
        break;
      case RocksType.ROCKS_L:
        this._sprite = './img/Terrain/Water/Rocks/Rocks_03.png';
        break;
    }
  }

  /**
   * Gets the coordinates map for rocks.
   * @private
   * @returns {Record<RocksType, CoordsTuple>} - The map of rocks coordinates.
   */
  protected _getCoordsMap() {
    return mapTerrainToCoords;
  }
}
