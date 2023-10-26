import { AttackingType, MovingDirection } from '../enums';

export interface IEntity {
  readonly id: string;
  coords?: [number, number];
  breakpoint?: [number, number];
  direction?: MovingDirection | null;
  attackingType?: AttackingType | null;
  isDied?: boolean;
}
