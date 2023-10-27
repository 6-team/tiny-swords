import { CoordsTuple, Tile } from '@entities/tile';
import { BridgeType, mapTerrainToCoords } from './bridge.const';

/**
 * Represents a BridgeTile, a specific type of Tile with bridge-related information.
 */
export class BridgeTile extends Tile<BridgeType> {
  /**
   * The type of the bridge tile.
   * @type {BridgeType}
   */
  protected _type: BridgeType;

  /**
   * The sprite URL for the bridge tile.
   * @type {string}
   */
  protected _sprite = './img/Terrain/Bridge/Bridge_All.png';

  /**
   * Creates a new BridgeTile instance.
   * @param {BridgeType} type - The type of the bridge tile (default: BridgeType.MIDDLE).
   */
  constructor(type: BridgeType = BridgeType.MIDDLE) {
    super();
    this.setType(type);
  }

  /**
   * Sets the type of the bridge tile.
   * @param {BridgeType} type - The type of the bridge tile to set (default: BridgeType.MIDDLE).
   * @returns {void}
   */
  setType(type: BridgeType = BridgeType.MIDDLE): void {
    this._type = type;
  }

  /**
   * Retrieves the coordinate mapping for the bridge tile.
   * @returns {object} A mapping of bridge types to coordinate values.
   */
  protected _getCoordsMap(): Record<BridgeType, CoordsTuple> {
    return mapTerrainToCoords;
  }
}
