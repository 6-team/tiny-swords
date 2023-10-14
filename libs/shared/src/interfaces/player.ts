import { AttackingType, MovingDirection } from '../enums';

export interface IPlayer<D = MovingDirection> {
  readonly id: string | number;
  readonly coords?: [number, number];
  direction?: D | null;
  attackingType?: AttackingType | null;
}

export class Player<D = MovingDirection> implements IPlayer<D> {
  direction: D | null = null;
  attackingType: AttackingType | null = null;

  constructor(readonly id: string, readonly coords: [number, number]) {}
}
