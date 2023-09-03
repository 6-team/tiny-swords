import { Options } from './sprite.types';

export default abstract class Sprite {
  #row: number;
  #col: number;
  #x: number;
  #y: number;
  #image: HTMLImageElement;
  #isLoaded: boolean;
  protected scale = 0.75;
  protected step = 64;
  protected constructor(protected options: Options) {
    this.#row = 0;
    this.#col = 0;
    this.#x = options.x;
    this.#y = options.y;
    this.#isLoaded = false;


   this.#image = new Image();
   this.#image.src = this.options.spriteSrc;
   this.#image.onload = () => {
     this.#isLoaded = true
   }
  }

  protected draw() {
    const { spriteSize, ctx, spriteFramesCount } = this.options;
    const sx = (spriteSize * this.scale + this.step * this.scale) * this.#col;
    const sy = (spriteSize * this.scale + this.step * this.scale) * this.#row;
    const dx = this.#x * this.scale;
    const dy = this.#y * this.scale;
    const sWidth = spriteSize;
    const sHeight = spriteSize;
    const dWidth = spriteSize * this.scale;
    const dHeight = spriteSize * this.scale;

    if(this.#isLoaded) {
      ctx?.drawImage(this.#image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
    }

    if (this.#col < spriteFramesCount - 1) this.#col += 1;
    else this.#col = 0;
  }

  protected changeXCoordinate(value: number) {
    this.#x += value;
  }

  protected changeYCoordinate(value: number) {
    this.#y += value;
  }

  protected changeAnimation(row: number) {
    this.#row = row;
  }
}
