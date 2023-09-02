import { ILevel } from '../interface';
import { VectorGame } from '../../map/interface';
import { Map } from '../../map';
import { LevelTiles } from '../level-tiles';
import { enumerate } from '../../../entites/scene/scene';

export class Level3 implements ILevel {
  private _coordinates = {};

  constructor(private _vector: VectorGame, private _map: Map, private _tiles: LevelTiles) {}
  get coordinates() {
    return this._coordinates;
  }

  setTiles(): void {
    const { paddingWidth, paddingWidthIndex, sizeMap } = this._map;
    for (const [x, row] of enumerate(this._vector)) {
      for (const [y] of enumerate(row)) {
        const key = `${x}.${y}`;

        if (!this._vector[x][y]) {
          if (y >= paddingWidth && this._vector[x - 1] && this._vector[x - 1][y]) {
            if (paddingWidth === y) {
              this._coordinates[key] = { tail: this._tiles.level3Tile.edgeLeft };
            } else if (sizeMap - 2 - paddingWidthIndex === y) {
              this._coordinates[key] = { tail: this._tiles.level3Tile.edgeRight };
            } else {
              this._coordinates[key] = { tail: this._tiles.level3Tile.edgeMiddle };
            }
          }
        } else {
          if (this._vector[x][y] && !this._vector[x + 1][y]) {
            this._coordinates[key] = { tail: this._tiles.level3Tile.middleMiddle };

            if (!this._vector[x][y - 1]) {
              this._coordinates[key] = { tail: this._tiles.level3Tile.middleLeft };
            }

            if (y === sizeMap - paddingWidthIndex - 2) {
              this._coordinates[key] = { tail: this._tiles.level3Tile.middleRight };
            }
          }
        }
      }
    }
  }
}
