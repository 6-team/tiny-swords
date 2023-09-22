import { Movable } from '../../abilities/movable';
import { IMovableCharacter } from '../../common/common.types';
import { Character } from '../character';
import { ResourcesType, mapResourcesToCoords } from './resource.const';
import { IResourceConfig, ResourceAbilities } from './resource.types';

export class Resource extends Character<ResourcesType, ResourceAbilities> implements IMovableCharacter {
  protected _type: ResourcesType;
  protected _sprite;

  constructor({ type, height, width, initialX, initialY, controllerCreator }: IResourceConfig) {
    super({});

    const movable = new Movable({
      height,
      width,
      initialX,
      initialY,
    });

    this.setType(type);
    this._setAbilities({
      movable,
    });

    movable.setController(controllerCreator(this));
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
