import { Directions, pushedKeys } from './keyboard.conts';

export default class KeyboardController {
  #pushedButtons: Directions[] = [];
  #isRightDirection = true;
  constructor() {
    this.#init();
  }

  get direction(): Directions {
    return this.#pushedButtons[0];
  }

  get isRightDirection(): boolean {
    return this.#isRightDirection;
  }

 #move(code: string): void {
    const direction = pushedKeys[code];
    if (direction && this.#pushedButtons.indexOf(direction) === -1) {
      this.#pushedButtons.unshift(direction);

      if (direction === Directions.LEFT) {
        this.#isRightDirection = false;
      }

      if (direction === Directions.RIGHT) {
        this.#isRightDirection = true;
      }
    }
  }

  #stop(code: string): void {
    const direction = pushedKeys[code];
    const directionIdx = this.#pushedButtons.indexOf(direction);
    if (directionIdx > -1) {
      this.#pushedButtons.splice(directionIdx, 1);
    }
  }

  #init() {
    document.addEventListener('keydown', (event) => {
      this.#move(event.code);
    });

    document.addEventListener('keyup', (event) => {
      this.#stop(event.code);
    });
  }
}
