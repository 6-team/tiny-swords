import { CharacterDirection, MovingDirection } from '@shared';
import { ICharacter, TNumberOfPixels } from '../../common/common.types';
import { IAbility, TCollisionArea } from '../abilities.types';
import { Observable } from 'rxjs';

export interface IMovingProps {
  initialX: TNumberOfPixels;
  initialY: TNumberOfPixels;
  height: TNumberOfPixels;
  width?: TNumberOfPixels;
  getCollisionArea?: (movable: IMoving) => TCollisionArea;
}

export type IMovingCharacter = ICharacter<{ moving: IMoving }> & {
  moving: IMoving;
};

export interface IMoving extends IAbility<IMovingCharacter> {
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
