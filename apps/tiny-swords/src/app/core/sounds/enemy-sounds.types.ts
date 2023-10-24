import { IAttacking } from '@abilities';
import { ISounds } from '../sounds.types';

export interface EnemySoundsConfig {
  attacking: IAttacking;
}

export interface IEnemySounds extends ISounds {
  playAttackSound(): void;
  playHittingSound(): void;
}
