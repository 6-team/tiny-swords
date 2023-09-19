import { Observable } from 'rxjs';
import { IAttackingCharacter, IMovableCharacter, ITile, TTilePosition } from '../common/common.types';
import { AttackingForce } from './abilities.const';
import { MovingDirection } from '@shared';

export interface IAttacking {
  setContext(context: IAttackingCharacter): IAttacking;
  attack(type?: AttackingForce): IAttacking;
}

export interface IMovable {
  /**
   * Размеры персонажа
   */
  sizes: [height: number, width: number];

  /**
   * @deprecated Для обратной совместимости, пока не научились рендерить реактивно
   */
  coords: [x: TTilePosition, y: TTilePosition];

  /**
   * Устанавливает контекст/носителя данной способности.
   * Нужно, чтобы вызывать его методы, такие как показ анимации, изменение изображения и т.п.
   *
   * @param context Контекст
   * @returns Объект способности
   */
  setContext(context: IMovableCharacter): IMovable;

  /**
   * Останавливает движение персонажа.
   *
   * @returns Объект способности
   */
  stopMovement(): IMovable;

  setDirection(direction: MovingDirection): void;

  /**
   * Поток координат персонажа
   */
  coords$: Observable<[x: TTilePosition, y: TTilePosition]>;

  /**
   * Поток предыдущих координат персонажа, которые были до начала последнего перехода
   */
  prevCoords$: Observable<[x: TTilePosition, y: TTilePosition]>;

  /**
   * Поток команд для движения
   */
  movement$: Observable<MovingDirection>;
}

export interface WithSetPersonageContext {
  setContext(context: ITile): void;
}
