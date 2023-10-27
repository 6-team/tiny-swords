import { CoordsTuple, Sprite } from '@entities/sprite';

import { TowerType, mapTerrainToCoords } from './tower.const';

/**
 * Represents a sprite with a tower entity.
 *
 * @extends Sprite
 */
export class TowerSprite extends Sprite<TowerType> {
  /**
   * The type of the tower.
   * @protected
   * @type {TowerType}
   */
  protected _type: TowerType;

  /**
   * The sprite URL for the tower sprite.
   * @protected
   * @type {string}
   */
  protected _sprite = './img/Factions/Knights/Buildings/Tower/Tower_Blue.png';

  /**
   * Creates a new `TowerSprite` instance with the specified type.
   *
   * @param {TowerType} type - The type of the tower sprite.
   */
  constructor(type: TowerType = TowerType.TOP_LEFT) {
    super();

    this.setType(type);
  }

  /**
   * Sets the type of the tower.
   *
   * @param {TowerType} type - The type of the tower.
   */
  setType(type: TowerType = TowerType.TOP_LEFT): void {
    this._type = type;
  }

  /**
   * Gets the coordinates map for tower sprites.
   * @protected
   * @returns {Record<T, CoordsTuple>} - The coordinates map.
   */
  protected _getCoordsMap(): Record<TowerType, CoordsTuple> {
    return mapTerrainToCoords;
  }
}
