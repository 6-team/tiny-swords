import { CoordsTuple, Sprite } from '@entities/sprite';

import { SheepType, mapSheepToCoords } from './sheep.const';

/**
 * Represents a sprite with a sheep entity.
 * @extends Sprite
 */
export class SheepSprite extends Sprite<SheepType> {
  /**
   * The type of the sheep.
   * @type {SheepType}
   * @private
   */
  protected _type: SheepType;

  /**
   * The sprite URL for the sheep.
   * @type {string}
   * @private
   */
  protected _sprite = './img/Resources/Sheep/HappySheep_Idle.png';

  /**
   * Creates an instance of the SheepSprite.
   * @param {SheepType} type - The type of the sheep (default is SheepType.SHEEP_RIGHT).
   */
  constructor(type = SheepType.SHEEP_RIGHT) {
    super();

    this.setType(type);
  }

  /**
   * Sets the type of the sheep.
   * @param {SheepType} type - The type of the sheep (default is SheepType.SHEEP_RIGHT).
   */
  setType(type = SheepType.SHEEP_RIGHT) {
    this._type = type;
  }

  /**
   * Gets the coordinates map for sheep.
   * @private
   * @returns {Record<SheepType, CoordsTuple>} - The map of sheep coordinates.
   */
  protected _getCoordsMap(): Record<SheepType, CoordsTuple> {
    return mapSheepToCoords;
  }
}
