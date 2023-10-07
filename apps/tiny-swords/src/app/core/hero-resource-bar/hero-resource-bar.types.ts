import { ResourcesType } from '../../entities/resource';
import { Resource } from './../../entities/resource/resource';
export interface IHeroResourcesBar {
  getResources(): Array<Resource>;
  getResource(type: ResourcesType): Resource;
  addResource(type: ResourcesType, quantity: number): void;
  availableResourcesCheck(cost: { [K in ResourcesType]?: number }): boolean;
  spend(cost: { [K in ResourcesType]?: number }): void;
}
