import { VectorGame } from '../../map/interface';
import { Map } from '../../map';
import { enumerate } from '../../../entites/scene/scene';
import { LevelTiles } from '../level-tiles';
import { ILevel } from '../interface';

export class Level1 implements ILevel {
  private _coordinates = {};
  constructor(private _vector: VectorGame, private _map: Map, private _tiles: LevelTiles) {}

  get coordinates() {
    return this._coordinates;
  }

  setTiles() {
    const { paddingWidth } = this._map;
    for (const [x, row] of enumerate(this._vector)) {
      for (const [y] of enumerate(row)) {
        const key = `${x}.${y}`;

        if (!this._vector[x][y]) {
          this._coordinates[key] = { tail: this._tiles.level1Tile.middleMiddle };

          if (y >= paddingWidth && this._vector[x - 1] && this._vector[x - 1][y]) {
            this._coordinates[key] = { tail: this._tiles.level2Tile.middleMiddle };
          }
        } else {
          if (!this._vector[x - 1][y]) {
            this._coordinates[key] = { tail: this._tiles.level1Tile.middleMiddle };
          }
        }
      }
    }
  }
}
