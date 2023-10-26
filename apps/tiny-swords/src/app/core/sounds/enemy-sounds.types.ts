import { IFighting } from '../../abilities/fighting/fighting.types';
import { ISounds } from './sounds.types';

export interface EnemySoundsConfig {
  fighting: IFighting;
}

export interface IEnemySounds extends ISounds {
  playAttackSound(): void;
  playHittingSound(): void;
}
