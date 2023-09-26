import { IMovable, TCollisionArea } from '../abilities.types';
import { IMovableCharacter, TNumberOfPixels, TPixelsPosition } from '../../common/common.types';
import { MovingError, PIXELS_PER_FRAME, movementSetters, nextMoveCoordsGetters } from './movable.const';
import { MovableProps } from './movable.types';
import { BehaviorSubject, Observable, combineLatest, distinctUntilChanged, filter, map, withLatestFrom } from 'rxjs';
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
  #getCollisionAreaFunc?: MovableProps['getCollisionArea'];
  #context?: IMovableCharacter;

  #coords$: BehaviorSubject<[TPixelsPosition, TPixelsPosition]>;
  #breakpoints$ = new BehaviorSubject<boolean>(true);
  #movement$ = new BehaviorSubject<MovingDirection>(MovingDirection.IDLE);

  readonly coords$: Observable<[TPixelsPosition, TPixelsPosition]>;
  readonly breakpoints$: Observable<[TPixelsPosition, TPixelsPosition]>;
  readonly movement$ = this.#movement$.pipe(filter(() => Boolean(this.#context))).pipe(distinctUntilChanged());

  constructor({ height, width, initialX, initialY, getCollisionArea }: MovableProps) {
    this.#sizes = [height, width || height];
    this.#getCollisionAreaFunc = getCollisionArea;

    this.#coords$ = new BehaviorSubject<[TPixelsPosition, TPixelsPosition]>([initialX, initialY]);
    this.#breakpoints$ = new BehaviorSubject<boolean>(true);
    this.coords$ = this.#coords$.asObservable();
    this.breakpoints$ = this.#breakpoints$.pipe(
      withLatestFrom(this.#coords$),
      map(([_, coords]) => coords),
    );

    this.movement$.subscribe(this.#handleMovementChange);
  }

  /**
   * Устанавливает контроллер для управления способностью.
   * Для установки понадобился отдельный метод, чтобы была возможность использовать декораторы для контроллера с передачей this
   *
   * @param controller Контроллер
   * @returns Объект способности
   */
  setController(controller: IController) {
    combineLatest([frames$, controller.movement$]).subscribe(this.#handleFrameChange);

    return this;
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
  #handleFrameChange = ([_, direction]) => {
    /**
     * Если вручную не остановлен и остались еще непройденные пиксели, то продолжаем двигать
     */
    if (this.#movingProgressRemaining > 0) {
      this.#coords$.next(movementSetters[this.#movement$.getValue()](this.#coords$.getValue()));
      this.#movingProgressRemaining -= PIXELS_PER_FRAME;
    }

    /**
     * Если движение закончилось, но команда на движение не была прекращена
     */
    if (this.#movingProgressRemaining === 0 && direction !== MovingDirection.IDLE) {
      this.#breakpoints$.next(true);
      this.#movement$.next(direction);
      this.#movingProgressRemaining = grid64.tileSize;
    }

    /**
     * Если движение закончилось, и последняя команда не требует нового движения
     */
    if (this.#movingProgressRemaining === 0 && direction === MovingDirection.IDLE) {
      this.#movement$.next(direction);
      this.#breakpoints$.next(true);
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
      : ([this.coords[0], this.coords$[1], this.#sizes[0], this.#sizes[1]] as TCollisionArea);
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
