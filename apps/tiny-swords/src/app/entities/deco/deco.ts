import { CoordsTuple, Sprite } from '@entities/sprite';
import { DecoType, mapTerrainToCoords } from './deco.const';

/**
 * Represents a DecoSprite, a specific type of Sprite with decoration-related information.
 */
export class DecoSprite extends Sprite<DecoType> {
  /**
   * The type of the decoration sprite.
   * @type {DecoType}
   */
  protected _type: DecoType;

  /**
   * The sprite URL for the decoration sprite.
   * @type {string}
   */
  protected _sprite: string;

  /**
   * Creates a new DecoSprite instance.
   * @param {DecoType} type - The type of the decoration sprite (default: DecoType.MUSHROOM_M).
   */

  constructor(type: DecoType = DecoType.MUSHROOM_M) {
    super();

    this.setType(type);
  }

  /**
   * Sets the type of the decoration sprite and determines the corresponding sprite URL.
   * @param {DecoType} type - The type of the decoration sprite to set (default: DecoType.MUSHROOM_M).
   * @returns {void}
   */
  setType(type: DecoType = DecoType.MUSHROOM_M): void {
    this._type = type;

    switch (type) {
      case DecoType.MUSHROOM_S:
        this._sprite = './img/Deco/01.png';
        break;
      case DecoType.MUSHROOM_M:
        this._sprite = './img/Deco/02.png';
        break;
      case DecoType.MUSHROOM_L:
        this._sprite = './img/Deco/03.png';
        break;

      case DecoType.STONE_S:
        this._sprite = './img/Deco/04.png';
        break;
      case DecoType.STONE_M:
        this._sprite = './img/Deco/05.png';
        break;
      case DecoType.STONE_L:
        this._sprite = './img/Deco/06.png';
        break;

      case DecoType.BUSH_S:
        this._sprite = './img/Deco/07.png';
        break;
      case DecoType.BUSH_M:
        this._sprite = './img/Deco/08.png';
        break;
      case DecoType.BUSH_L:
        this._sprite = './img/Deco/09.png';
        break;

      case DecoType.WEED_S:
        this._sprite = './img/Deco/10.png';
        break;
      case DecoType.WEED_M:
        this._sprite = './img/Deco/11.png';
        break;

      case DecoType.PUMPKIN_S:
        this._sprite = './img/Deco/12.png';
        break;
      case DecoType.PUMPKIN_M:
        this._sprite = './img/Deco/13.png';
        break;

      case DecoType.BONE_S_RIGHT:
      case DecoType.BONE_S_LEFT:
        this._sprite = './img/Deco/15.png';
        break;
      case DecoType.BONE_M_RIGHT:
      case DecoType.BONE_M_LEFT:
        this._sprite = './img/Deco/14.png';
        break;

      case DecoType.SIGN_STOP_TOP:
      case DecoType.SIGN_STOP_BOTTOM:
        this._sprite = './img/Deco/16.png';
        break;
      case DecoType.SIGH_RIGHT_TOP:
      case DecoType.SIGH_RIGHT_BOTTOM:
        this._sprite = './img/Deco/17.png';
        break;

      case DecoType.SCARECROW:
        this._sprite = './img/Deco/18.png';
        break;

      case DecoType.SKULL_RIGHT:
      case DecoType.SKULL_LEFT:
        this._sprite = './img/Deco/19.png';
        break;
    }
  }

  /**
   * Retrieves the coordinate mapping for the decoration sprite.
   * @returns {object} A mapping of decoration types to coordinate values.
   */
  protected _getCoordsMap(): Record<DecoType, CoordsTuple> {
    return mapTerrainToCoords;
  }
}
