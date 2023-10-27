import { TCollisionArea } from '@abilities/abilities.types';
import { AttackingError } from './fighting.const';
import { BehaviorSubject, Observable, Subject, filter, map, noop } from 'rxjs';
import { HeroActionAnimation } from '@entities/hero/hero.const';
import { IFightingProps, IFighting, IFightingCharacter } from './fighting.types';
import { AttackingType } from '@shared';
import { TOTAL_LIVES } from '@common/common.const';
import { IMovingCharacter } from '@abilities/moving/moving.types';

const isNotPositiveNumber = (count: number) => count <= 0;

/**
 * Defines a class responsible for all fighting related logics of a character.
 * This class manages the acts like attack, taking damages, adding lives, life blocking and unblocking.
 *
 * @implements IFighting
 *
 * @property {Observable<AttackingType>} attack$ - Observable stream of attack events.
 * @property {Observable<boolean>} isAttacking$ - Observable stream indicating if the character is currently attacking.
 * @property {Observable<boolean>} isHitted$ - Observable stream indicating if the character is hit.
 * @property {Observable<number>} livesCount$ - Observable stream for the count of current lives.
 * @property {Observable<number>} blockedLivesCount$ - Observable stream for the count of currently blocked lives.
 * @property {Observable<boolean>} isDied$ - Observable stream indicating if the character has died.
 */
export class Fighting implements IFighting {
  private _context?: IFightingCharacter & IMovingCharacter;
  private _getAffectedAreaFunc: IFightingProps['getAffectedArea'];

  private _initialConfig: IFightingProps;
  private _attack$ = new Subject<AttackingType>();
  private _isAttacking$ = new BehaviorSubject<boolean>(false);
  private _isHitted$ = new Subject<boolean>();
  private _livesCount$: BehaviorSubject<number>;
  private _blockedLivesCount$: BehaviorSubject<number>;

  readonly attack$ = this._attack$.asObservable();
  readonly isAttacking$ = this._isAttacking$.asObservable();
  readonly isHitted$ = this._isHitted$.asObservable();

  readonly livesCount$: Observable<number>;
  readonly blockedLivesCount$: Observable<number>;
  readonly isDied$: Observable<boolean>;

  constructor(config: IFightingProps) {
    this._getAffectedAreaFunc = config.getAffectedArea;

    this._livesCount$ = new BehaviorSubject(config.availibleLives);
    this._blockedLivesCount$ = new BehaviorSubject(config.blockedLives);

    this.livesCount$ = this._livesCount$.asObservable();
    this.blockedLivesCount$ = this._blockedLivesCount$.asObservable();
    this.isDied$ = this._livesCount$.pipe(map(isNotPositiveNumber), filter(Boolean));

    this._initialConfig = config;
  }

  /**
   * Calculates the area in front of the character where the character will attack and which will be considered a kill zone for others.
   *
   * @throws {Error} if personage is not set.
   * @returns {TCollisionArea}  The affected area as a tuple of pixels
   */
  getAffectedArea(): TCollisionArea {
    if (!this._context) {
      throw new Error(AttackingError.PERSONAGE_NOT_SET);
    }

    const collisionArea = this._context.moving.getCollisionArea();

    if (this._getAffectedAreaFunc) {
      return this._getAffectedAreaFunc(this);
    }

    return this._context.moving.isRightDirection
      ? this._getRightAffectedArea(collisionArea)
      : this._getLeftAffectedArea(collisionArea);
  }

  /**
   * Checks if the character is attacking.
   *
   * @returns {boolean}
   */
  get isAttacking(): boolean {
    return this._isAttacking$.getValue();
  }

  /**
   * Sets the context/carrier of this ability.
   * Need it to call its methods, such as showing animations, changing the image, etc.
   *
   * @param context {IFightingCharacter & IMovingCharacter} - The context
   * @returns {this}
   */
  setContext(context: IFightingCharacter & IMovingCharacter): this {
    this._context = context;

    return this;
  }

  /**
   * Method to attack.
   *
   *  @param type {AttackingType} - The type of attack
   *  @throws {Error} if personage is not set.
   *  @returns {this}
   */
  attack(type: AttackingType = AttackingType.DOWN): this {
    if (!this._context) {
      throw new Error(AttackingError.PERSONAGE_NOT_SET);
    }

    const { isMoving, isRightDirection } = this._context.moving;

    if (!isMoving && !this.isAttacking) {
      this._setIsAttacking();
      this._attack$.next(type);

      this._context
        .setAnimationOnce(this._getAnimationWithDirection(type, isRightDirection))
        .then(() => {
          this._setIsAttacking(false);
        })
        .catch(noop);
    }

    return this;
  }

  /**
   * Method for taking damage. Takes one life
   *
   * @returns {this}
   */
  takeDamage(): this {
    this._livesCount$.next(this._livesCount$.getValue() - 1);
    this._isHitted$.next(true);

    return this;
  }

  /**
   * Method of adding one life
   *
   * @returns {this}
   */
  addLive(): this {
    const lives = this._livesCount$.getValue();

    if (this.checkAddLive()) this._livesCount$.next(lives + 1);

    return this;
  }

  /**
   * Unblocks a life if possible.
   *
   * @returns {this}
   */
  unblockLive(): this {
    const prev = this._blockedLivesCount$.getValue();

    if (prev >= 1) {
      this._blockedLivesCount$.next(prev - 1);
    }

    return this;
  }

  /**
   * Resets the state of the ability.
   *
   * @returns {this}
   */
  reset(): this {
    this._livesCount$.next(this._initialConfig.availibleLives);
    this._blockedLivesCount$.next(this._initialConfig.blockedLives);

    return this;
  }

  /**
   * Checks if it's possible to add a life.
   *
   * @returns {boolean}
   */
  checkAddLive(): boolean {
    const blockedLives = this._blockedLivesCount$.getValue();
    const availableLives = this._livesCount$.getValue();
    return availableLives + blockedLives < TOTAL_LIVES;
  }

  /**
   * Method to check if life can be unlocked
   *
   * @returns {boolean}
   */
  checkUnblockLive(): boolean {
    return !!this._blockedLivesCount$.getValue();
  }

  /**
   * Returns the animation number based on the type of impact and direction of movement
   *
   * @param type Attack's type
   * @param isRightDirection Character direction
   * @returns Animation
   */
  private _getAnimationWithDirection(type: AttackingType, isRightDirection: boolean): HeroActionAnimation {
    switch (type) {
      case AttackingType.DOWN:
        return isRightDirection ? HeroActionAnimation.RIGHT_ATTACK_DOWN : HeroActionAnimation.LEFT_ATTACK_DOWN;
      case AttackingType.UP:
        return isRightDirection ? HeroActionAnimation.RIGHT_ATTACK_UP : HeroActionAnimation.LEFT_ATTACK_UP;
    }
  }
  /**
   * Getting the right affected area
   * @param area
   * @returns {TCollisionArea}
   */
  private _getRightAffectedArea(area: TCollisionArea): TCollisionArea {
    return [area[0] + 64, area[1], area[2], area[3]];
  }

  /**
   * Getting the left affected area
   * @param area
   * @returns {TCollisionArea}
   */
  private _getLeftAffectedArea(area: TCollisionArea): TCollisionArea {
    return [area[0] - 64, area[1], area[2], area[3]];
  }

  /**
   * Sets up an attack
   * @param isAttacking
   */
  private _setIsAttacking(isAttacking = true): void {
    this._isAttacking$.next(isAttacking);
  }
}
