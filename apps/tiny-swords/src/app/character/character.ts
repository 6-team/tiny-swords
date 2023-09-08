import { Tile } from '../entites/tile/tile';
import { CoordsTuple } from '../entites/tile/tile.types';
import { Directions, KeyboardController } from '../entites/controllers/keyboard';
import { Movable } from '../entites/movable/movable';
import { CharacterAction, animationByDirection, coordinatesSetters } from './character.const';
export default class Character extends Tile<string> {
  protected _sprite = '/img/Factions/Knights/Troops/Warrior/Blue/Warrior_Blue.png';
  protected _type = 'character';
  protected _size = 192;
  protected _row = 0;
  protected _col = 0;
  #x = 0;
  #y = 0;
  #coordinatesInPixels: [number, number, number, number];
  #movingProgressRemaining: number;
  #direction: Directions;

  constructor() {
    super();
    this.#movingProgressRemaining = 0;
  }

  get coordinatesInPixels() {
    return this.#coordinatesInPixels;
  }

  #movingAnimation(direction: Directions, isRightDirection: boolean) {
    const movingDirection = animationByDirection[direction];

    if (direction === Directions.UP || direction === Directions.DOWN) {
      const verticalDirection = isRightDirection ? CharacterAction.RUN : CharacterAction.RUN_LEFT;
      this.changeAnimation(verticalDirection);
    } else {
      const horizontalMoving = isRightDirection ? CharacterAction.STANDS_STILL : CharacterAction.STANDS_STILL_LEFT;
      this.changeAnimation(movingDirection ?? horizontalMoving);
    }
  }

  moving(keyboardController: KeyboardController, movable: Movable, tileSize: number) {
    const { direction, isRightDirection } = keyboardController;
    const {
      coords: [x, y],
      sizes,
    } = movable;

    const [height, width] = [sizes[0] * tileSize, sizes[1] * tileSize];

    if (!this.#x && !this.#y) {
      this.#x = x * tileSize;
      this.#y = y * tileSize;
    }

    if (!this.#coordinatesInPixels) {
      this.#coordinatesInPixels = [x * tileSize, y * tileSize, height, width];
    }

    if (this.#movingProgressRemaining > 0) {
      switch (this.#direction) {
        case Directions.UP:
          this.#coordinatesInPixels = [this.#x, (this.#y -= 1), height, width];
          break;
        case Directions.DOWN:
          this.#coordinatesInPixels = [this.#x, (this.#y += 1), height, width];
          break;
        case Directions.LEFT:
          this.#coordinatesInPixels = [(this.#x -= 1), this.#y, height, width];
          break;
        case Directions.RIGHT:
          this.#coordinatesInPixels = [(this.#x += 1), this.#y, height, width];
      }

      this.#movingAnimation(this.#direction, isRightDirection);
      this.#movingProgressRemaining -= 1;
    }

    if (this.#movingProgressRemaining === 0 && direction) {
      this.#movingProgressRemaining = tileSize;
      movable.setCoords(coordinatesSetters[direction]);
      this.#direction = direction;
    }

    if (this.#movingProgressRemaining === 0 && !direction) {
      this.changeAnimation(isRightDirection ? CharacterAction.STANDS_STILL : CharacterAction.STANDS_STILL_LEFT);
    }
  }

  stop(coords: [number, number, number, number]) {
    this.#coordinatesInPixels = coords;
  }

  protected _getCoordsMap(): Record<string, CoordsTuple> {
    return {
      character: [this._size, this._size],
    };
  }
}
