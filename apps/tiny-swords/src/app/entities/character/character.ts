import { WithSetPersonageContext } from '../../abilities/abilities.types';
import { Tile } from '../tile/tile';
import { CharacterConfig } from './character.types';

export default abstract class Character<
  CharacterType extends string | number | symbol,
  Abilities extends Record<string | symbol | number, WithSetPersonageContext>,
> extends Tile<CharacterType> {
  protected _abilities: Abilities;

  id: string;

  constructor({ abilities, id }: CharacterConfig<Abilities> = {}) {
    super();
    this.id = id;

    if (abilities) {
      this._abilities = abilities;

      for (const key in abilities) {
        abilities[key].setContext(this);
      }
    }
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
}
