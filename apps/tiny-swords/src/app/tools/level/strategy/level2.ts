import { ILevel } from '../interface';
import { VectorGame } from '../../map/interface';
import { Map } from '../../map';
import { LevelTiles } from '../level-tiles';
import { enumerate } from '../../../entites/scene/scene';

export class Level2 implements ILevel {
  private _coordinates = {};
  constructor(private _vector: VectorGame, private _map: Map, private _tiles: LevelTiles) {}
  get coordinates() {
    return this._coordinates;
  }

  setTiles(): void {
    const { paddingHeightIndex, paddingWidthIndex, paddingHeight, sizeMap } = this._map;

    for (const [x, row] of enumerate(this._vector)) {
      for (const [y] of enumerate(row)) {
        const key = `${x}.${y}`;

        if (y === paddingWidthIndex) {
          if (this._vector[x][y + 1]) {
            if (paddingHeight + 1 === x) {
              this.coordinates[key] = { tail: this._tiles.level2Tile.topLeft };
              continue;
            }

            if (x !== paddingHeightIndex + 1) {
              this.coordinates[key] = { tail: this._tiles.level2Tile.middleLeft };
              continue;
            }
          }

          if (!this._vector[x][y] && x > paddingHeight) {
            if (this._vector[x - 2][y + 1] && !this._vector[x - 1][y + 1]) {
              this.coordinates[key] = { tail: this._tiles.level2Tile.bottomLeft };
              continue;
            } else if (this._vector[x - 2][y + 1] && !this._vector[x][y + 1]) {
              this.coordinates[key] = { tail: this._tiles.level2Tile.middleLeft };
            }
          }
        }

        if (this._vector[x - 2] && this._vector[x - 2][y] && !this._vector[x - 1][y]) {
          this.coordinates[key] = { tail: this._tiles.level2Tile.bottomMiddle };
        }

        if (y === sizeMap - paddingWidthIndex - 2 && this._vector[x][y]) {
          if (this._vector[x - 1][y]) this.coordinates[key] = { tail: this._tiles.level2Tile.middleMiddle };
        }

        if (sizeMap - paddingWidthIndex - 1 === y) {
          if (sizeMap - paddingHeight < x && this._vector[x - 2][y - 1]) {
            this.coordinates[key] = { tail: this._tiles.level2Tile.bottomRight };
          } else {
            if (this._vector[x - 1] && this._vector[x - 1][y - 1]) {
              if (this._vector[x + 1][y - 1] && !this._vector[x - 2][y - 1]) {
                this.coordinates[key] = { tail: this._tiles.level2Tile.topRight };
                break;
              }
              this.coordinates[key] = { tail: this._tiles.level2Tile.middleRight };
            }
          }
        }

        if (y === paddingWidthIndex + 1 && this._vector[x][y] && this._vector[x - 1][y]) {
          this.coordinates[key] = { tail: this._tiles.level2Tile.middleMiddle };
        }
      }
    }
  }
}
