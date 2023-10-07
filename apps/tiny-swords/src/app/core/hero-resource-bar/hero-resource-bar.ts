import { quantityResources } from './hero-resource-bar.const';
import { IHeroResourcesBar } from './hero-resource-bar.types';
import { Resource } from './../../entities/resource/resource';
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
    const resource = this.getResources().find((r) => r.getType() === type);
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
      const updatedResources = resources.map((_resource) => (_resource.getType() === type ? resource : _resource));
      this.#resourcesSubject.next(updatedResources);
    }
  }

  public availableResourcesCheck(cost: { [K in ResourcesType]?: number }): boolean {
    const resources = this.getResources();
    return resources.some((resource) => resource.getQuantity() >= cost[resource.getType()] || 0);
  }

  public spend(cost: { [K in ResourcesType]?: number }): void {
    const resources = this.getResources();
    for (const resource of resources) {
      const type = resource.getType();
      const costForThisResource = cost[type] || 0;
      if (resource.getQuantity() >= costForThisResource) {
        resource.subtract(costForThisResource);
        const updatedResources = resources.map((_resource) => (_resource.getType() === type ? resource : _resource));
        this.#resourcesSubject.next(updatedResources);
        return;
      }
    }
  }
}
