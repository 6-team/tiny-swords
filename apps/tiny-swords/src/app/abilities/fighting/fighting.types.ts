import { Observable } from 'rxjs';
import { IAbility, TCollisionArea, TPixelsCoords } from '../abilities.types';
import { AttackingType } from '@shared';
import { ICharacter } from '../../common/common.types';

export interface IFightingProps {
  getAffectedArea?: (fighting: IFighting) => TCollisionArea;
  availibleLives: number;
  blockedLives: number;
}

export type IFightingCharacter = ICharacter<{ fighting: IFighting }> & {
  fighting: IFighting;
};

export interface IFighting extends IAbility<IFightingCharacter> {
  /**
   * Поток атак
   */
  attack$: Observable<AttackingType>;

  /**
   * Поток состояний атаки: атака началась, атака закончилась
   */
  isAttacking$: Observable<boolean>;

  /**
   * Поток состояния смерти
   */
  isDied$: Observable<boolean>;

  /**
   * Поток уменьшения жизней
   */
  isHitted$: Observable<boolean>;

  /**
   * Поток количества имеющихся жизней
   */
  livesCount$: Observable<number>;

  /**
   * Поток количества заблокированных жизней
   */
  blockedLivesCount$: Observable<number>;

  /**
   * Атакует ли персонаж прямо сейчас
   */
  isAttacking: boolean;

  /**
   * Метод для атаки.
   *
   * @param type Тип удара
   * @returns Объект способности
   */
  attack(type?: AttackingType): this;

  /**
   * Метод для получения урона
   *
   * @returns Объект способности
   */
  takeDamage(): this;

  /**
   * Метод для сброса состояния способности
   *
   * @returns Объект способности
   */
  reset(): this;

  /**
   * Метод добавления одной жизни
   *
   * @returns Объект способности
   */
  addLive(): this;

  /**
   * Метод для разблокировки одной жизни
   *
   * @returns Объект способности
   */
  unblockLive(): this;

  /**
   * Метод для проверки возможности добавления жизни
   *
   */
  checkAddLive(): boolean;

  /**
   * Метод для проверки возможности разблокировки жизни
   *
   */
  checkUnblockLive(): boolean;

  /**
   * Вычисляет зону, куда будет атаковать персонаж и которая будет считаться зоной поражения для других.
   *
   * @returns Зона поражения в виде кортежа пикселей
   */
  getAffectedArea(): TPixelsCoords;
}
