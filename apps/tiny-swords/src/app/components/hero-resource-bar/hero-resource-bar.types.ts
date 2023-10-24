import { ResourcesType, Resource } from '@entities/resource/index';

export interface IHeroResourcesBar {
  getResources(): Array<Resource>;
  getResource(type: ResourcesType): Resource;
  addResource(type: ResourcesType, quantity: number): void;
  availableResourcesCheck(cost: { type: ResourcesType; price: number }): boolean;
  spend(cost: { type: ResourcesType; price: number }): void;
}
