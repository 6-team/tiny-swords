import { IAttacking, ITile } from '../../../common/common.types';
import { AttackingForce, WithAttackMethods } from './attacking.types';

export class Attacking implements IAttacking {
  #context?: ITile & WithAttackMethods;

  setContext(context: ITile & WithAttackMethods) {
    this.#context = context;
  }

  attack(type: AttackingForce = AttackingForce.WEAK): void {
    if (!this.#context) {
      throw new Error("Can't call Attacking methods without personage");
    }

    this.#context.setAnimation(type === AttackingForce.WEAK ? 'WEAK_ATTACK' : 'STRONG_ATTACK');
  }
}
