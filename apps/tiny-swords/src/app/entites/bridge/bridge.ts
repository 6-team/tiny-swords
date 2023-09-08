import { Tile } from '../tile/tile';
import { BridgeType, mapTerrainToCoords } from './bridge.const';

export class BridgeTile extends Tile<BridgeType> {
  protected _type: BridgeType;
  protected _sprite = '/img/Terrain/Bridge/Bridge_All.png';

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
