import { Sprite } from '../sprite';
import { CharacterAction } from './character.const';
import { Directions } from './character.types';

export default class Character extends Sprite {
  readonly #pushedKeys: Record<string, Directions>;
  readonly #directionStep: Record<Directions, number>;
  #pushedButtons: (Directions)[] = [];
  #movingProgressRemaining: number;
  #delayedDirection: Directions;
  #isRightDirection = true;
  direction: Directions;

  constructor(ctx: CanvasRenderingContext2D | null) {
    super({
      ctx,
      spriteSrc: '/img/Factions/Knights/Troops/Warrior/Blue/Warrior_Blue.png',
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
      up: -16,
      down: 16,
      left: -16,
      right: 16
    }
  }

  get #direction(): Directions {
    return this.#pushedButtons[0]
  }

  move(code: string): void {
    const direction = this.#pushedKeys[code];

    if(direction && this.#pushedButtons.indexOf(direction) === -1) {
      this.#pushedButtons.unshift(direction);
      this.#delayedDirection = direction;
    }
  }

  stop(code: string): void {
    const direction = this.#pushedKeys[code];
    const directionIdx = this.#pushedButtons.indexOf(direction);
    if(directionIdx > -1) {
      this.#pushedButtons.splice(directionIdx, 1)
    }

    if(this.direction === 'left') {
      this.#isRightDirection = false;
    }

    if(this.direction === 'right') {
      this.#isRightDirection = true
    }
  }

  init(): void {
    this.draw();
    this.updatePosition();
  }

  private updatePosition(): void {
    if(this.#movingProgressRemaining > 0) {
      const isVerticalDirection = this.direction === 'up' || this.direction === 'down'
      const isHorizontalDirection = this.direction === 'left' || this.direction === 'right';

      if(isHorizontalDirection) {
        this.changeXCoordinate(this.#directionStep[this.direction]);
        this.changeAnimation(this.direction === 'left' ? CharacterAction.RUN_LEFT : CharacterAction.RUN);
      }

      if(isVerticalDirection) {
        this.changeYCoordinate(this.#directionStep[this.direction]);
        this.changeAnimation(this.#isRightDirection ? CharacterAction.RUN : CharacterAction.RUN_LEFT);
      }

      this.#movingProgressRemaining -= 16
    } else {
      const animation = this.#isRightDirection ? CharacterAction.STANDS_STILL : CharacterAction.STANDS_STILL_LEFT
      this.changeAnimation(animation);
    }

    if(this.#movingProgressRemaining === 0 && this.#direction) {
      this.#movingProgressRemaining = this.step * this.scale;
      this.direction = this.#delayedDirection;
    }
  }
}
