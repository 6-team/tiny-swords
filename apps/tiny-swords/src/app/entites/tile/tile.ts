import { ErrorEnum } from './tile.const';
import { CoordsTuple } from './tile.types';

export abstract class Tile<Types extends string | number | symbol> {
  protected abstract _sprite: string;
  protected abstract _type: Types;

  protected _size = 64;
  protected _image?: HTMLImageElement;

  protected _load() {
    return new Promise<HTMLImageElement>((resolve, reject) => {
      const image = new Image();

      image.src = this._sprite;
      image.onload = () => resolve(image);
      image.onerror = () => reject(new Error(ErrorEnum.LOAD_ERROR));
    });
  }

  protected abstract _getCoordsMap(): Record<Types, CoordsTuple>;

  async getData() {
    if (!this._image) {
      this._image = await this._load();
    }

    const coords = this._getCoordsMap()[this._type];

    return { image: this._image, coords, size: this._size };
  }
}
