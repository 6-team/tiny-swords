import { ResourcesType } from '@entities/resource';

export const quantityResources: { [K in ResourcesType]?: number } = {
  [ResourcesType.GOLD]: 100,
  [ResourcesType.WOOD]: 1,
};
