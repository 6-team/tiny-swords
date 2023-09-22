import { IAttacking, IMovable } from '../../abilities';
import { ICollecting } from '../../abilities/abilities.types';
import {
  IAttackingCharacter,
  ICharacter,
  IMovableCharacter,
  TNumberOfPixels,
  TPixelsPosition,
} from '../../common/common.types';
import { IController } from '../../controllers';

export type HeroAbilities = {
  movable: IMovable;
  attacking: IAttacking;
  collecting: ICollecting;
};

export interface HeroConfig {
  controllerCreator: (hero: IMovableCharacter & IAttackingCharacter) => IController;
  height: TNumberOfPixels;
  width: TNumberOfPixels;
  initialX: TPixelsPosition;
  initialY: TPixelsPosition;
  id: string;
}
