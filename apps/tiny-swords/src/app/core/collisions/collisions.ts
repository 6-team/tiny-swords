import { Observable, combineLatest, distinctUntilChanged, map } from 'rxjs';
import { TCollisionArea } from "@abilities/abilities.types";
import { MovingDirection } from '@shared';
import { animationInterval$ } from "@tools/observables";
import { IPreventBoundsDecoratorProps } from './collisions.types';
import { IMovingCharacter } from "@abilities/moving";

export class Collisions {
  static _instance: Collisions;

  constructor() {
    if (Collisions._instance === undefined) {
      Collisions._instance = this;
    }

    return Collisions._instance;
  }

  /**
   Checks for collision between two areas/elements.
   An area is defined by the coordinates of the top-left corner along with the height and width of the area in pixels.

   @param elementArea The first area
   @param anotherElementArea The other area that will be compared with the first one

   @returns Whether a collision occurred or not
   */

  hasCollision(elementArea: TCollisionArea, anotherElementArea: TCollisionArea): boolean {
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
   Decorator for a motion stream that filters the stream, preventing collision with map boundaries and other characters.

   @param character Character
   @param otherCharacters$ Stream with an array of other characters to avoid collision with
   @param bounds$ Stream of coordinate arrays that the character cannot step on
   @param originalStream$ The original motion stream to modify

   @returns Motion direction: either IDLE if collision is forbidden, or the initial received value
   */

  preventBoundsDecorator({
    character,
    otherCharacters$,
    bounds$,
    originalStream$,
  }: IPreventBoundsDecoratorProps): Observable<MovingDirection> {
    return combineLatest([animationInterval$, originalStream$, otherCharacters$, bounds$]).pipe(
      map((streams: [number, MovingDirection, Array<IMovingCharacter>, Array<TCollisionArea>]) => {
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
