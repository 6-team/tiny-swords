import { AttackingType, MovingDirection } from '../enums';
import { IEntity } from './entity.types';

/**
 * Класс, представляющий сущность в игре.
 */
export class Entity implements IEntity {
  /**
   * Уникальный идентификатор сущности.
   * @type {string}
   */
  id!: string;

  /**
   * Координаты сущности в формате [x, y].
   * @type {[number, number]?}
   */
  coords?: [number, number];

  /**
   * Координаты остановки сущности в формате [x, y].
   * @type {[number, number]?}
   */
  breakpoint?: [number, number];

  /**
   * Текущее направление движения сущности.
   * @type {MovingDirection | null}
   */
  direction: MovingDirection | null = null;

  /**
   * Тип атаки сущности.
   * @type {AttackingType | null}
   */
  attackingType: AttackingType | null = null;

  /**
   * Флаг, указывающий, мертва ли сущность.
   * @type {boolean}
   */
  isDied: boolean = false;

  /**
   * Создает новую сущность на основе предоставленных данных.
   * @param {IEntity} entity - Объект, содержащий данные сущности.
   */
  constructor(entity: IEntity) {
    Object.assign(this, entity);
  }
}
