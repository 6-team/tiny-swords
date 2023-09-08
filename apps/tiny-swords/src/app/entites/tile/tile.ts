import { ErrorEnum } from './tile.const';
import { CoordsTuple } from './tile.types';

export abstract class Tile<Types extends string | number | symbol> {
  protected abstract _sprite: string;
  protected abstract _type: Types;

  protected _size = 64;
  protected _image?: HTMLImageElement;
  protected _abilities = new Map();
  protected _row = 0;
  protected _col = 0;
  protected _spriteFramesCount = 6;
  readonly #_fps = 10;
  #_framePerTime = 0;

  protected _load() {
    return new Promise<HTMLImageElement>((resolve, reject) => {
      const image = new Image();

      image.src = this._sprite;
      image.onload = () => resolve(image);
      image.onerror = () => reject(new Error(ErrorEnum.LOAD_ERROR));
    });
  }

  protected abstract _getCoordsMap(): Record<Types, CoordsTuple>;

  addAbility<N extends string | symbol, A>(name: N, ability: A): this & { abilities: Map<N, A> } {
    this._abilities.set(name, ability);

    return this;
  }

  getAbility<A, N extends string | symbol = string | symbol>(name: N): A {
    return this._abilities.get(name);
  }

  changeAnimation(row: number) {
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

  get abilities() {
    return this._abilities;
  }

  async getData() {
    if (!this._image) {
      this._image = await this._load();
    }

    const coords = this._getCoordsMap()[this._type];

    return { image: this._image, coords, size: this._size, col: this._col, row: this._row };
  }
}
