import { AttackingType, MovingDirection } from '../enums';

export interface IPlayer<D = MovingDirection> {
  readonly id: string;
  readonly coords?: [number, number];
  readonly breakpoint?: [number, number];
  direction?: D | null;
  attackingType?: AttackingType | null;
  isDied?: boolean;
}

export class Player<D = MovingDirection> implements IPlayer<D> {
  direction: D | null = null;
  attackingType: AttackingType | null = null;
  isDied: boolean = false;

  constructor(readonly id: string, readonly coords: [number, number]) {}
}
