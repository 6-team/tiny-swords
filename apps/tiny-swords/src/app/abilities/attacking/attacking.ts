import { IAttacking } from '../abilities.types';
import { IAttackingCharacter, IMovableCharacter } from '../../common/common.types';
import { AttackingError } from './attacking.const';
import { AttackingType } from '../abilities.const';
import { filter, noop } from 'rxjs';
import { IController } from '../../controllers';
import { HeroActionAnimation } from '../../entities/hero/hero.const';

/**
 * Класс способности атаковать
 */
export class Attacking implements IAttacking {
  #context?: IAttackingCharacter & IMovableCharacter;
  #isAttacking: boolean = false;

  /**
   * Атакует ли персонаж прямо сейчас
   */
  get isAttacking() {
    return this.#isAttacking;
  }

  /**
   * Устанавливает контекст/носителя данной способности.
   * Нужно, чтобы вызывать его методы, такие как показ анимации, изменение изображения и т.п.
   *
   * @param context Контекст
   * @returns Объект способности
   */
  setContext(context: IAttackingCharacter & IMovableCharacter) {
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
    controller.attack$.pipe(filter(() => Boolean(this.#context))).subscribe((type) => {
      this.attack(type);
    });

    return this;
  }

  /**
   * Метод для атаки.
   *
   * @param type Тип удара
   * @returns Объект способности
   */
  attack(type: AttackingType = AttackingType.DOWN): this {
    if (!this.#context) {
      throw new Error(AttackingError.PERSONAGE_NOT_SET);
    }

    const { isMoving, isRightDirection } = this.#context.getAbility('movable');

    if (!isMoving) {
      this.#isAttacking = true;
      this.#context
        .setAnimationOnce(this.#getAnimationWithDirection(type, isRightDirection))
        .then(() => {
          this.#isAttacking = false;
        })
        .catch(noop);
    }

    return this;
  }

  /**
   * Возвращает номер анимации в зависимости от типа удара и направления движения
   *
   * @param type Тип удара
   * @param isRightDirection Направление персонажа
   * @returns Анимация
   */
  #getAnimationWithDirection(type: AttackingType, isRightDirection: boolean) {
    switch (type) {
      case AttackingType.DOWN:
        return isRightDirection ? HeroActionAnimation.RIGHT_ATTACK_DOWN : HeroActionAnimation.FRONT_ATTACK_DOWN;
      case AttackingType.UP:
        /**
         * Заменить на удар слева, когда он появится
         */
        return isRightDirection ? HeroActionAnimation.RIGHT_ATTACK_UP : HeroActionAnimation.FRONT_ATTACK_UP;
    }
  }
}
