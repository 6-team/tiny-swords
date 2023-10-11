import { TPixelsCoords } from '../../abilities/abilities.types';
import { IResource, PowerUp } from '../../common/common.types';
import { Tile } from '../tile/tile';
import { ResourcesType, mapResourcesToCoords } from './resource.const';
import { IResourceConfig } from './resource.types';

export class Resource extends Tile<ResourcesType> implements IResource {
  protected _type: ResourcesType;
  protected _sprite: string;
  protected _quantity: number;

  #coords: TPixelsCoords;

  powerUps: Array<PowerUp> = [];

  constructor({ type, coords, quantity }: IResourceConfig) {
    super();

    this.setType(type);
    this._quantity = quantity;
    this.#coords = coords;
  }

  get coords(): TPixelsCoords {
    return this.#coords;
  }

  get resourceType(): ResourcesType {
    return this._type;
  }

  get resourceImage(): string {
    return this._sprite;
  }

  setType(type: ResourcesType = ResourcesType.GOLD) {
    this._type = type;

    switch (type) {
      case ResourcesType.GOLD:
        this._sprite = './img/Resources/G_Idle.png';

        break;
      case ResourcesType.WOOD:
        this._sprite = './img/Resources/W_Idle.png';

        break;
      case ResourcesType.MEAT:
        this._sprite = './img/Resources/M_Idle.png';

        break;
    }
  }

  protected _getCoordsMap() {
    return mapResourcesToCoords;
  }

  public getQuantity(): number {
    return this._quantity;
  }

  public add(quantity: number): void {
    this._quantity += quantity;
  }

  public subtract(quantity: number): void {
    if (quantity > this._quantity) {
      throw new Error('Insufficient quantity!');
    }
    this._quantity -= quantity;
  }

  public getType(): ResourcesType {
    return this._type;
  }
}
