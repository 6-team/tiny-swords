import { IAttacking, IMovable } from '../../abilities';
import { ICollecting } from '../../abilities/abilities.types';
import { TNumberOfPixels, TPixelsPosition } from '../../common/common.types';
import { HeroType } from './hero.const';

export type HeroAbilities = {
  movable: IMovable;
  attacking: IAttacking;
  collecting: ICollecting;
};

export interface HeroConfig {
  height: TNumberOfPixels;
  width: TNumberOfPixels;
  initialX: TPixelsPosition;
  initialY: TPixelsPosition;
  id: string | number;
  type?: HeroType;
}
