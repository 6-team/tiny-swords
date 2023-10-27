import { CoordsTuple, Sprite } from '@entities/sprite';
import { BridgeType, mapTerrainToCoords } from './bridge.const';

/**
 * Represents a BridgeSprite, a specific type of Sprite with bridge-related information.
 */
export class BridgeSprite extends Sprite<BridgeType> {
  /**
   * The type of the bridge sprite.
   * @type {BridgeType}
   */
  protected _type: BridgeType;

  /**
   * The sprite URL for the bridge sprite.
   * @type {string}
   */
  protected _sprite = './img/Terrain/Bridge/Bridge_All.png';

  /**
   * Creates a new BridgeSprite instance.
   * @param {BridgeType} type - The type of the bridge sprite (default: BridgeType.MIDDLE).
   */
  constructor(type: BridgeType = BridgeType.MIDDLE) {
    super();
    this.setType(type);
  }

  /**
   * Sets the type of the bridge sprite.
   * @param {BridgeType} type - The type of the bridge sprite to set (default: BridgeType.MIDDLE).
   * @returns {void}
   */
  setType(type: BridgeType = BridgeType.MIDDLE): void {
    this._type = type;
  }

  /**
   * Retrieves the coordinate mapping for the bridge sprite.
   * @returns {object} A mapping of bridge types to coordinate values.
   */
  protected _getCoordsMap(): Record<BridgeType, CoordsTuple> {
    return mapTerrainToCoords;
  }
}
