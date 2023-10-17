import { quantityResources } from './hero-resource-bar.const';
import { IHeroResourcesBar } from './hero-resource-bar.types';
import { Resource } from '../../entities/resource/resource';
import { BehaviorSubject, Observable } from 'rxjs';
import { ResourcesType } from '../../entities/resource';

export class HeroResourcesBar implements IHeroResourcesBar {
  #resourcesSubject: BehaviorSubject<Resource[]>;

  readonly resources$: Observable<Resource[]>;
  constructor(resources: Resource[]) {
    this.#resourcesSubject = new BehaviorSubject(resources);
    this.resources$ = this.#resourcesSubject.asObservable();
  }

  public getResources(): Array<Resource> {
    return this.#resourcesSubject.getValue();
  }

  public getResource(type: ResourcesType): Resource {
    const resource = this.getResources().find((r) => r.resourceType === type);
    if (!resource) {
      console.log(`Resource ${type} does not exist!`);
    }
    return resource;
  }

  public addResource(type: ResourcesType): void {
    const resources = this.getResources();
    const resource = this.getResource(type);
    if (resource) {
      resource.add(quantityResources[type]);
      const updatedResources = resources.map((_resource) => (_resource.resourceType === type ? resource : _resource));
      this.#resourcesSubject.next(updatedResources);
    }
  }

  public availableResourcesCheck(cost: { type: ResourcesType; price: number }): boolean {
    const resources = this.getResources();
    const resource = resources.find((_resource) => _resource.resourceType === cost.type);
    return resource.getQuantity() >= (cost.price || 0);
  }

  public spend(cost: { type: ResourcesType; price: number }): void {
    const resources = this.getResources();
    const resource = resources.find((_resource) => _resource.resourceType === cost.type);
    if (resource.getQuantity() >= cost.price) {
      resource.subtract(cost.price);
      const updatedResources = resources.map((_resource) =>
        _resource.resourceType === resource.resourceType ? resource : _resource,
      );
      this.#resourcesSubject.next(updatedResources);
      return;
    }
  }
}
