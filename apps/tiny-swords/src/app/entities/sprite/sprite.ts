import { ISprite } from '../../common/common.types';
import { ErrorEnum } from './sprite.const';
import { CoordsTuple } from './sprite.types';

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
  setAnimation(row: number): void {
    this._row = row;
    this._col = 0;
  }

  /**
   * Устанавливает анимацию, воспроизводит её один раз и возвращает предыдущую анимацию
   *
   * @param row Номер анимации
   */
  setAnimationOnce(row: number): Promise<void> {
    /**
     * Если предыдущая анимация не завершилась, игнорируем вызов
     */
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
   * Устанавливает тип персонажа, что определяет его внешний вид
   *
   * @param type Тип персонажа
   */
  setType(type: T): void {
    this._type = type;
  }

  /**
   * Перключает кадр анимации, если последний кадр был показан достаточное количество времени
   *
   * @param deltaTime Время, которое прошло с показа предыдущего фрейма
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
   * Загружает изображение элемента и возвращает его вместе с доп. данными.
   *
   * @returns Промис с изображением и мета-данными к нему
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
