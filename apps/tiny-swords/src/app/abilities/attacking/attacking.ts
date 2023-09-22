import { IAttacking } from '../abilities.types';
import { IAttackingCharacter } from '../../common/common.types';
import { AttackingError } from './attacking.const';
import { AttackingAnimation, AttackingForce } from '../abilities.const';
import { filter } from 'rxjs';
import { IController } from '../../controllers';

/**
 * Класс способности атаковать
 */
export class Attacking implements IAttacking {
  #context?: IAttackingCharacter;
  #controller?: IController;

  /**
   * Устанавливает контекст/носителя данной способности.
   * Нужно, чтобы вызывать его методы, такие как показ анимации, изменение изображения и т.п.
   *
   * @param context Контекст
   * @returns Объект способности
   */
  setContext(context: IAttackingCharacter) {
    this.#context = context;

    return this;
  }

  /**
   * Устанавливает контроллер для управления способностью.
   * Для установки понадобился отдельный метод, чтобы была возможность использовать декораторы для контроллера с передачей this
   *
   * @param controller Контроллер
   * @returns Объект способности
   */
  setController(controller: IController) {
    this.#controller = controller;

    controller.attack$.pipe(filter(() => Boolean(this.#context))).subscribe((force) => {
      this.attack(force);
    });

    return this;
  }

  /**
   * Метод для атаки.
   *
   * @param type Сила удара
   * @returns Объект способности
   */
  attack(force: AttackingForce = AttackingForce.WEAK): this {
    if (!this.#context) {
      throw new Error(AttackingError.PERSONAGE_NOT_SET);
    }

    this.#context.setAnimation(
      force === AttackingForce.WEAK ? AttackingAnimation.WEAK_ATTACK : AttackingAnimation.STRONG_ATTACK,
    );

    return this;
  }
}
