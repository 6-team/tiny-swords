import { quantityResources } from './hero-resource-bar.const';
import { IHeroResourcesBar } from './hero-resource-bar.types';
import { Resource } from '@entities/resource/resource';
import { BehaviorSubject, Observable } from 'rxjs';
import { ResourcesType } from '@entities/resource';

/**
 * Класс для работы с ресурсами героя.
 *
 */

export class HeroResourcesBar implements IHeroResourcesBar {
  private _resourcesSubject: BehaviorSubject<Resource[]>;

  readonly resources$: Observable<Resource[]>;
  constructor(resources: Resource[]) {
    this._resourcesSubject = new BehaviorSubject(resources);
    this.resources$ = this._resourcesSubject.asObservable();
  }

  /**
   * Возвращает массив всех ресурсов
   * @returns Массив ресурсов
   */

  public getResources(): Array<Resource> {
    return this._resourcesSubject.getValue();
  }

  /**
   * Возвращает объект ресурса по типу
   * @param type Тип ресурса
   * @returns запрашиваемый объект ресурса
   */

  public getResource(type: ResourcesType): Resource {
    const resource = this.getResources().find((r) => r.resourceType === type);
    if (resource !== undefined) {
      return resource;
    } else {
      console.log(`Resource ${type} does not exist!`);
    }
  }

  /**
   * Добавляет ресурс по типу
   * @param type Тип ресурса
   */

  public addResource(type: ResourcesType): void {
    const resources = this.getResources();
    const resource = this.getResource(type);
    if (resource !== undefined) {
      resource.add(quantityResources[type] || 0);
      const updatedResources = resources.map((_resource) => (_resource.resourceType === type ? resource : _resource));
      this._resourcesSubject.next(updatedResources);
    }
  }

  /**
   * Проверяет хватает ли ресурсов для покупки улучшения
   * @param cost Объект с типом и стоимостью улучшения
   * @returns Хватает ли ресурсов
   */

  public availableResourcesCheck(cost: { type: ResourcesType; price: number }): boolean {
    const resources = this.getResources();
    const resource = resources.find((_resource) => _resource.resourceType === cost.type);
    if (resource !== undefined) {
      return resource.getQuantity() >= (cost.price || 0);
    } else return false;
  }

  /**
   * Уменьшаем количество ресурсов после покупки улучшения
   * @param cost Объект с типом и стоимостью улучшения
   */

  public spend(cost: { type: ResourcesType; price: number }): void {
    const resources = this.getResources();
    const resource = resources.find((_resource) => _resource.resourceType === cost.type);
    if (resource !== undefined) {
      if (resource.getQuantity() >= cost.price || 0) {
        resource.subtract(cost.price);
        const updatedResources = resources.map((_resource) =>
          _resource.resourceType === resource.resourceType ? resource : _resource,
        );
        this._resourcesSubject.next(updatedResources);
      }
    }
  }
}
