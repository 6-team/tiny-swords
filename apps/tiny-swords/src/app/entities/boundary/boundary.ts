import { Sprite } from '../sprite/sprite';
import { BoundaryType, mapBoundaryToCoords } from './boundary.const';

export class BoundarySprite extends Sprite<BoundaryType> {
  protected _type: BoundaryType;
  protected _sprite = './img/Boundary/Boundary.png';

  constructor(type: BoundaryType = BoundaryType.MIDDLE) {
    super();

    this.setType(type);
  }

  setType(type: BoundaryType = BoundaryType.MIDDLE): void {
    this._type = type;
  }

  protected _getCoordsMap() {
    return mapBoundaryToCoords;
  }
}
