import { IAttacking, ICollecting, IMovable } from '../../abilities';

export interface HeroSoundsConfig {
  movable: IMovable;
  attacking: IAttacking;
  collecting: ICollecting;
}
