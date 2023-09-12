import { Tile } from '../tile/tile';
import { DecoAnimation, DecoType, mapTerrainToCoords } from './deco.const';

export class DecoTile extends Tile<DecoType> {
  protected _type: DecoType;
  protected _sprite;

  constructor(type: DecoType = DecoType.MUSHROOM_M) {
    super();
    this.setType(type);
  }

  /**
   * Метод временно здесь, пока не появился отдельный класс персонажа
   */
  // setAnimation(next: DecoAnimation) {
  //   if (next === DecoAnimation.WEAK_ATTACK) {
  //     alert(`ATTACK! ${DecoAnimation.WEAK_ATTACK}`);
  //   } else if (next === DecoAnimation.STRONG_ATTACK) {
  //     alert(`ATTACK! ${DecoAnimation.STRONG_ATTACK}`);
  //   } else if (next === DecoAnimation.FORWARD) {
  //     this.setType(DecoType.PUMPKIN_M);
  //   } else {
  //     this.setType(DecoType.BONE_M);
  //   }
  // }

  setType(type: DecoType = DecoType.MUSHROOM_M) {
    this._type = type;

    switch (type) {
      case DecoType.MUSHROOM_S:
        this._sprite = '/img/Deco/01.png';
        break;
      case DecoType.MUSHROOM_M:
        this._sprite = '/img/Deco/02.png';
        break;
      case DecoType.MUSHROOM_L:
        this._sprite = '/img/Deco/03.png';
        break;

      case DecoType.STONE_S:
        this._sprite = '/img/Deco/04.png';
        break;
      case DecoType.STONE_M:
        this._sprite = '/img/Deco/05.png';
        break;
      case DecoType.STONE_L:
        this._sprite = '/img/Deco/06.png';
        break;

      case DecoType.BUSH_S:
        this._sprite = '/img/Deco/07.png';
        break;
      case DecoType.BUSH_M:
        this._sprite = '/img/Deco/08.png';
        break;
      case DecoType.BUSH_L:
        this._sprite = '/img/Deco/09.png';
        break;

      case DecoType.WEED_S:
        this._sprite = '/img/Deco/10.png';
        break;
      case DecoType.WEED_M:
        this._sprite = '/img/Deco/11.png';
        break;

      case DecoType.PUMPKIN_S:
        this._sprite = '/img/Deco/12.png';
        break;
      case DecoType.PUMPKIN_M:
        this._sprite = '/img/Deco/13.png';
        break;

        case DecoType.BONE_S_RIGHT:
        case DecoType.BONE_S_LEFT:
          this._sprite = '/img/Deco/15.png';
          break;
        case DecoType.BONE_M_RIGHT:
        case DecoType.BONE_M_LEFT:
          this._sprite = '/img/Deco/14.png';
          break;
  
        case DecoType.SIGN_STOP_TOP:
        case DecoType.SIGN_STOP_BOTTOM:
          this._sprite = '/img/Deco/16.png';
          break;
        case DecoType.SIGH_RIGHT_TOP:
        case DecoType.SIGH_RIGHT_BOTTOM:
          this._sprite = '/img/Deco/17.png';
          break;

      case DecoType.SCARECROW:
        this._sprite = '/img/Deco/18.png';
        break;
    }
  }

  protected _getCoordsMap() {
    return mapTerrainToCoords;
  }
}
