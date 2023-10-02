import { MovingDirection } from '@shared';
import { AttackingType } from '../../abilities/abilities.const';

export const directionKeys: Record<string, MovingDirection> = {
  ArrowUp: MovingDirection.UP,
  KeyW: MovingDirection.UP,
  ArrowDown: MovingDirection.DOWN,
  KeyS: MovingDirection.DOWN,
  ArrowLeft: MovingDirection.LEFT,
  KeyA: MovingDirection.LEFT,
  ArrowRight: MovingDirection.RIGHT,
  KeyD: MovingDirection.RIGHT,
};

export const attackKeys: Record<string, AttackingType> = {
  KeyF: AttackingType.UP,
  KeyC: AttackingType.DOWN,
};
