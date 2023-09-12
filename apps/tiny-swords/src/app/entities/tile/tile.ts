import { ITile } from '../../common/common.types';
import { ErrorEnum } from './tile.const';
import { CoordsTuple, WithAbility } from './tile.types';

export abstract class Tile<Types extends string | number | symbol> implements ITile {
  protected abstract _sprite: string;
  protected abstract _type: Types;

  protected _size = 64;
  protected _image?: HTMLImageElement;
  protected _row = 0;
  protected _col = 0;
  protected _scale = 1;
  protected _spriteFramesCount = 6;

  readonly #_fps = 10;
  #_framePerTime = 0;

  protected abstract _getCoordsMap(): Record<Types, CoordsTuple>;

  protected _load() {
    return new Promise<HTMLImageElement>((resolve, reject) => {
      const image = new Image();

      image.src = this._sprite;
      image.onload = () => resolve(image);
      image.onerror = () => reject(new Error(ErrorEnum.LOAD_ERROR));
    });
  }

  abstract setType(type: string | number): void;

  setAnimation(row: number) {
    this._row = row;
  }

  initAnimation(deltaTime: number) {
    if (this.#_framePerTime > 1000 / this.#_fps) {
      this._col < this._spriteFramesCount - 1 ? (this._col += 1) : (this._col = 0);
      this.#_framePerTime = 0;
    } else {
      this.#_framePerTime += deltaTime;
    }
  }

  async getData() {
    if (!this._image || this._image.src !== this._sprite) {
      this._image = await this._load();
    }

    const coords = this._getCoordsMap()[this._type];

    return { image: this._image, coords, size: this._size, row: this._row, col: this._col, scale: this._scale };
  }
}
