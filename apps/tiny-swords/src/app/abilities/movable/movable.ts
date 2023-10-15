import { IMovable, TCollisionArea } from '../abilities.types';
import { IMovableCharacter, TNumberOfPixels, TPixelsPosition } from '../../common/common.types';
import { MovingError, PIXELS_PER_FRAME, movementSetters, nextMoveCoordsGetters } from './movable.const';
import { MovableProps } from './movable.types';
import { BehaviorSubject, Observable, combineLatest, filter, map, withLatestFrom } from 'rxjs';
import { HeroActionAnimation } from '../../entities/hero/hero.const';
import { frames$ } from '../../tools/observables';
import { grid64 } from '../../core/grid';
import { IController } from '../../controllers';
import { MovingDirection } from '@shared';

/**
 * Класс для передвигающихся элементов.
 * Координаты задаются в тайлах, а выбранная система координат уже переводит значения в пиксели
 */
export class Movable implements IMovable {
  #sizes: [height: TNumberOfPixels, width: TNumberOfPixels];
  #isRightDirection = true;
  #movingProgressRemaining = 0;
  #breakpointReached: boolean = true;
  #getCollisionAreaFunc?: MovableProps['getCollisionArea'];
  #context?: IMovableCharacter;

  private _controller: IController;
  private _lastDirection = MovingDirection.IDLE;
  private _breakpoints$ = new BehaviorSubject<boolean>(true);

  #coords$: BehaviorSubject<[TPixelsPosition, TPixelsPosition]>;

  readonly coords$: Observable<[TPixelsPosition, TPixelsPosition]>;
  readonly breakpoints$: Observable<[TPixelsPosition, TPixelsPosition]>;

  constructor({ height, width, initialX, initialY, getCollisionArea }: MovableProps) {
    this.#sizes = [height, width || height];
    this.#getCollisionAreaFunc = getCollisionArea;

    this.#coords$ = new BehaviorSubject<[TPixelsPosition, TPixelsPosition]>([initialX, initialY]);
    this.coords$ = this.#coords$.asObservable();
    this.breakpoints$ = this._breakpoints$.pipe(
      filter(this.#hasContext),
      withLatestFrom(this.#coords$),
      map(([_, coords]) => coords),
    );

    this.breakpoints$.pipe(map(() => this._lastDirection)).subscribe(this.#handleMovementChange);
  }

  /**
   * Устанавливает контроллер для управления способностью.
   * Для установки понадобился отдельный метод, чтобы была возможность использовать декораторы для контроллера с передачей this
   *
   * @param controller Контроллер
   * @returns Объект способности
   */
  setController(controller: IController) {
    this._controller = controller;

    combineLatest([frames$, this._controller.movement$]).subscribe(this.#handleFrameChange);
    controller.animation$.subscribe(this.#handleAnimationChange);

    return this;
  }

  /**
   * Возвращает объект контроллера, который управляет текущим персонажем
   *
   * @returns Контроллер
   */
  getController() {
    return this._controller;
  }

  /**
   * Устанавливает контекст/носителя данной способности.
   * Нужно, чтобы вызывать его методы, такие как показ анимации, изменение изображения и т.п.
   *
   * @param context Контекст
   * @returns Объект способности
   */
  setContext(context: IMovableCharacter) {
    this.#context = context;

    return this;
  }

  /**
   * Принудительно устанавливает координаты персонажу
   *
   * @param coords Новые координаты
   * @returns Объект способности
   */
  setCoords(coords: [TPixelsPosition, TPixelsPosition]) {
    this.#coords$.next(coords);

    return this;
  }

  /**
   * Проверяет, задан ли у этой способности контекст, то есть персонаж
   *
   * @returns Доступен ли контекст
   */
  #hasContext = () => {
    return Boolean(this.#context);
  };

  #handleAnimationChange = (direction: MovingDirection) => {
    if (this.isMoving) {
      return this;
    }

    this.#handleMovementChange(direction);

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
  #handleFrameChange = ([_, direction]) => {
    /**
     * Если вручную не остановлен и остались еще непройденные пиксели, то продолжаем двигать
     */
    if (this.#movingProgressRemaining > 0) {
      this.#movingProgressRemaining -= PIXELS_PER_FRAME;
      this.#breakpointReached = false;
      this.#coords$.next(movementSetters[this._lastDirection](this.#coords$.getValue()));

      return this;
    }

    /**
     * Если движение закончилось, но команда на движение не была прекращена
     */
    if (this.#movingProgressRemaining === 0 && direction !== MovingDirection.IDLE) {
      this.#movingProgressRemaining = grid64.tileSize;
      this._lastDirection = direction;
      this._breakpoints$.next(true);

      return this;
    }

    /**
     * Если движение закончилось, и последняя команда не требует нового движения
     */
    if (this.#movingProgressRemaining === 0 && direction === MovingDirection.IDLE && !this.#breakpointReached) {
      this._lastDirection = direction;
      this.#breakpointReached = true;
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
  #handleMovementChange = (direction: MovingDirection) => {
    this.#setIsRightDirection(direction);
    this.#setAnimation(direction);

    return this;
  };

  /**
   * Устанавливает флаг, что персонаж повернут вправо
   *
   * @private
   * @param direction Направление движения персонажа
   * @returns Объект способности
   */
  #setIsRightDirection(direction: MovingDirection): this {
    if (direction === MovingDirection.LEFT) {
      this.#isRightDirection = false;
    }

    if (direction === MovingDirection.RIGHT) {
      this.#isRightDirection = true;
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
  #setAnimation(direction: MovingDirection): this {
    if (!this.#context) {
      throw new Error(MovingError.PERSONAGE_NOT_SET);
    }

    switch (direction) {
      case MovingDirection.LEFT:
        this.#context.setAnimation(HeroActionAnimation.RUN_LEFT);

        break;
      case MovingDirection.RIGHT:
        this.#context.setAnimation(HeroActionAnimation.RUN);

        break;
      case MovingDirection.UP:
        this.#context.setAnimation(this.#isRightDirection ? HeroActionAnimation.RUN : HeroActionAnimation.RUN_LEFT);

        break;
      case MovingDirection.DOWN:
        this.#context.setAnimation(this.#isRightDirection ? HeroActionAnimation.RUN : HeroActionAnimation.RUN_LEFT);

        break;
      case MovingDirection.IDLE:
        this.#context.setAnimation(
          this.#isRightDirection ? HeroActionAnimation.STANDS_STILL : HeroActionAnimation.STANDS_STILL_LEFT,
        );

        break;
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
  getCollisionArea() {
    return this.#getCollisionAreaFunc
      ? this.#getCollisionAreaFunc(this)
      : ([this.coords[0], this.coords[1], this.#sizes[0], this.#sizes[1]] as TCollisionArea);
  }

  /**
   * @deprecated Для обратной совместимости, пока не научились рендерить реактивно
   */
  get coords() {
    return this.#coords$.getValue();
  }

  get isMoving() {
    return !this.#breakpointReached;
  }

  get isRightDirection() {
    return this.#isRightDirection;
  }

  get sizes() {
    return this.#sizes;
  }
}
