import { ICollecting } from '../../abilities/collecting/collecting.types';
import { IFighting } from '../../abilities/fighting/fighting.types';
import { IMoving } from '../../abilities/moving/moving.types';
import { TNumberOfPixels, TPixelsPosition } from '../../common/common.types';
import { HeroType } from './hero.const';

export type HeroAbilities = {
  moving: IMoving;
  fighting: IFighting;
  collecting: ICollecting;
};

export interface HeroConfig {
  height: TNumberOfPixels;
  width: TNumberOfPixels;
  initialX: TPixelsPosition;
  initialY: TPixelsPosition;
  id: string;
  type?: HeroType;
}
