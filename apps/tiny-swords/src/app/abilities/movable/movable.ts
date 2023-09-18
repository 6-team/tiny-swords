import { IMovable } from '../abilities.types';
import { IMovableCharacter, TNumberOfPixels, TPixelsPosition } from '../../common/common.types';
import { MovingError, movementSetters } from './movable.const';
import { MovableProps } from './movable.types';
import { BehaviorSubject, Observable, distinctUntilChanged, filter, withLatestFrom } from 'rxjs';
import { MovingDirection } from '../abilities.const';
import { HeroActionAnimation } from '../../entities/hero/hero.const';
import { frames$ } from '../../tools/observables';
import { grid64 } from '../../core/grid';

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

  #prevCoords$: BehaviorSubject<[TPixelsPosition, TPixelsPosition]>;
  #coords$: BehaviorSubject<[TPixelsPosition, TPixelsPosition]>;
  #movement$ = new BehaviorSubject<MovingDirection>(MovingDirection.IDLE);

  readonly prevCoords$: Observable<[TPixelsPosition, TPixelsPosition]>;
  readonly coords$: Observable<[TPixelsPosition, TPixelsPosition]>;
  readonly movement$ = this.#movement$.pipe(filter(() => Boolean(this.#context))).pipe(distinctUntilChanged());

  constructor({ height, width, initialX, initialY, getCollisionArea, stream$ }: MovableProps) {
    this.#sizes = [height, width || height];
    this.#getCollisionAreaFunc = getCollisionArea;

    this.#prevCoords$ = new BehaviorSubject<[TPixelsPosition, TPixelsPosition]>([initialX, initialY]);
    this.#coords$ = new BehaviorSubject<[TPixelsPosition, TPixelsPosition]>([initialX, initialY]);
    this.prevCoords$ = this.#prevCoords$.asObservable();
    this.coords$ = this.#coords$.asObservable();

    this.movement$.subscribe(this.#handleMovementChange);

    frames$
      .pipe(withLatestFrom(stream$, this.#movement$, this.#coords$, this.#prevCoords$))
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
      this.#movingProgressRemaining -= 1;
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
  #setIsRightDirection(direction: MovingDirection) {
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
  #setAnimation(direction: MovingDirection) {
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
  stopMovement() {
    this.#isStoppedManually = true;

    return this;
  }

  /**
   * Возвращает зону персонажа, которая участвует в сравнении коллизий.
   */
  get collisionArea(): [x: TPixelsPosition, y: TPixelsPosition, height: TNumberOfPixels, width: TNumberOfPixels] {
    return this.#getCollisionAreaFunc(this) ?? [0, 0, this.#sizes[0], this.#sizes[1]];
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
