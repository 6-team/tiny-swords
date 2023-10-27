import { Tile, CoordsTuple } from '../tile';
import { FoamType, mapTerrainToCoords } from './foam.const';

export class FoamTile extends Tile<FoamType> {
  protected _type: FoamType;
  protected _sprite = './img/Terrain/Water/Foam/Foam.png';

  constructor(type: FoamType = FoamType.MIDDLE) {
    super();

    this.setType(type)
  }

  setType(type: FoamType = FoamType.MIDDLE): void {
    this._type = type;
  }

  protected _getCoordsMap(): Record<FoamType, CoordsTuple> {
    return mapTerrainToCoords;
  }
}
