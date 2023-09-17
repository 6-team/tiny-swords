import { MovingDirection } from '@shared';

export const pushedKeys: Record<string, MovingDirection> = {
  ArrowUp: MovingDirection.UP,
  KeyW: MovingDirection.UP,
  ArrowDown: MovingDirection.DOWN,
  KeyS: MovingDirection.DOWN,
  ArrowLeft: MovingDirection.LEFT,
  KeyA: MovingDirection.LEFT,
  ArrowRight: MovingDirection.RIGHT,
  KeyD: MovingDirection.RIGHT,
};
