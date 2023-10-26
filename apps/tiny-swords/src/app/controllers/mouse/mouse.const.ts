import { AttackingType } from '@shared';

export const enum MouseButtons {
  MAIN,
  WHEEL,
  SECONDARY,
}

export const mapButtonToAttackType = {
  [MouseButtons.MAIN]: AttackingType.UP,
  [MouseButtons.WHEEL]: AttackingType.DOWN,
};
