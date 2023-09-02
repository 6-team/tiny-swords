import { LevelTile } from './class';
import { elevation, ground, sand } from '../../generator/data/base-position';
import { ILevelTile } from './interface';

export class LevelTiles {
  constructor(
    public level1Tile: ILevelTile,
    public level2Tile: ILevelTile,
    public level3Tile: ILevelTile,
    public level4Tile: ILevelTile,
  ) {}
}

export const levelTiles = new LevelTiles(
  new LevelTile(),
  new LevelTile(sand),
  new LevelTile(elevation),
  new LevelTile(ground),
);
