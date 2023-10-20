import { FightingAreaDirection } from '@shared';
import { IAttacking, TCollisionArea } from '../abilities.types';

export interface AttackingProps {
  getAffectedArea?: (attacking: IAttacking, direction: FightingAreaDirection) => TCollisionArea;
  availibleLives: number;
  blockedLives: number;
}
