import { MovingDirection } from '../enums';

export interface IPlayer<D = MovingDirection> {
  readonly id: string;
  direction: D | null;
}

export class Player<D = unknown> implements IPlayer<D> {
  direction: D | null = null;

  constructor(readonly id: string) {}

  setDirection(direction: D | null): void {
    this.direction = direction;
  }
}
