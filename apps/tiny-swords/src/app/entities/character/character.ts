import { WithSetPersonageContext } from '../../abilities/abilities.types';
import { Tile } from '../tile/tile';
import { CoordsTuple } from '../tile/tile.types';
import { CharacterConfig } from './character.types';

export default class Character<
  Abilities extends Record<string | symbol | number, WithSetPersonageContext>,
> extends Tile<string> {
  protected _sprite = '/img/Factions/Knights/Troops/Warrior/Blue/Warrior_Blue.png';
  protected _type = 'character';
  protected _abilities: Abilities;
  protected _scale = 0.75;
  protected _size = 192;
  protected _row = 0;
  protected _col = 0;

  constructor({ abilities }: CharacterConfig<Abilities> = {}) {
    super();

    if (abilities) {
      this._abilities = abilities;

      for (const key in abilities) {
        abilities[key].setContext(this);
      }
    }
  }

  get abilities() {
    return this._abilities;
  }

  /**
   * Возвращает способность персонажа по её ключу
   *
   * @param name Ключ способности
   * @returns Объект способности
   */
  getAbility<T extends keyof Abilities>(name: T): Abilities[T] {
    return this._abilities[name];
  }

  /**
   * Устанавливает тип персонажа, что определяет его внешний вид
   *
   * @param type Тип персонажа
   */
  setType(type: string): void {
    this._type = type;
  }

  protected _getCoordsMap(): Record<string, CoordsTuple> {
    return {
      character: [this._size, this._size],
    };
  }
}
