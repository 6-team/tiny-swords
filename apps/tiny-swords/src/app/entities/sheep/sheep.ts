import { CoordsTuple, Tile } from '@entities/tile';

import { SheepType, mapSheepToCoords } from './sheep.const';

/**
 * Represents a tile with a sheep entity.
 * @extends Tile
 */
export class SheepTile extends Tile<SheepType> {
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
   * Creates an instance of the SheepTile.
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
