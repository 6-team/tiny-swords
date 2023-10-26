import { AttackingType, MovingDirection } from '../enums';
import { IEntity } from './entity.types';

/**
 * Class representing an entity in the game.
 */
export class Entity implements IEntity {
  /**
   * Unique identifier for the entity.
   * @type {string}
   */
  id!: string;

  /**
   * Coordinates of the entity in the format [x, y].
   * @type {[number, number]?}
   */
  coords?: [number, number];

  /**
   * Coordinates where the entity stops in the format [x, y].
   * @type {[number, number]?}
   */
  breakpoint?: [number, number];

  /**
   * The current movement direction of the entity.
   * @type {MovingDirection | null}
   */
  direction: MovingDirection | null = null;

  /**
   * The attacking type of the entity.
   * @type {AttackingType | null}
   */
  attackingType: AttackingType | null = null;

  /**
   * A flag indicating whether the entity is deceased (dead).
   * @type {boolean}
   */
  isDied: boolean = false;

  /**
   * Creates a new entity based on the provided data.
   * @param {IEntity} entity - An object containing entity data.
   */
  constructor(entity: IEntity) {
    Object.assign(this, entity);
  }
}
