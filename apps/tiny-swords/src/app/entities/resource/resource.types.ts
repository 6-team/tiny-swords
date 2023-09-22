import { IMovable } from '../../abilities';
import { IMovableCharacter, TNumberOfPixels, TPixelsPosition } from '../../common/common.types';
import { IController } from '../../controllers';
import { ResourcesType } from './resource.const';

export type ResourceAbilities = {
  movable: IMovable;
};

export interface IResourceConfig {
  controllerCreator: (resource: IMovableCharacter) => IController;
  height: TNumberOfPixels;
  width: TNumberOfPixels;
  initialX: TPixelsPosition;
  initialY: TPixelsPosition;
  type: ResourcesType;
}
