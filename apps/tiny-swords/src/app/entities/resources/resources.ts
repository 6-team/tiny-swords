import { Tile } from "../tile/tile";
import { ResourcesType, mapResourcesToCoords } from "./resources.const";

export class ResourcesTile extends Tile<ResourcesType> {
  protected _type: ResourcesType;
  protected _sprite;

  constructor(type: ResourcesType = ResourcesType.GOLD) {
    super();

    this.setType(type);
  }

  setType(type: ResourcesType = ResourcesType.GOLD) {
    this._type = type;

    switch (type) {
      case ResourcesType.GOLD:
        this._sprite = '/img/Resources/G_Idle.png';
        break;
      case ResourcesType.WOOD:
        this._sprite = '/img/Resources/M_Idle.png';
        break;
      case ResourcesType.MEAT:
        this._sprite = '/img/Resources/W_Idle.png';
        break;
    }
  }

  protected _getCoordsMap() {
    return mapResourcesToCoords;
  }
}