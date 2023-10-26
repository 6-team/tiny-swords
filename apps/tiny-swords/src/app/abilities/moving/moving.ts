import { TCollisionArea } from '../abilities.types';
import { TNumberOfPixels, TPixelsPosition } from '../../common/common.types';
import { MovingError, PIXELS_PER_FRAME, movementSetters, nextMoveCoordsGetters } from './moving.const';
import { IMoving, IMovingCharacter, IMovingProps } from './moving.types';
import { BehaviorSubject, Observable, combineLatest, distinctUntilChanged, filter, map, withLatestFrom } from 'rxjs';
import { HeroActionAnimation } from '../../entities/hero/hero.const';
import { grid64 } from '../../core/grid';
import { MovingDirection, CharacterDirection } from '@shared';
import { animationInterval$ } from '../../tools/observables/interval';

/**
 * Класс для передвигающихся элементов.
 * Координаты задаются в тайлах, а выбранная система координат уже переводит значения в пиксели
 */
export class Moving implements IMoving {
  private _breakpoints$ = new BehaviorSubject<boolean>(true);
  private _moveStream$ = new BehaviorSubject(MovingDirection.IDLE);
  private _animationStream$ = new BehaviorSubject(MovingDirection.IDLE);
  private _lastDirection = MovingDirection.IDLE;

  private _sizes: [height: TNumberOfPixels, width: TNumberOfPixels];
  private _direction = CharacterDirection.RIGHT;
  private _movingProgressRemaining = 0;
  private _breakpointReached: boolean = true;
  private _getCollisionAreaFunc?: IMovingProps['getCollisionArea'];
  private _coords$: BehaviorSubject<[TPixelsPosition, TPixelsPosition]>;
  private _context?: IMovingCharacter;

  readonly coords$: Observable<[TPixelsPosition, TPixelsPosition]>;
  readonly breakpoints$: Observable<[TPixelsPosition, TPixelsPosition]>;
  readonly movements$: Observable<MovingDirection> = this._moveStream$.asObservable();

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
   * Устанавливает контекст/носителя данной способности.
   * Нужно, чтобы вызывать его методы, такие как показ анимации, изменение изображения и т.п.
   *
   * @param context Контекст
   * @returns Объект способности
   */
  setContext(context: IMovingCharacter) {
    this._context = context;

    return this;
  }

  /**
   * Устанавливает направление персонажа, пока он стоит на месте.
   *
   * @param direction Направление персонажа
   * @returns Объект способности
   */
  setCharacterDirection(direction: CharacterDirection) {
    this._setCharacterDirection(direction);
    this._context.setAnimation(
      this.isRightDirection ? HeroActionAnimation.STANDS_STILL : HeroActionAnimation.STANDS_STILL_LEFT,
    );

    return this;
  }

  /**
   * Принудительно устанавливает координаты персонажу
   *
   * @param coords Новые координаты
   * @returns Объект способности
   */
  setCoords(coords: [TPixelsPosition, TPixelsPosition]) {
    this._coords$.next(coords);

    return this;
  }

  /**
   * Проверяет, задан ли у этой способности контекст, то есть персонаж
   *
   * @returns Доступен ли контекст
   */
  private _hasContext = () => {
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
   * Обрабатывает получение нового фрейма.
   * В каждом фрейме проверяется, происходит ли сейчас движение персонажа.
   * И если перстнаж стоит на месте, только тогда ему задаётся новое направление движения.
   *
   * @private
   * @param param0 [time, direction, movement, coords]
   * @returns Объект способности
   */
  private _handleFrameChange = ([_, direction]): this => {
    /**
     * Если вручную не остановлен и остались еще непройденные пиксели, то продолжаем двигать
     */
    if (this._movingProgressRemaining > 0) {
      this._movingProgressRemaining -= PIXELS_PER_FRAME;
      this._breakpointReached = false;
      this._coords$.next(movementSetters[this._lastDirection](this._coords$.getValue()));

      return this;
    }

    /**
     * Если движение закончилось, но команда на движение не была прекращена
     */
    if (this._movingProgressRemaining === 0 && direction !== MovingDirection.IDLE) {
      this._movingProgressRemaining = grid64.tileSize;
      this._lastDirection = direction;
      this._breakpoints$.next(true);

      return this;
    }

    /**
     * Если движение закончилось, и последняя команда не требует нового движения
     */
    if (this._movingProgressRemaining === 0 && direction === MovingDirection.IDLE && !this._breakpointReached) {
      this._lastDirection = direction;
      this._breakpointReached = true;
      this._breakpoints$.next(true);
    }

    return this;
  };

  /**
   * Обрабатывает получение нового направления движения: устанавливает нужную анимацию движения.
   *
   * @private
   * @param direction Направление движения
   * @returns Объект способности
   */
  private _handleMovementChange = (direction: MovingDirection): this => {
    this._setCharacterDirection(direction);
    this._setAnimation(direction);

    return this;
  };

  /**
   * Устанавливает флаг, что персонаж повернут вправо
   *
   * @private
   * @param direction Направление движения персонажа
   * @returns Объект способности
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
   * Задаёт анимацию движения персонажу, исходя из полученного направления движения
   *
   * @private
   * @param direction Направление движения персонажа
   * @returns Объект способности
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
   * Возвращает зону коллизии персонажа, которая будет при перемещении в указанном направлении.
   *
   * @param direction Направление движения
   * @returns Координаты и размеры
   */
  getNextCollisionArea(direction: MovingDirection) {
    const nextCoordsGetter = nextMoveCoordsGetters[direction];
    const collisionArea = this.getCollisionArea();
    const coords = nextCoordsGetter([collisionArea[0], collisionArea[1]]);
    const next: TCollisionArea = [coords[0], coords[1], collisionArea[2], collisionArea[3]];

    return next;
  }

  /**
   * Возвращает зону персонажа, которая участвует в сравнении коллизий.
   *
   * @returns Зона для сравнения коллизий
   */
  getCollisionArea(): TCollisionArea {
    return this._getCollisionAreaFunc
      ? this._getCollisionAreaFunc(this)
      : [this.coords[0], this.coords[1], this._sizes[0], this._sizes[1]];
  }

  moveTo(direction: MovingDirection): this {
    this._moveStream$.next(direction);

    return this;
  }

  animate(direction: MovingDirection): this {
    this._animationStream$.next(direction);

    return this;
  }

  get coords() {
    return this._coords$.getValue();
  }

  get isMoving() {
    return !this._breakpointReached;
  }

  get isRightDirection() {
    return this._direction === CharacterDirection.RIGHT;
  }

  get isLeftDirection() {
    return this._direction === CharacterDirection.LEFT;
  }

  get sizes() {
    return this._sizes;
  }
}
