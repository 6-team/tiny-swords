import { quantityResources } from './hero-resource-bar.const';
import { IHeroResourcesBar } from './hero-resource-bar.types';
import { Resource } from '@entities/resource/resource';
import { BehaviorSubject, Observable } from 'rxjs';
import { ResourcesType } from '@entities/resource';

/**
 * A class for working with the hero's resources.
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
   * Returns an array of all resources
   * @returns Resource Array
   */
  public getResources(): Array<Resource> {
    return this._resourcesSubject.getValue();
  }

  /**
   * Returns the resource object by type
   * @param type Resource type
   * @returns requested resource object
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
   * Adds a resource by type
   * @param type Resource type
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
   * Checks if there are enough resources to purchase the enhancement
   * @param cost Object with type and cost of improvement
   * @returns Are there enough resources
   */
  public availableResourcesCheck(cost: { type: ResourcesType; price: number }): boolean {
    const resources = this.getResources();
    const resource = resources.find((_resource) => _resource.resourceType === cost.type);
    if (resource !== undefined) {
      return resource.getQuantity() >= (cost.price || 0);
    } else return false;
  }

  /**
   * Reducing the amount of resources after purchasing an enhancement
   * @param cost Object with type and cost of improvement
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
