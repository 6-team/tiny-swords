import { ResourcesType } from '@entities/resource/index';

export const quantityResources: { [K in ResourcesType]?: number } = {
  [ResourcesType.GOLD]: 100,
  [ResourcesType.WOOD]: 1,
};
