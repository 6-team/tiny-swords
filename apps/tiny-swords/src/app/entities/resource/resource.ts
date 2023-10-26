import { TPixelsCoords } from '@abilities/abilities.types';
import { IResource, PowerUp } from '@common/common.types';
import { Tile } from '@entities/tile';
import { ResourcesType, mapResourcesToCoords } from './resource.const';
import { IResourceConfig } from './resource.types';

/**
 * Represents a tile with a resource entity.
 * @extends Tile
 */
export class Resource extends Tile<ResourcesType> implements IResource {
  /**
   * The type of the resource.
   * @type {ResourcesType}
   * @private
   */
  protected _type: ResourcesType;

  /**
   * The sprite URL for the resource.
   * @type {string}
   * @private
   */
  protected _sprite: string;

  /**
   * The quantity of the resource.
   * @type {number}
   * @private
   */
  protected _quantity: number;

  /**
   * @type {TPixelsCoords}
   * The coords of the resource
   */
  private _coords: TPixelsCoords;

  powerUps: Array<PowerUp> = [];

  /**
   *
   * @param {IResourceConfig} { type, coords, quantity } - Specifies the configuration for the resource.
   * @property {string} type - Specifies the type of resource.
   * @property {Object} coords - Specifies the coordinates where the resource is located.
   * @property {number} quantity - Specifies the quantity of the resource.
   */
  constructor({ type, coords, quantity }: IResourceConfig) {
    super();

    this.setType(type);
    this._quantity = quantity;
    this._coords = coords;
  }

  /**
   * The coords property is a getter for the private variable _coords
   * Returns the _coords value.
   * @returns {TPixelsCoords} - Resources coordinates
   */
  get coords(): TPixelsCoords {
    return this._coords;
  }

  /**
   * The resource type property is a getter for the private variable _type
   * @returns {ResourcesType} - Resources type
   */
  get resourceType(): ResourcesType {
    return this._type;
  }

  /**
   * The rsprite property is a getter for the private variable _sprite
   * @returns {string} - Resources sprite
   */
  get resourceImage(): string {
    return this._sprite;
  }

  /**
   * Sets the type of the resource.
   * @param {ResourcesType} type - The type of the resource (default is ResourcesType.GOLD).
   */
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

  /**
   * Gets the coordinates map for resource.
   * @private
   * @returns {Record<SheepType, CoordsTuple>} - The map of resource coordinates.
   */
  protected _getCoordsMap() {
    return mapResourcesToCoords;
  }

  /**
   * Returns the quantity of the resource
   * @returns {number} - the quantity of the resource
   */
  public getQuantity(): number {
    return this._quantity;
  }

  /**
   * Adds resources
   * @param quantity - the quantity of the resource
   */
  public add(quantity: number): void {
    this._quantity += quantity;
  }

  /**
   * Resource withdrawal
   * @param quantity - the quantity of the resource
   */
  public subtract(quantity: number): void {
    if (quantity > this._quantity) {
      throw new Error('Insufficient quantity!');
    }
    this._quantity -= quantity;
  }
}
