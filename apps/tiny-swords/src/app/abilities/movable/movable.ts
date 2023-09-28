import { IMovable } from '../abilities.types';
import { IMovableCharacter, TNumberOfPixels, TPixelsPosition } from '../../common/common.types';
import { MovingError, PIXELS_PER_FRAME, movementSetters } from './movable.const';
import { MovableProps } from './movable.types';
import { BehaviorSubject, Observable, distinctUntilChanged, filter, withLatestFrom } from 'rxjs';
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
  #isStoppedManually = false;
  #getCollisionAreaFunc?: MovableProps['getCollisionArea'];
  #context?: IMovableCharacter;
  #controller: IController;

  #prevCoords$: BehaviorSubject<[TPixelsPosition, TPixelsPosition]>;
  #coords$: BehaviorSubject<[TPixelsPosition, TPixelsPosition]>;
  #movement$ = new BehaviorSubject<MovingDirection>(MovingDirection.IDLE);

  readonly prevCoords$: Observable<[TPixelsPosition, TPixelsPosition]>;
  readonly coords$: Observable<[TPixelsPosition, TPixelsPosition]>;
  readonly movement$ = this.#movement$.pipe(filter(() => Boolean(this.#context))).pipe(distinctUntilChanged());

  constructor({ height, width, initialX, initialY, getCollisionArea, controller }: MovableProps) {
    this.#sizes = [height, width || height];
    this.#controller = controller;
    this.#getCollisionAreaFunc = getCollisionArea;

    this.#prevCoords$ = new BehaviorSubject<[TPixelsPosition, TPixelsPosition]>([initialX, initialY]);
    this.#coords$ = new BehaviorSubject<[TPixelsPosition, TPixelsPosition]>([initialX, initialY]);
    this.prevCoords$ = this.#prevCoords$.asObservable();
    this.coords$ = this.#coords$.asObservable();

    this.movement$.subscribe(this.#handleMovementChange);

    frames$
      .pipe(withLatestFrom(controller.movement$, this.#movement$, this.#coords$, this.#prevCoords$))
      .subscribe(this.#handleFrameChange);
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

  setDirection(direction: MovingDirection): void {
    this.#controller.setDirection(direction);
  }

  setCoords(coords: [TPixelsPosition, TPixelsPosition]): void {
    this.#coords$.next(coords);
  }

  /**
   * Обрабатывает получение нового фрейма.
   * В каждом фрейме проверяется, происходит ли сейчас движение персонажа.
   * И если перстнаж стоит на месте, только тогда ему задаётся новое направление движения.
   *
   * @private
   * @param param0 [time, direction, movement, coords]
   * @returns Объект способности
   */
  #handleFrameChange = ([_, direction, movement, coords, prevCoords]) => {
    /**
     * Если остановили вручную, то возвращаем обратно, где и был до коллизии и завершаем анимацию
     */
    if (this.#isStoppedManually) {
      this.#movingProgressRemaining = 0;
      this.#isStoppedManually = false;
      this.#coords$.next(prevCoords);

      return this;
    }

    /**
     * Если вручную не остановлен и остались еще непройденные пиксели, то продолжаем двигать
     */
    if (this.#movingProgressRemaining > 0 && !this.#isStoppedManually) {
      this.#coords$.next(movementSetters[movement](coords));
      this.#movingProgressRemaining -= PIXELS_PER_FRAME;
    }

    /**
     * Если движение закончилось, но команда на движение не была прекращена
     */
    if (this.#movingProgressRemaining === 0 && direction !== MovingDirection.IDLE) {
      this.#movement$.next(direction);
      this.#movingProgressRemaining = grid64.tileSize;
      this.#prevCoords$.next(coords);
    }

    /**
     * Если движение закончилось, и последняя команда не требует нового движения
     */
    if (this.#movingProgressRemaining === 0 && direction === MovingDirection.IDLE) {
      this.#movement$.next(direction);
      this.#prevCoords$.next(coords);
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
   * Останавливает движение персонажа.
   *
   * @returns Объект способности
   */
  stopMovement(): this {
    this.#isStoppedManually = true;

    return this;
  }

  /**
   * Проверяет коллизию между текущим элементом и переданным
   *
   * @param rect2Coords Координаты в px второго объекта, с которым идёт сравнение
   * @returns Произошла ли коллизия
   */
  checkCollision(
    rect2Coords: [pxX: TPixelsPosition, pxY: TPixelsPosition, pxHeight: TNumberOfPixels, pxWidth: TNumberOfPixels],
  ) {
    const [rect1Left, rect1Top, rect1Height, rect1Width] = this.collisionArea;
    const [rect2Left, rect2Top, rect2Height, rect2Width] = rect2Coords;

    const rect1Right = rect1Left + rect1Width;
    const rect1Bottom = rect1Top + rect1Height;
    const rect2Right = rect2Left + rect2Width;
    const rect2Bottom = rect2Top + rect2Height;

    if (rect1Bottom <= rect2Top || rect1Top >= rect2Bottom || rect1Right <= rect2Left || rect1Left >= rect2Right) {
      return false;
    }

    return true;
  }

  /**
   * Возвращает зону персонажа, которая участвует в сравнении коллизий.
   */
  get collisionArea(): [x: TPixelsPosition, y: TPixelsPosition, height: TNumberOfPixels, width: TNumberOfPixels] {
    return this.#getCollisionAreaFunc ? this.#getCollisionAreaFunc(this) : [0, 0, this.#sizes[0], this.#sizes[1]];
  }

  /**
   * @deprecated Для обратной совместимости, пока не научились рендерить реактивно
   */
  get coords() {
    return this.#coords$.getValue();
  }

  get sizes() {
    return this.#sizes;
  }
}
