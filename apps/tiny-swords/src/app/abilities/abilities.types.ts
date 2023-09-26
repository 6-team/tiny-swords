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
  setContext(context: ICharacter<{ movable: IMovable }>): this;

  /**
   * Устанавливает контроллер для управления способностью.
   * Для установки понадобился отдельный метод, чтобы была возможность использовать декораторы для контроллера с передачей this
   *
   * @param controller Контроллер
   * @returns Объект способности
   */
  setController(controller: IController): this;

  /**
   * Возвращает зону персонажа, которая участвует в сравнении коллизий.
   *
   * @returns Зона для сравнения коллизий
   */
  getCollisionArea(): TCollisionArea;

  /**
   * Возвращает зону коллизии персонажа, которая будет при перемещении в указанном направлении.
   *
   * @param direction Направление движения
   * @returns Координаты и размеры
   */
  getNextCollisionArea(direction: MovingDirection): TCollisionArea;

  /**
   * Поток координат персонажа
   */
  coords$: Observable<[x: TNumberOfPixels, y: TNumberOfPixels]>;

  /**
   * Поток команд для движения
   */
  movement$: Observable<MovingDirection>;

  /**
   * Поток координат, когда персонаж оказывается в очередной клетке
   */
  breakpoints$: Observable<[x: TNumberOfPixels, y: TNumberOfPixels]>;
}

export interface WithSetPersonageContext {
  setContext(context: ITile): void;
}

export type TPixelsCoords = [
  pxX: TPixelsPosition,
  pxY: TPixelsPosition,
  pxHeight: TNumberOfPixels,
  pxWidth: TNumberOfPixels,
];

export type TCollisionArea = TPixelsCoords;
