import { Tile } from '../entites/tile/tile';
import { CoordsTuple } from '../entites/tile/tile.types';

export default class Character extends Tile<string> {
  protected _sprite = '/img/Factions/Knights/Troops/Warrior/Blue/Warrior_Blue.png';
  protected _type = 'character';
  protected _scale = 0.75;
  protected _size = 192;
  protected _row = 0;
  protected _col = 0;

  setType(type: string): void {
    this._type = type;
  }

  protected _getCoordsMap(): Record<string, CoordsTuple> {
    return {
      character: [this._size, this._size],
    };
  }
}
