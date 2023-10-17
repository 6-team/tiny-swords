import { IAttacking, ICollecting, IMovable } from '../../abilities';
import { ISounds } from './sounds.types';

export interface HeroSoundsConfig {
  movable: IMovable;
  attacking: IAttacking;
  collecting: ICollecting;
}

export interface IHeroSounds extends ISounds {
  playMovementSound(): void;
  stopMovementSound(): void;
  playGameOverSound(): void;
  playResourceSelection(): void;
  playAttackSound(): void;
  playHittingSound(): void;
}
