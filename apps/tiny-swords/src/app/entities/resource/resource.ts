import { TPixelsCoords } from '@abilities';
import { IResource, PowerUp } from '@common/common.types';
import { Tile } from '../tile/tile';
import { ResourcesType, mapResourcesToCoords } from './resource.const';
import { IResourceConfig } from './resource.types';

/**
 * Класс для работы с ресурсами
 */
export class Resource extends Tile<ResourcesType> implements IResource {
  protected _type: ResourcesType = ResourcesType.GOLD;
  protected _sprite = '';
  protected _quantity = 0;

  private _coords: TPixelsCoords = [0, 0, 0, 0];

  powerUps: Array<PowerUp> = [];

  constructor({ type, coords, quantity }: IResourceConfig) {
    super();

    this.setType(type);
    if (quantity !== undefined) this._quantity = quantity;
    if (coords !== undefined) this._coords = coords;
  }

  /**
   * Получение координат
   */
  get coords(): TPixelsCoords {
    return this._coords;
  }

  /**
   * Получение типа ресурса
   */
  get resourceType(): ResourcesType {
    return this._type;
  }

  /**
   * Получение изображение ресурса
   */
  get resourceImage(): string {
    return this._sprite;
  }

  /**
   * Установка типа и спрайта
   * @param type тип ресурса
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
   * Возвращает координаты ресурсов
   * @returns координаты ресурсов
   */
  protected _getCoordsMap() {
    return mapResourcesToCoords;
  }

  /**
   * Возвращает количество ресурса
   * @returns количество ресурса
   */
  public getQuantity(): number {
    return this._quantity;
  }

  /**
   * Добавляет ресурсы
   * @param quantity количество ресурса
   */
  public add(quantity: number): void {
    this._quantity += quantity;
  }

  /**
   * Трата ресурса
   * @param quantity количество ресурса
   */
  public subtract(quantity: number): void {
    if (quantity > this._quantity) {
      throw new Error('Insufficient quantity!');
    }
    this._quantity -= quantity;
  }
}
