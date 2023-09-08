import { ITile } from '../../common/common.types';
import { ErrorEnum } from './tile.const';
import { CoordsTuple, WithAbility, WithSetPersonageContext } from './tile.types';

export abstract class Tile<Types extends string | number | symbol> implements ITile {
  protected abstract _sprite: string;
  protected abstract _type: Types;

  protected _size = 64;
  protected _image?: HTMLImageElement;
  protected _abilities = new Map<unknown, unknown>();

  protected _load() {
    return new Promise<HTMLImageElement>((resolve, reject) => {
      const image = new Image();

      image.src = this._sprite;
      image.onload = () => resolve(image);
      image.onerror = () => reject(new Error(ErrorEnum.LOAD_ERROR));
    });
  }

  protected abstract _getCoordsMap(): Record<Types, CoordsTuple>;

  abstract setType(type: string | number): void;

  addAbility<Name extends string | symbol, Ability extends WithSetPersonageContext>(
    name: Name,
    ability: Ability,
  ): this & WithAbility<Name, Ability> {
    ability.setContext(this);
    this._abilities.set(name, ability);

    return this as this & WithAbility<Name, Ability>;
  }

  getAbility<Ability extends WithSetPersonageContext, Name extends string | symbol = string | symbol>(
    name: Name,
  ): Ability {
    return this._abilities.get(name) as Ability;
  }

  get abilities() {
    return this._abilities;
  }

  async getData() {
    if (!this._image || this._image.src !== this._sprite) {
      this._image = await this._load();
    }

    const coords = this._getCoordsMap()[this._type];

    return { image: this._image, coords, size: this._size };
  }
}
