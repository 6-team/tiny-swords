import { IAttacking, TCollisionArea } from '../abilities.types';
import { IAttackingCharacter, IMovableCharacter } from '../../common/common.types';
import { AttackingError } from './attacking.const';
import { Subject, filter, noop } from 'rxjs';
import { IController } from '../../controllers';
import { HeroActionAnimation } from '../../entities/hero/hero.const';
import { AttackingProps } from './attacking.types';
import { AttackingType } from '@shared';

/**
 * Класс способности атаковать
 */
export class Attacking implements IAttacking {
  #context?: IAttackingCharacter & IMovableCharacter;
  #isAttacking = false;
  #getAffectedAreaFunc: AttackingProps['getAffectedArea'];

  private _attack$ = new Subject<AttackingType>();

  readonly attack$ = this._attack$.asObservable();

  constructor({ getAffectedArea }: AttackingProps = {}) {
    this.#getAffectedAreaFunc = getAffectedArea;
  }

  /**
   * Вычисляет зону, куда будет атаковать персонаж и которая будет считаться зоной поражения для других.
   *
   * @returns Зона поражения в виде кортежа пикселей
   */
  getAffectedArea(): TCollisionArea {
    if (!this.#context) {
      throw new Error(AttackingError.PERSONAGE_NOT_SET);
    }

    const movable = this.#context.getAbility('movable');
    const collisionArea = movable.getCollisionArea();

    if (this.#getAffectedAreaFunc) {
      return this.#getAffectedAreaFunc(this);
    }

    return movable.isRightDirection
      ? this.#getRightAffectedArea(collisionArea)
      : this.#getLeftAffectedArea(collisionArea);
  }

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

    if (!isMoving && !this.#isAttacking) {
      this._attack$.next(type);
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
        return isRightDirection ? HeroActionAnimation.RIGHT_ATTACK_DOWN : HeroActionAnimation.LEFT_ATTACK_DOWN;
      case AttackingType.UP:
        return isRightDirection ? HeroActionAnimation.RIGHT_ATTACK_UP : HeroActionAnimation.LEFT_ATTACK_UP;
    }
  }

  #getRightAffectedArea(area: TCollisionArea): TCollisionArea {
    /**
     * @TODO Переписать 64 на tileSize, или может вообще вынести отсюда, чтобы не зависеть тут от Grid
     */
    return [area[0] + 64, area[1], area[2], area[3]];
  }

  #getLeftAffectedArea(area: TCollisionArea): TCollisionArea {
    /**
     * @TODO Переписать 64 на tileSize, или может вообще вынести отсюда, чтобы не зависеть тут от Grid
     */
    return [area[0] - 64, area[1], area[2], area[3]];
  }
}
