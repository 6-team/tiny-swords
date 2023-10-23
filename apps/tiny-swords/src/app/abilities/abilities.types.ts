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
import { MovingDirection, AttackingType, CharacterDirection } from '@shared';
import { IController } from '../controllers';

export interface IAbility<Context> {
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
   * Поток, в котором приходят массивы ресурсов, имеющихся у персонажа
   */
  collection$: Observable<Array<IResource>>;

  /**
   * Помещает предмет коллекционирования в коллекцию
   *
   * @param item Предмет коллекционирования
   */
  collect(item: IResource): this;
}

export interface IAttacking extends IAbility<IAttackingCharacter> {
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

export interface IMovable extends IAbility<IMovableCharacter> {
  /**
   * Размеры персонажа
   */
  sizes: [height: number, width: number];

  /**
   * Поток координат персонажа
   */
  coords: [x: TNumberOfPixels, y: TNumberOfPixels];

  /**
   * В движении ли персонаж в данный момент
   */
  isMoving: boolean;

  /**
   * Повернут ли персонаж вправо
   */
  isRightDirection: boolean;

  /**
   * Устанавливает направление персонажа, пока он стоит на месте.
   *
   * @param direction Направление персонажа
   * @returns Объект способности
   */
  setCharacterDirection(direction: CharacterDirection): this;

  /**
   * Принудительно устанавливает координаты персонажу
   *
   * @param coords Новые координаты
   * @returns Объект способности
   */
  setCoords(coords: [x: TNumberOfPixels, y: TNumberOfPixels]): this;

  /**
   * Запускает движение персонажа в указанном направлении
   *
   * @param direction Направление движения
   * @returns Объект способности
   */
  moveTo(direction: MovingDirection): this;

  /**
   * Запускает анимацию персонажа для указанного направления
   *
   * @param direction Направление движения
   * @returns Объект способности
   */
  animate(direction: MovingDirection): this;

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
   * Поток направлений движения
   */
  movements$: Observable<MovingDirection>;

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
