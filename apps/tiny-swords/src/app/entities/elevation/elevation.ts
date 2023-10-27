import { Sprite } from '../sprite/sprite';
import { ElevationType, mapTerrainToCoords } from './elevation.const';

export class ElevationSprite extends Sprite<ElevationType> {
  protected _type: ElevationType;
  protected _sprite = './img/Terrain/Ground/Tilemap_Elevation.png';

  constructor(type: ElevationType = ElevationType.MIDDLE_MIDDLE) {
    super();

    this.setType(type);
  }

  setType(type: ElevationType = ElevationType.MIDDLE_MIDDLE): void {
    this._type = type;
  }

  protected _getCoordsMap() {
    return mapTerrainToCoords;
  }
}
