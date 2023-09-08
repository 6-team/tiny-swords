export const enum AttackingForce {
  STRONG,
  WEAK,
}

export interface WithAttackMethods {
  setAnimation(next: 'WEAK_ATTACK' | 'STRONG_ATTACK'): void;
}
