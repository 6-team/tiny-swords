import { TPixelsCoords } from '../../abilities/abilities.types';
import { ResourcesType } from './resource.const';

export interface IResourceConfig {
  type: ResourcesType;
  coords?: TPixelsCoords;
  quantity?: number;
}
