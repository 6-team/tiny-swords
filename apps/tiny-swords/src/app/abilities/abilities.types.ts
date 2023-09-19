import { Observable } from 'rxjs';
import {
  IAttackingCharacter,
  IMovableCharacter,
  ITile,
  TNumberOfPixels,
  TPixelsPosition,
} from '../common/common.types';
import { AttackingForce } from './abilities.const';
import { MovingDirection } from '@shared';

export interface IAttacking {
  setContext(context: IAttackingCharacter): IAttacking;
  attack(type?: AttackingForce): IAttacking;
}

export interface IMovable {
  /**
   * Зона персонажа, которая участвует в сравнении коллизий.
   */
  collisionArea: [x: TPixelsPosition, y: TPixelsPosition, height: TNumberOfPixels, width: TNumberOfPixels];

  /**
   * Размеры персонажа
   */
  sizes: [height: number, width: number];

  /**
   * @deprecated Для обратной совместимости, пока не научились рендерить реактивно
   */
  coords: [x: TNumberOfPixels, y: TNumberOfPixels];

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
   * Проверяет коллизию между текущим элементом и переданным
   *
   * @param rect2Coords Координаты в px второго объекта, с которым идёт сравнение
   * @returns Произошла ли коллизия
   */
  checkCollision(
    rect2Coords: [pxX: TPixelsPosition, pxY: TPixelsPosition, pxHeight: TNumberOfPixels, pxWidth: TNumberOfPixels],
  ): boolean;

  /**
   * Поток координат персонажа
   */
  coords$: Observable<[x: TNumberOfPixels, y: TNumberOfPixels]>;

  /**
   * Поток предыдущих координат персонажа, которые были до начала последнего перехода
   */
  prevCoords$: Observable<[x: TNumberOfPixels, y: TNumberOfPixels]>;

  /**
   * Поток команд для движения
   */
  movement$: Observable<MovingDirection>;
}

export interface WithSetPersonageContext {
  setContext(context: ITile): void;
}
