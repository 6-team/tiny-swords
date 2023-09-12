import { ITile, TTilePosition } from '../common/common.types';
import { AttackingAnimation, AttackingForce } from './abilities.const';

export interface WithMethodsForAttacking {
  setAnimation(next: AttackingAnimation): void;
}

export interface IAttacking {
  setContext(context: ITile & WithMethodsForAttacking): IAttacking;
  attack(type?: AttackingForce): IAttacking;
}

export interface WithAbilityToAttack {
  getAbility(name: 'attacking'): IAttacking;
}

export interface WithMethodsForMovable {
  setAnimation(next: number): void;
}

export interface IMovable {
  sizes: [height: number, width: number];
  coords: [x: TTilePosition, y: TTilePosition];
  setContext(context: ITile & WithMethodsForMovable): IMovable;
  setMovement(updater: (prev: [TTilePosition, TTilePosition]) => [TTilePosition, TTilePosition]): IMovable;
  back(): IMovable;
}

export interface WithAbilityToMove {
  getAbility(name: 'movable'): IMovable;
}

export interface WithSetPersonageContext {
  setContext(context: ITile): void;
}
