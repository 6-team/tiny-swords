import { Observable, combineLatest, distinctUntilChanged, map } from 'rxjs';
import { TCollisionArea } from '../../abilities/abilities.types';
import { IMovableCharacter } from '../../common/common.types';
import { MovingDirection } from '@shared';
import { animationInterval$ } from '../../tools/observables/interval';
import { IPreventBoundsDecoratorProps } from './collisions.types';

export class Collisions {
  static _instance: Collisions;

  constructor() {
    if (Collisions._instance === undefined) {
      Collisions._instance = this;
    }

    return Collisions._instance;
  }

  /**
   * Проверяет коллизию между двумя зонами/элементами.
   * Зона — это координаты левой верхней точки вместе с высотой и шириной зоны в пикселях.
   *
   * @param elementArea Первая зона
   * @param anotherElementArea Друга зона, которая будет сравниваться с первой
   *
   * @returns Произошла ли коллизия
   */
  hasCollision(elementArea: TCollisionArea, anotherElementArea: TCollisionArea) {
    const [rect1Left, rect1Top, rect1Height, rect1Width] = elementArea;
    const [rect2Left, rect2Top, rect2Height, rect2Width] = anotherElementArea;

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
   * Декоратор для потока движений, который фильтрует поток, запрещая наступать на границы карты и других персонажей
   *
   * @param props.character Персонаж
   * @param props.otherCharacters$ Поток с массивом других персонажей, с которыми тоже нельзя допускать коллизии
   * @param props.bounds$ Поток массивов координат, на которые персонажу заступать нельзя
   * @param props.originalStream$ Оригинальный поток движений, который нужно модифицировать
   *
   * @returns Направление движения: либо IDLE, если нельзя, либо изначальное полученное значение
   */
  preventBoundsDecorator({
    character,
    otherCharacters$,
    bounds$,
    originalStream$,
  }: IPreventBoundsDecoratorProps): Observable<MovingDirection> {
    return combineLatest([animationInterval$, originalStream$, otherCharacters$, bounds$]).pipe(
      map((streams: [number, MovingDirection, Array<IMovableCharacter>, Array<TCollisionArea>]) => {
        const direction = streams[1] ?? MovingDirection.IDLE;
        const nextCollisionArea = character.moving.getNextCollisionArea(direction);

        for (const otherCharacter of streams[2]) {
          const hasCollision = collisions.hasCollision(otherCharacter.moving.getCollisionArea(), nextCollisionArea);

          if (hasCollision) {
            return MovingDirection.IDLE;
          }
        }

        for (const bound of streams[3]) {
          const hasCollision = collisions.hasCollision(bound, nextCollisionArea);

          if (hasCollision) {
            return MovingDirection.IDLE;
          }
        }

        return direction;
      }),
      distinctUntilChanged(),
    );
  }
}

export const collisions = new Collisions();
