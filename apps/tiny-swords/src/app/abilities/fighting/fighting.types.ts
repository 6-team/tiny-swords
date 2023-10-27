import { Observable } from 'rxjs';
import { IAbility, TCollisionArea, TPixelsCoords } from '@abilities/abilities.types';
import { AttackingType } from '@shared';
import { ICharacter } from '@common/common.types';

export interface IFightingProps {
  getAffectedArea?: (fighting: IFighting) => TCollisionArea;
  availibleLives: number;
  blockedLives: number;
}

export type IFightingCharacter = ICharacter<{ fighting: IFighting }> & {
  fighting: IFighting;
};

export interface IFighting extends IAbility<IFightingCharacter> {
  /**
   * Stream of attacks
   */
  attack$: Observable<AttackingType>;

  /**
   * Stream of attack states: attack started, attack ended
   */
  isAttacking$: Observable<boolean>;

  /**
   * Stream of the state of death
   */
  isDied$: Observable<boolean>;

  /**
   * Stream of diminishing lives
   */
  isHitted$: Observable<boolean>;

  /**
   * Slow of the number of available lives
   */
  livesCount$: Observable<number>;

  /**
   * Stream of the number of blocked lives
   */
  blockedLivesCount$: Observable<number>;

  /**
   * Is the character attacking right now
   */
  isAttacking: boolean;

  /**
   * Method for attacking.
   *
   * @param type Attack type
   * @returns Object of ability
   */
  attack(type?: AttackingType): this;

  /**
   * Method for taking damage
   *
   * @returns Object of ability
   */
  takeDamage(): this;

  /**
   * Method for resetting the state of an ability
   *
   * @returns Object of ability
   */
  reset(): this;

  /**
   * Method of adding one life
   *
   * @returns Object of ability
   */
  addLive(): this;

  /**
   * Method to unlock one life
   *
   * @returns Object of ability
   */
  unblockLive(): this;

  /**
   * Method to test whether life can be added
   *
   */
  checkAddLive(): boolean;

  /**
   * Method to check if life can be unlocked
   *
   */
  checkUnblockLive(): boolean;

  /**
   * Calculates the area where the character will attack and which will be considered a kill zone for others.
   *
   * @returns The affected area as a tuple of pixels
   */
  getAffectedArea(): TPixelsCoords;
}
