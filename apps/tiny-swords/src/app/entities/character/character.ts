import { WithSetPersonageContext } from '@abilities/abilities.types';
import { ICharacter } from '@common/common.types';
import { Sprite } from '@entities/sprite';
import { CharacterConfig } from './character.types';

/**
 * This class represents a Character with specific type and abilities.
 * The type of the character is determined by CharacterType, whereas its abilities are
 * determined by Abilities. The class extends from the Sprite class and implements the
 * ICharacter interface.
 *
 * @template CharacterType
 * @template Abilities
 *
 * @extends {Sprite<CharacterType>}
 * @implements {ICharacter<Abilities>}
 */
export default abstract class Character<
    CharacterType extends string | number | symbol,
    Abilities extends Record<string | symbol | number, WithSetPersonageContext>,
  >
  extends Sprite<CharacterType>
  implements ICharacter<Abilities>
{
  /**
   * A protected member variable to store the abilities of the character.
   * @type {Abilities}
   * @protected
   */
  protected _abilities: Abilities;

  /**
   * Public member variable that contains the ID of the character.
   * @type {string}
   */
  id: string;

  constructor({ id }: CharacterConfig = {}) {
    super();
    this.id = id;
  }

  /**
   * Sets the abilities for this character.
   *
   * @param {Abilities} abilities
   * @protected
   */
  protected _setAbilities(abilities: Abilities): void {
    this._abilities = abilities;

    for (const key in abilities) {
      abilities[key].setContext(this);
    }
  }

  /**
   * Returns the ability of the character as an object based on its key.
   *
   * @param {T} name The key of the ability
   * @return {Abilities[T]} The ability object related to the key
   * @template T
   */
  getAbility<T extends keyof Abilities>(name: T): Abilities[T] {
    return this._abilities[name];
  }
}
