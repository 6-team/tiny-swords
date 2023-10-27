import { Sprite } from '../sprite/sprite';
import { BridgeType, mapTerrainToCoords } from './bridge.const';

export class BridgeSprite extends Sprite<BridgeType> {
  protected _type: BridgeType;
  protected _sprite = './img/Terrain/Bridge/Bridge_All.png';

  constructor(type: BridgeType = BridgeType.MIDDLE) {
    super();

    this._type = type;
  }

  setType(type: BridgeType = BridgeType.MIDDLE): void {
    this._type = type;
  }

  protected _getCoordsMap() {
    return mapTerrainToCoords;
  }
}
