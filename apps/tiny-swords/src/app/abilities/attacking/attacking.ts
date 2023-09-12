import { IAttacking, WithMethodsForAttacking } from '../abilities.types';
import { ITile } from '../../common/common.types';
import { AttackingError } from './attacking.const';
import { AttackingAnimation, AttackingForce } from '../abilities.const';

/**
 * Класс способности атаковать
 */
export class Attacking implements IAttacking {
  #context?: ITile & WithMethodsForAttacking;

  /**
   * Устанавливает контекст/носителя данной способности.
   * Нужно, чтобы вызывать его методы, такие как показ анимации, изменение изображения и т.п.
   *
   * @param context Контекст
   * @returns Объект способности
   */
  setContext(context: ITile & WithMethodsForAttacking) {
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
