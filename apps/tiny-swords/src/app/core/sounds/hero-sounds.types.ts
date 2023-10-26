import { ICollecting } from '../../abilities/collecting/collecting.types';
import { IFighting } from '../../abilities/fighting/fighting.types';
import { IMoving } from '../../abilities/moving/moving.types';
import { ISounds } from './sounds.types';

export interface HeroSoundsConfig {
  moving: IMoving;
  fighting: IFighting;
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
