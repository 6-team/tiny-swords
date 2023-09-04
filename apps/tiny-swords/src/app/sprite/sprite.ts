import { Options } from './sprite.types';

export default abstract class Sprite {
  #row: number;
  #col: number;
  #x: number;
  #y: number;
  #isLoaded: boolean;
  #framePerTime: number;
  readonly #spriteSize: number;
  readonly #spriteFramesCount: number;
  readonly #image: HTMLImageElement;
  readonly #fps: number;
  protected scale = 0.75;
  protected step = 64;

  protected constructor(protected readonly options: Options) {
    this.#row = 0;
    this.#col = 0;
    this.#x = options.x;
    this.#y = options.y;
    this.#spriteSize = options.spriteSize || 192;
    this.#spriteFramesCount = options.spriteFramesCount || 6;
    this.#isLoaded = false;
    // FPS control
    this.#fps = 10;
    this.#framePerTime = 0;
    // Sprite Image init
    this.#image = new Image();
    this.#image.src = this.options.spriteSrc;
    this.#image.onload = () => {
      this.#isLoaded = true;
    };
  }

  #getCornerCoordinates(): [number, number] {
    const scaledSize = this.#spriteSize * this.scale;
    switch (this.scale) {
      case 0.75:
        return [(scaledSize + this.step * this.scale) * this.#col, (scaledSize + this.step * this.scale) * this.#row];
      case 1:
        return [scaledSize * this.#col, scaledSize * this.#row];
    }
  }

  protected draw(deltaTime: number): void {
    const { ctx } = this.options;
    const [sx, sy] = this.#getCornerCoordinates();
    const dx = this.#x * this.scale;
    const dy = this.#y * this.scale;
    const sWidth = this.#spriteSize;
    const sHeight = this.#spriteSize;
    const dWidth = this.#spriteSize * this.scale;
    const dHeight = this.#spriteSize * this.scale;

    if (this.#isLoaded) {
      ctx?.drawImage(this.#image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
    }

    if (this.#framePerTime > 1000 / this.#fps) {
      this.#col < this.#spriteFramesCount - 1 ? this.#col += 1 : (this.#col = 0);
      this.#framePerTime = 0;
    } else {
      this.#framePerTime += deltaTime;
    }
  }

  protected changeXCoordinate(value: number): void {
    this.#x += value;
  }

  protected changeYCoordinate(value: number): void {
    this.#y += value;
  }

  protected changeAnimation(row: number): void {
    this.#row = row;
  }
}
