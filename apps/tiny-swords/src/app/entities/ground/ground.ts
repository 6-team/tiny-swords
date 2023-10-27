import { Sprite } from '../sprite/sprite';
import { GroundType, mapTerrainToCoords } from './ground.const';

export class GroundSprite extends Sprite<GroundType> {
  protected _type: GroundType;
  protected _sprite = './img/Terrain/Ground/Tilemap_Flat.png';

  constructor(type: GroundType = GroundType.MIDDLE_MIDDLE) {
    super();

    this.setType(type);
  }

  setType(type: GroundType = GroundType.MIDDLE_MIDDLE): void {
    this._type = type;
  }

  protected _getCoordsMap() {
    return mapTerrainToCoords;
  }
}
