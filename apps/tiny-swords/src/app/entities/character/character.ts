import { WithSetPersonageContext } from '../../abilities/abilities.types';
import { ICharacter } from '../../common/common.types';
import { Sprite } from '../sprite/sprite';
import { CharacterConfig } from './character.types';

export default abstract class Character<
    CharacterType extends string | number | symbol,
    Abilities extends Record<string | symbol | number, WithSetPersonageContext>,
  >
  extends Sprite<CharacterType>
  implements ICharacter<Abilities>
{
  protected _abilities: Abilities;

  id: string;

  constructor({ id }: CharacterConfig = {}) {
    super();
    this.id = id;
  }

  protected _setAbilities(abilities: Abilities) {
    this._abilities = abilities;

    for (const key in abilities) {
      abilities[key].setContext(this);
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
