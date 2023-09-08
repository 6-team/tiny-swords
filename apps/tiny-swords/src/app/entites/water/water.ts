import { Tile } from '../tile/tile';
import { WaterType, mapWaterToCoords } from './water.const';

export class WaterTile extends Tile<WaterType> {
  protected _type: WaterType;
  protected _sprite = '/img/Terrain/Water/Water.png';

  constructor(type: WaterType = WaterType.MIDDLE_MIDDLE) {
    super();

    this.setType(type);
  }

  setType(type: WaterType = WaterType.MIDDLE_MIDDLE): void {
    this._type = type;
  }

  protected _getCoordsMap() {
    return mapWaterToCoords;
  }
}
