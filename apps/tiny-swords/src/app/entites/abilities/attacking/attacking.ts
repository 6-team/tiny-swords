import { IAttacking, WithAttackMethods } from '../../../common/abilities/abilities.types';
import { ITile } from '../../../common/common.types';
import { AttackingAnimation, AttackingError, AttackingForce } from './attacking.const';

/**
 * Класс способности атаковать
 */
export class Attacking implements IAttacking {
  #context?: ITile & WithAttackMethods;

  /**
   * Устанавливает контекст/носителя данной способности.
   * Нужно, чтобы вызывать его методы, такие как показ анимации, изменение изображения и т.п.
   *
   * @param context Контекст
   * @returns Объект способности
   */
  setContext(context: ITile & WithAttackMethods) {
    this.#context = context;

    return this;
  }

  /**
   * Метод для атаки.
   *
   * @param type Сила удара
   * @returns Объект способности
   */
  attack(type: AttackingForce = AttackingForce.WEAK): this {
    if (!this.#context) {
      throw new Error(AttackingError.PERSONAGE_NOT_SET);
    }

    this.#context.setAnimation(
      type === AttackingForce.WEAK ? AttackingAnimation.WEAK_ATTACK : AttackingAnimation.STRONG_ATTACK,
    );

    return this;
  }
}
