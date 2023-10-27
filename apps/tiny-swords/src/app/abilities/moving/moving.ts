import { TCollisionArea } from '@abilities/abilities.types';
import { TNumberOfPixels, TPixelsPosition } from '@common/common.types';
import { MovingError, PIXELS_PER_FRAME, movementSetters, nextMoveCoordsGetters } from './moving.const';
import { IMoving, IMovingCharacter, IMovingProps } from './moving.types';
import { BehaviorSubject, Observable, combineLatest, distinctUntilChanged, filter, map, withLatestFrom } from 'rxjs';
import { HeroActionAnimation } from '@entities/hero';
import { grid64 } from '@core/grid';
import { MovingDirection, CharacterDirection } from '@shared';
import { animationInterval$ } from '@tools/observables';

/**
 * Moving is a class for handling moving elements.
 * Coordinates are specified in sprites, and the chosen coordinate system then translates the values into pixels
 *
 * @class
 * @implements {IMoving}
 */
export class Moving implements IMoving {
  private _breakpoints$ = new BehaviorSubject<boolean>(true);
  private _moveStream$ = new BehaviorSubject(MovingDirection.IDLE);
  private _animationStream$ = new BehaviorSubject(MovingDirection.IDLE);
  private _lastDirection = MovingDirection.IDLE;

  private _sizes: [height: TNumberOfPixels, width: TNumberOfPixels];
  private _direction = CharacterDirection.RIGHT;
  private _movingProgressRemaining = 0;
  private _breakpointReached = true;
  private _getCollisionAreaFunc?: IMovingProps['getCollisionArea'];
  private _coords$: BehaviorSubject<[TPixelsPosition, TPixelsPosition]>;
  private _context?: IMovingCharacter;

  readonly coords$: Observable<[TPixelsPosition, TPixelsPosition]>;
  readonly breakpoints$: Observable<[TPixelsPosition, TPixelsPosition]>;
  readonly movements$: Observable<MovingDirection> = this._moveStream$.asObservable();

  /**
   * Creates a Moving instance.
   *
   * @param {object} props - An object containing properties for creating a Moving instance.
   *
   * @param {TNumberOfPixels} props.height - The height of the moving element.
   * @param {TNumberOfPixels} props.width - The width of the moving element (uses the same value as height if not provided).
   * @param {TPixelsPosition} props.initialX - The initial x-coordinate of the moving element.
   * @param {TPixelsPosition} props.initialY - The initial y-coordinate of the moving element.
   * @param {IMovingProps['getCollisionArea']} props.getCollisionArea - Function to get the collision area of the moving element.
   */
  constructor({ height, width, initialX, initialY, getCollisionArea }: IMovingProps) {
    this._sizes = [height, width || height];
    this._getCollisionAreaFunc = getCollisionArea;

    this._coords$ = new BehaviorSubject<[TPixelsPosition, TPixelsPosition]>([initialX, initialY]);
    this.coords$ = this._coords$.asObservable();
    this.breakpoints$ = this._breakpoints$.pipe(
      filter(this._hasContext),
      withLatestFrom(this._coords$),
      map(([_, coords]) => coords),
    );

    this.breakpoints$
      .pipe(
        map(() => this._lastDirection),
        distinctUntilChanged(),
      )
      .subscribe(this._handleMovementChange);

    this._animationStream$.pipe(filter(this._hasContext)).subscribe(this._handleAnimationChange);

    combineLatest([animationInterval$, this._moveStream$])
      .pipe(filter(this._hasContext))
      .subscribe(this._handleFrameChange);
  }

  /**
   * Sets the context or the host of this ability.
   * It is used to call upon its methods, such as the display of animations, modifying the image, etc.
   *
   * @param {IMovingCharacter} context - The context.
   *
   * @returns {Moving} - Returns Moving object.
   */
  setContext(context: IMovingCharacter): this {
    this._context = context;

    return this;
  }

  /**
   * Sets the character's direction while the character is standing still.
   *
   * @param {CharacterDirection} direction Character direction
   * @returns {this}
   */
  setCharacterDirection(direction: CharacterDirection): this {
    this._setCharacterDirection(direction);
    this._context.setAnimation(
      this.isRightDirection ? HeroActionAnimation.STANDS_STILL : HeroActionAnimation.STANDS_STILL_LEFT,
    );

    return this;
  }

  /**
   * Forcibly sets coordinates to a character
   *
   * @param {[TPixelsPosition, TPixelsPosition]} coords Новые координаты
   * @returns {this}
   */
  setCoords(coords: [TPixelsPosition, TPixelsPosition]): this {
    this._coords$.next(coords);

    return this;
  }

  /**
   * Checks if this ability has a context, i.e. character
   *
   * @returns {boolean} -  Whether context is available
   */
  private _hasContext = (): boolean => {
    return Boolean(this._context);
  };

  private _handleAnimationChange = (direction: MovingDirection): this => {
    if (this.isMoving) {
      return this;
    }

    this._handleMovementChange(direction);

    return this;
  };

  /**
   * Processes the receipt of a new frame.
   * Each frame checks if the character is currently moving.
   * And if the finger is standing still, only then it is given a new direction of movement.
   *
   * @private
   * @param param0 [time, direction, movement, coords]
   * @returns {this}
   */
  private _handleFrameChange = ([_, direction]): this => {
    /**
     * If manually not stopped and there are still unpassed pixels, keep moving it
     */
    if (this._movingProgressRemaining > 0) {
      this._movingProgressRemaining -= PIXELS_PER_FRAME;
      this._breakpointReached = false;
      this._coords$.next(movementSetters[this._lastDirection](this._coords$.getValue()));

      return this;
    }

    /**
     * If the movement has ended but the movement command has not been terminated
     */
    if (this._movingProgressRemaining === 0 && direction !== MovingDirection.IDLE) {
      this._movingProgressRemaining = grid64.spriteSize;
      this._lastDirection = direction;
      this._breakpoints$.next(true);

      return this;
    }

    /**
     * If the movement has ended and the last command does not require a new movement
     */
    if (this._movingProgressRemaining === 0 && direction === MovingDirection.IDLE && !this._breakpointReached) {
      this._lastDirection = direction;
      this._breakpointReached = true;
      this._breakpoints$.next(true);
    }

    return this;
  };

  /**
   * Processes the receipt of a new motion direction: sets the desired motion animation.
   *
   * @private
   * @param {MovingDirection} direction Direction of movement
   * @returns {this}
   */
  private _handleMovementChange = (direction: MovingDirection): this => {
    this._setCharacterDirection(direction);
    this._setAnimation(direction);

    return this;
  };

  /**
   * Sets a flag that the character is turned to the right
   *
   * @private
   * @param {MovingDirection | CharacterDirection} direction Direction of movement
   * @returns {this}
   */
  private _setCharacterDirection(direction: MovingDirection | CharacterDirection): this {
    if ([MovingDirection.LEFT, CharacterDirection.LEFT].includes(direction)) {
      this._direction = CharacterDirection.LEFT;
    }

    if ([MovingDirection.RIGHT, CharacterDirection.RIGHT].includes(direction)) {
      this._direction = CharacterDirection.RIGHT;
    }

    return this;
  }

  /**
   * Sets the character's movement animation based on the received movement direction
   *
   * @private
   * @param direction Direction of character movement
   * @returns {this}
   */
  private _setAnimation(direction: MovingDirection): this {
    if (!this._context) {
      throw new Error(MovingError.PERSONAGE_NOT_SET);
    }

    const mapDirectionToAnimation = {
      [MovingDirection.IDLE]: () =>
        this._context.setAnimation(
          this.isRightDirection ? HeroActionAnimation.STANDS_STILL : HeroActionAnimation.STANDS_STILL_LEFT,
        ),
      [MovingDirection.LEFT]: () => this._context.setAnimation(HeroActionAnimation.RUN_LEFT),
      [MovingDirection.RIGHT]: () => this._context.setAnimation(HeroActionAnimation.RUN),
      [MovingDirection.UP]: () =>
        this._context.setAnimation(this.isRightDirection ? HeroActionAnimation.RUN : HeroActionAnimation.RUN_LEFT),
      [MovingDirection.DOWN]: () =>
        this._context.setAnimation(this.isRightDirection ? HeroActionAnimation.RUN : HeroActionAnimation.RUN_LEFT),
    };

    const animate = mapDirectionToAnimation[direction];

    if (animate) {
      animate();
    }

    return this;
  }

  /**
   * Returns the character's collision zone, which will be when moving in the specified direction.
   *
   * @param {MovingDirection} direction Direction of movement
   * @returns {TCollisionArea} Coordinates and dimensions
   */
  getNextCollisionArea(direction: MovingDirection): TCollisionArea {
    const nextCoordsGetter = nextMoveCoordsGetters[direction];
    const collisionArea = this.getCollisionArea();
    const coords = nextCoordsGetter([collisionArea[0], collisionArea[1]]);
    const next: TCollisionArea = [coords[0], coords[1], collisionArea[2], collisionArea[3]];

    return next;
  }

  /**
   * Returns the character's zone that is involved in the collision comparison.
   *
   * @returns Area for comparison of collisions
   */
  getCollisionArea(): TCollisionArea {
    return this._getCollisionAreaFunc
      ? this._getCollisionAreaFunc(this)
      : [this.coords[0], this.coords[1], this._sizes[0], this._sizes[1]];
  }
  /**
   * Movement
   * @param {MovingDirection} direction
   * @returns {this}
   */
  moveTo(direction: MovingDirection): this {
    this._moveStream$.next(direction);

    return this;
  }

  /**
   * Animate
   * @param {MovingDirection} direction
   * @returns {this}
   */
  animate(direction: MovingDirection): this {
    this._animationStream$.next(direction);

    return this;
  }

  /**
   * Getting coordinates
   */
  get coords() {
    return this._coords$.getValue();
  }

  /**
   * Check if there is movement
   */
  get isMoving() {
    return !this._breakpointReached;
  }

  /**
   * Checking if the hero is looking to the right side
   */
  get isRightDirection() {
    return this._direction === CharacterDirection.RIGHT;
  }

  /**
   * Checking if the hero is looking to the left side
   */
  get isLeftDirection() {
    return this._direction === CharacterDirection.LEFT;
  }

  /**
   * Getting the size
   */
  get sizes() {
    return this._sizes;
  }
}
