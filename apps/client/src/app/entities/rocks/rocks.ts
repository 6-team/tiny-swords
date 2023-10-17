import { Tile } from "../tile/tile";
import { RocksType, mapTerrainToCoords } from "./rocks.const";

export class RocksTile extends Tile<RocksType> {
  protected _type: RocksType;
  protected _sprite;

  constructor(type: RocksType = RocksType.ROCKS_M) {
    super();

    this.setType(type);
  }

  setType(type: RocksType = RocksType.ROCKS_M) {
    this._type = type;

    switch (type) {
      case RocksType.ROCKS_S:
        this._sprite = './img/Terrain/Water/Rocks/Rocks_01.png';
        break;
      case RocksType.ROCKS_M:
        this._sprite = './img/Terrain/Water/Rocks/Rocks_02.png';
        break;
      case RocksType.ROCKS_L:
        this._sprite = './img/Terrain/Water/Rocks/Rocks_03.png';
        break;
    }
  }

  protected _getCoordsMap() {
    return mapTerrainToCoords;
  }
}
