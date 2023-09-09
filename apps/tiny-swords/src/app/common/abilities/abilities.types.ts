import { ITile, TTilePosition } from '../common.types';

export interface WithAttackMethods {
  setAnimation(next: 'WEAK_ATTACK' | 'STRONG_ATTACK'): void;
}

export interface IAttacking {
  setContext(context: ITile & WithAttackMethods): IAttacking;
  attack(type?: 'STRONG' | 'WEAK'): IAttacking;
}

export interface WithMovableMethods {
  setAnimation(next: 'FORWARD' | 'BACKWARD'): void;
  setType(next: 'RIGHT' | 'LEFT'): void;
}

export interface IMovable {
  sizes: [height: number, width: number];
  coords: [x: TTilePosition, y: TTilePosition];
  setContext(context: ITile & WithMovableMethods): IMovable;
  setMovement(
    updater: (prev: [TTilePosition, TTilePosition]) => [TTilePosition, TTilePosition],
    animation?: 'FORWARD' | 'BACKWARD',
    direction?: 'RIGHT' | 'LEFT',
  ): IMovable;
  back(): IMovable;
}

export interface IWithAbilityToMove {
  getAbility(name: 'movable'): IMovable;
}

export interface WithSetPersonageContext {
  setContext(context: ITile): void;
}
