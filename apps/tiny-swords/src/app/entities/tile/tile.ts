import { ITile } from '../../common/common.types';
import { ErrorEnum } from './tile.const';
import { CoordsTuple } from './tile.types';

export abstract class Tile<T extends string | number | symbol> implements ITile {
  protected abstract _sprite: string;
  protected abstract _type: T;

  protected _size = 64;
  protected _image?: HTMLImageElement;
  protected _row = 0;
  protected _col = 0;
  protected _scale = 1;
  protected _spriteFramesCount = 6;
  protected _isLoaded = false;

  readonly #_fps = 10;
  #_framePerTime = 0;

  protected abstract _getCoordsMap(): Record<T, CoordsTuple>;

  /**
   * Инициирует загрузку изображения и возвращает промис
   *
   * @returns Промис для загрузки изображения
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
   * Устанавливает кадр анимации
   *
   * @param row Номер кадра анимации
   */
  setAnimation(row: number) {
    this._row = row;
  }

  /**
   * Устанавливает тип персонажа, что определяет его внешний вид
   *
   * @param type Тип персонажа
   */
  setType(type: T): void {
    this._type = type;
  }

  initAnimation(deltaTime: number) {
    if (this.#_framePerTime > 1000 / this.#_fps) {
      this._col < this._spriteFramesCount - 1 ? (this._col += 1) : (this._col = 0);
      this.#_framePerTime = 0;
    } else {
      this.#_framePerTime += deltaTime;
    }
  }

  /**
   * Загружает изображение элемента и возвращает его вместе с доп. данными.
   *
   * @returns Промис с изображением и мета-данными к нему
   */
  async getData() {
    if (!this._isLoaded) {
      this._image = await this._load();
      this._isLoaded = true;
    }

    const coords = this._getCoordsMap()[this._type];

    return { image: this._image, coords, size: this._size, row: this._row, col: this._col, scale: this._scale };
  }
}
