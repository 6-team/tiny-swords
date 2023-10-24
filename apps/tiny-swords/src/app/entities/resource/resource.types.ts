import { TPixelsCoords } from '@abilities';
import { ResourcesType } from './resource.const';

export interface IResourceConfig {
  type: ResourcesType;
  coords?: TPixelsCoords;
  quantity?: number;
}
