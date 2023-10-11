import { IAttacking, TCollisionArea } from '../abilities.types';

export interface AttackingProps {
  getAffectedArea?: (attacking: IAttacking) => TCollisionArea;
}
