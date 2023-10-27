import { Tile, CoordsTuple } from '../tile';
import { GoldMineType, mapTerrainToCoords } from './gold-mine.const';

export class GoldMineTile extends Tile<GoldMineType> {
  protected _type: GoldMineType;
  protected _sprite = './img/Resources/Gold_mine/GoldMine_Inactive.png';

  constructor(type: GoldMineType = GoldMineType.TOP_LEFT) {
    super();

    this.setType(type);
  }

  setType(type: GoldMineType = GoldMineType.TOP_LEFT): void {
    this._type = type;
  }

  protected _getCoordsMap(): Record<GoldMineType, CoordsTuple> {
    return mapTerrainToCoords;
  }
}
