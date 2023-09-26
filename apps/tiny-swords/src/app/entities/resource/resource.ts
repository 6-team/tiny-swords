import { IResource } from '../../common/common.types';
import { Tile } from '../tile/tile';
import { ResourcesType, mapResourcesToCoords } from './resource.const';
import { IResourceConfig } from './resource.types';

export class Resource extends Tile<ResourcesType> implements IResource {
  protected _type: ResourcesType;
  protected _sprite: string;

  powerUps = [];

  constructor({ type }: IResourceConfig) {
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
