import { Observable } from 'rxjs';
import {
  IAttackingCharacter,
  ICharacter,
  ICollectingCharacter,
  IMovableCharacter,
  IResource,
  ITile,
  TNumberOfPixels,
  TPixelsPosition,
} from '../common/common.types';
import { AttackingForce } from './abilities.const';
import { MovingDirection } from '@shared';
import { IController } from '../controllers';

interface IAbility<Context> {
  /**
   * Устанавливает контекст/носителя данной способности.
   * Нужно, чтобы вызывать его методы, такие как показ анимации, изменение изображения и т.п.
   *
   * @param context Контекст
   * @returns Объект способности
   */
  setContext(context: Context): this;
}

export interface ICollecting extends IAbility<ICollectingCharacter> {
  /**
   * Помещает предмет коллекционирования в коллекцию
   *
   * @param item Предмет коллекционирования
   */
  collect(item: IResource): this;
}

export interface IAttacking extends IAbility<IAttackingCharacter> {
  attack(type?: AttackingForce): this;
}

export interface IMovable extends IAbility<IMovableCharacter> {
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

  setDirection(direction: MovingDirection): void;

  /**
   * Устанавливает контекст/носителя данной способности.
   * Нужно, чтобы вызывать его методы, такие как показ анимации, изменение изображения и т.п.
   *
   * @param context Контекст
   * @returns Объект способности
   */
  setContext(context: ICharacter<{ movable: IMovable }>): this;

  /**
   * Устанавливает контроллер для управления способностью.
   * Для установки понадобился отдельный метод, чтобы была возможность использовать декораторы для контроллера с передачей this
   *
   * @param controller Контроллер
   * @returns Объект способности
   */
  setController(controller: IController): this;

  getNextCollisionArea(direction: MovingDirection): TMovableDimentions;

  /**
   * Проверяет коллизию между текущим элементом и переданным
   *
   * @param rect2Coords Координаты в px второго объекта, с которым идёт сравнение
   * @returns Произошла ли коллизия
   */
  checkCollision(rect2Coords: TMovableDimentions, collisionArea?: TMovableDimentions): boolean;

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

export type TMovableDimentions = [
  pxX: TPixelsPosition,
  pxY: TPixelsPosition,
  pxHeight: TNumberOfPixels,
  pxWidth: TNumberOfPixels,
];
