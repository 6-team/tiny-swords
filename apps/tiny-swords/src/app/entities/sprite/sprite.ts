/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ISprite } from '@common/common.types';
import { ErrorEnum } from './sprite.const';
import { CoordsTuple } from './sprite.types';

/**
 * Abstract class representing a Sprite for sprite-based graphics and animations.
 * 
 * @abstract
 * @implements {ISprite}
 * @template T - Type of the sprite (can be string, number, or symbol)
 */
export abstract class Sprite<T extends string | number | symbol> implements ISprite {
  protected abstract _sprite: string;
  protected abstract _type: T;

  protected _image?: HTMLImageElement;
  protected _row = 0;
  protected _col = 0;
  protected _scale = 1;
  protected _framePerTime = 0;
  protected _animationResolve?: () => void;
  protected readonly _size: number = 64;
  private readonly _spriteFramesCount: number = 6;
  private readonly _fps: number = 10;

  protected abstract _getCoordsMap(): Record<T, CoordsTuple>;

  get type(): T {
    return this._type;
  }

  /**
   * Initiates the loading of an image and returns a promise.
   *
   * @returns {Promise<HTMLImageElement>} A promise that resolves with the loaded image.
   */
  protected _load() {
    return new Promise<HTMLImageElement>((resolve, reject) => {
      const image = new Image();

      image.src = this._sprite;
      image.onload = () => resolve(image);
      image.onerror = () => reject(new Error(ErrorEnum.LOAD_ERROR));
    });
  }

  /**
   * Sets the animation frame.
   * 
   * @param {number} row - The animation frame number.
   */
  setAnimation(row: number): void {
    this._row = row;
    this._col = 0;
  }

  /**
   * Sets an animation, plays it once, and returns the previous animation.
   *
   * @param {number} row - The animation frame number.
   * @returns {Promise<void>} A promise that resolves when the animation is completed.
   *
   * If the previous animation has not finished, the call is ignored and the returned promise is rejected.
   */
  setAnimationOnce(row: number): Promise<void> {
    if (this._animationResolve) {
      return Promise.reject();
    }

    const prev = this._row;

    this._row = row;
    this._col = 0;

    return new Promise<number>((resolve) => {
      this._animationResolve = () => resolve(prev);
    }).then((prevAnimation) => {
      this._row = prevAnimation;
      this._animationResolve = undefined;
    });
  }

  /**
   * Sets the sprite type, which determines its appearance.
   *
   * @param {T} type - The type of the sprite.
   */
  setType(type: T): void {
    this._type = type;
  }

  /**
   * Switches the animation frame if the last frame has been displayed for a sufficient amount of time.
   *
   * @param {number} deltaTime - The time elapsed since the previous frame was displayed.
   */
  switchAnimationFrame(deltaTime: number) {
    if (this._framePerTime > 1000 / this._fps) {
      this._framePerTime = 0;
      this._col = (this._col + 1) % this._spriteFramesCount;

      if (this._animationResolve && this._col === 0) {
        this._animationResolve();
      }
    } else {
      this._framePerTime += deltaTime;
    }
  }

  /**
   * Loads the image of the element and returns it along with additional data.
   *
   * @returns {Promise<{ image: HTMLImageElement, coords: CoordsTuple, size: number, scale: number }>} A promise that resolves with an object containing the image and metadata.
   */
  async getData() {
    if (!this._image) {
      this._image = await this._load();
    }

    const spriteCoords = this._getCoordsMap()[this._type];
    const frameCoords: CoordsTuple = [
      spriteCoords[0] + this._size * this._col,
      spriteCoords[1] + this._size * this._row,
    ];

    return {
      image: this._image!,
      coords: frameCoords,
      size: this._size,
      scale: this._scale,
    };
  }
}
