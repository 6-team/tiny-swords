import { TCollisionArea } from '../abilities.types';
import { AttackingError } from './fighting.const';
import { BehaviorSubject, Observable, Subject, filter, map, noop } from 'rxjs';
import { HeroActionAnimation } from '../../entities/hero/hero.const';
import { IFightingProps, IFighting, IFightingCharacter } from './fighting.types';
import { AttackingType } from '@shared';
import { TOTAL_LIVES } from '../../common/common.const';
import { IMovingCharacter } from '../moving/moving.types';

const isNotPositiveNumber = (count: number) => count <= 0;

/**
 * Класс способности атаковать
 */
export class Fighting implements IFighting {
  #context?: IFightingCharacter & IMovingCharacter;
  #getAffectedAreaFunc: IFightingProps['getAffectedArea'];

  private _initialConfig: IFightingProps;
  private _attack$ = new Subject<AttackingType>();
  private _isAttacking$ = new BehaviorSubject<boolean>(false);
  private _isHitted$ = new Subject<boolean>();
  private _livesCount$: BehaviorSubject<number>;
  private _blockedLivesCount$: BehaviorSubject<number>;

  readonly attack$ = this._attack$.asObservable();
  readonly isAttacking$ = this._isAttacking$.asObservable();
  readonly isHitted$ = this._isHitted$.asObservable();

  readonly livesCount$: Observable<number>;
  readonly blockedLivesCount$: Observable<number>;
  readonly isDied$: Observable<boolean>;

  constructor(config: IFightingProps) {
    this.#getAffectedAreaFunc = config.getAffectedArea;

    this._livesCount$ = new BehaviorSubject(config.availibleLives);
    this._blockedLivesCount$ = new BehaviorSubject(config.blockedLives);

    this.livesCount$ = this._livesCount$.asObservable();
    this.blockedLivesCount$ = this._blockedLivesCount$.asObservable();
    this.isDied$ = this._livesCount$.pipe(map(isNotPositiveNumber), filter(Boolean));

    this._initialConfig = config;
  }

  /**
   * Вычисляет зону перед персонажем, куда будет атаковать персонаж и которая будет считаться зоной поражения для других.
   *
   * @returns Зона поражения в виде кортежа пикселей
   */
  getAffectedArea(): TCollisionArea {
    if (!this.#context) {
      throw new Error(AttackingError.PERSONAGE_NOT_SET);
    }

    const collisionArea = this.#context.moving.getCollisionArea();

    if (this.#getAffectedAreaFunc) {
      return this.#getAffectedAreaFunc(this);
    }

    return this.#context.moving.isRightDirection
      ? this.#getRightAffectedArea(collisionArea)
      : this.#getLeftAffectedArea(collisionArea);
  }

  /**
   * Атакует ли персонаж прямо сейчас
   */
  get isAttacking(): boolean {
    return this._isAttacking$.getValue();
  }

  /**
   * Устанавливает контекст/носителя данной способности.
   * Нужно, чтобы вызывать его методы, такие как показ анимации, изменение изображения и т.п.
   *
   * @param context Контекст
   * @returns Объект способности
   */
  setContext(context: IFightingCharacter & IMovingCharacter): this {
    this.#context = context;

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

    const { isMoving, isRightDirection } = this.#context.moving;

    if (!isMoving && !this.isAttacking) {
      this.#setIsAttacking();
      this._attack$.next(type);

      this.#context
        .setAnimationOnce(this.#getAnimationWithDirection(type, isRightDirection))
        .then(() => {
          this.#setIsAttacking(false);
        })
        .catch(noop);
    }

    return this;
  }

  /**
   * Метод для получения урона. Отнимает одну жизнь.
   *
   * @returns Объект способности
   */
  takeDamage() {
    this._livesCount$.next(this._livesCount$.getValue() - 1);
    this._isHitted$.next(true);

    return this;
  }

  /**
   * Метод добавления одной жизни
   *
   * @returns Объект способности
   */
  addLive() {
    const lives = this._livesCount$.getValue();

    if (this.checkAddLive()) this._livesCount$.next(lives + 1);

    return this;
  }

  /**
   * Метод для разблокировки одной жизни
   *
   * @returns Объект способности
   */
  unblockLive() {
    const prev = this._blockedLivesCount$.getValue();

    if (prev >= 1) {
      this._blockedLivesCount$.next(prev - 1);
    }

    return this;
  }

  /**
   * Метод для сброса состояния способности
   *
   * @returns Объект способности
   */
  reset() {
    this._livesCount$.next(this._initialConfig.availibleLives);
    this._blockedLivesCount$.next(this._initialConfig.blockedLives);

    return this;
  }

  /**
   * Метод для проверки возможности добавления жизни
   *
   */

  checkAddLive(): boolean {
    const blockedLives = this._blockedLivesCount$.getValue();
    const availableLives = this._livesCount$.getValue();
    return availableLives + blockedLives < TOTAL_LIVES;
  }

  /**
   * Метод для проверки возможности разблокировки жизни
   *
   */

  checkUnblockLive(): boolean {
    return !!this._blockedLivesCount$.getValue();
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

  #setIsAttacking(isAttacking = true): void {
    this._isAttacking$.next(isAttacking);
  }
}
