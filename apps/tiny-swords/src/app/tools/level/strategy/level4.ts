import { VectorGame } from '../../map/interface';
import { Map } from '../../map';
import { enumerate } from '../../../entites/scene/scene';
import { LevelTiles } from '../level-tiles';
import { ILevel } from '../interface';

export class Level4 implements ILevel {
  private _coordinates = {};
  constructor(private _vector: VectorGame, private _map: Map, private _tiles: LevelTiles) {}

  get coordinates() {
    return this._coordinates;
  }

  setTiles() {
    const { paddingWidth, sizeMap, paddingHeight } = this._map;
    for (const [x, row] of enumerate(this._vector)) {
      for (const [y] of enumerate(row)) {
        if (!this._vector[x][y]) continue;
        const key = `${x}.${y}`;

        if (this._vector[x][y]) {
          this._coordinates[key] = { tail: this._tiles.level4Tile.middleMiddle };

          if (y === paddingWidth) {
            this._coordinates[key] = { tail: this._tiles.level4Tile.middleLeft };
          }

          if (!this._vector[x - 1][y]) {
            this._coordinates[key] = { tail: this._tiles.level4Tile.topMiddle };

            if (!this._vector[x][y - 1]) {
              this._coordinates[key] = { tail: this._tiles.level4Tile.topLeft };
            }

            if (y === sizeMap - paddingWidth - 1) {
              this._coordinates[key] = { tail: this._tiles.level4Tile.topRight };
            }
          }

          if (!this._vector[x][y + 1] && x > paddingHeight) {
            this._coordinates[key] = { tail: this._tiles.level4Tile.middleRight };
          }

          if (!this._vector[x + 1][y]) {
            this._coordinates[key] = { tail: this._tiles.level4Tile.bottomMiddle };

            if (y === sizeMap - paddingWidth - 1) {
              this._coordinates[key] = { tail: this._tiles.level4Tile.bottomRight };
            }

            if (y === paddingWidth) {
              this._coordinates[key] = { tail: this._tiles.level4Tile.bottomLeft };
            }
          }
        }
      }
    }
  }
}
