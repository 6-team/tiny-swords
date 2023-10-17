import { ResourcesType } from '../../entities/resource';
import { Resource } from '../../entities/resource/resource';
export interface IHeroResourcesBar {
  getResources(): Array<Resource>;
  getResource(type: ResourcesType): Resource;
  addResource(type: ResourcesType, quantity: number): void;
  availableResourcesCheck(cost: { type: ResourcesType; price: number }): boolean;
  spend(cost: { type: ResourcesType; price: number }): void;
}
