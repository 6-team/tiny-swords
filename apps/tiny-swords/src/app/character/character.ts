import { Sprite } from '../sprite';
import { CharacterAction } from './character.const';
import { Directions } from './character.types';

export default class Character extends Sprite {
  readonly #pushedKeys: Record<string, Directions>;
  readonly #directionStep: Record<Directions, number>;
  #pushedButtons: (Directions)[] = [];
  #movingProgressRemaining: number;
  direction: Directions;

  constructor(ctx: CanvasRenderingContext2D | null) {
    super({
      ctx,
      spriteSrc: '/img/Factions/Knights/Troops/Warrior/Purple/Warrior_Purple.png',
      spriteSize: 192,
      spriteFramesCount: 6,
      x: 48,
      y: 168,
    });
    this.#movingProgressRemaining = 0
    this.#pushedKeys = {
      'ArrowUp': 'up',
      'KeyW': 'up',
      'ArrowDown': 'down',
      'KeyS': 'down',
      'ArrowLeft': 'left',
      'KeyA': 'left',
      'ArrowRight': 'right',
      'KeyD': 'right',
    }
    this.#directionStep = {
      up: -8,
      down: 8,
      left: -8,
      right: 8
    }
  }

  get #direction() {
    return this.#pushedButtons[0]
  }

  move(code: string) {
    const direction = this.#pushedKeys[code];

    if(direction && this.#pushedButtons.indexOf(direction) === -1) {
      this.#pushedButtons.unshift(direction);
      this.direction = direction
    }
  }

  stop(code: string) {
    const direction = this.#pushedKeys[code];
    const directionIdx = this.#pushedButtons.indexOf(direction);
    if(directionIdx > -1) {
      this.#pushedButtons.splice(directionIdx, 1)
    }
    this.changeAnimation(CharacterAction.STANDS_STILL)
  }

  updatePosition() {
    if(this.#movingProgressRemaining > 0) {
      const isVerticalDirection = this.direction === 'up' || this.direction === 'down'
      const isHorizontalDirection = this.direction === 'left' || this.direction === 'right'

      if(isHorizontalDirection) {
        this.changeXCoordinate(this.#directionStep[this.direction]);
      }

      if(isVerticalDirection) {
        this.changeYCoordinate(this.#directionStep[this.direction]);
      }

      this.#movingProgressRemaining -= 8
      this.changeAnimation(CharacterAction.RUN);
    } else {
      this.changeAnimation(CharacterAction.STANDS_STILL);
    }

    if(this.#movingProgressRemaining === 0 && this.#direction) {
      this.#movingProgressRemaining = this.step * this.scale;
    }
  }

  init() {
    this.draw();
    this.updatePosition();
  }
}
