import { AttackingForce, WithAttackMethods } from '../entites/abilities/attacking/attacking.types';
import { WithMovableMethods } from '../entites/abilities/movable/movable.types';
import { WithSetPersonageContext } from '../entites/tile/tile.types';

export type TNumberOfTiles = number;

export type TTilePosition = number;

export interface IMovable {
  sizes: [height: number, width: number];
  coords: [x: TTilePosition, y: TTilePosition];
  setContext(context: ITile & WithMovableMethods): void;
  setMovement(
    updater: (prev: [TTilePosition, TTilePosition]) => [TTilePosition, TTilePosition],
    animation?: 'FORWARD' | 'BACKWARD',
    direction?: 'RIGHT' | 'LEFT',
  ): void;
  back(): void;
}

export interface IAttacking {
  setContext(context: ITile & WithAttackMethods): void;
  attack(type?: AttackingForce): void;
}

export interface ICoordinateSystem {
  tileSize: number;
  transformToPixels(
    x: number,
    y: number,
    height: number,
    width: number,
  ): [pxX: number, pxY: number, pxHeight: number, pxWidth: number];
}

export interface ITile {
  getAbility<Name extends string | symbol, Ability extends WithSetPersonageContext>(name: Name): Ability;
  getData(): Promise<{
    image: HTMLImageElement;
    coords: [number, number];
    size: number;
  }>;
}

export interface IWithAbilityToMove {
  getAbility(name: 'movable'): IMovable;
}
