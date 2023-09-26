import { distinctUntilChanged, map, withLatestFrom } from 'rxjs';
import { TCollisionArea } from '../../abilities/abilities.types';
import { IMovableCharacter } from '../../common/common.types';
import { IController } from '../../controllers';
import { frames$ } from '../../tools/observables';
import { MovingDirection } from '@shared';

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

  decorateController(character: IMovableCharacter, bounds: Array<TCollisionArea>, controller: IController) {
    const movable = character.getAbility('movable');

    return {
      ...controller,
      movement$: frames$.pipe(
        withLatestFrom(movable.tileCoords$, controller.movement$),
        map(([_f, _s, direction]) => {
          for (const bound of bounds) {
            const nextCollisionArea = movable.getNextCollisionArea(direction);
            const hasCollision = collisions.hasCollision(bound, nextCollisionArea);

            if (hasCollision) {
              return MovingDirection.IDLE;
            }
          }

          return direction;
        }),
        distinctUntilChanged(),
      ),
    };
  }
}

export const collisions = new Collisions();
