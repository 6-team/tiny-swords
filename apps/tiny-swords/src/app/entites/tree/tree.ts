import { Tile } from "../tile/tile";
import { TreeType, mapTerrainToCoords } from "./tree.const";

export class TreeTile extends Tile<TreeType> {
  protected _type: TreeType;
  protected _sprite = '/img/Resources/Tree/Tree.png';

  constructor(type: TreeType = TreeType.STRUMP) {
      super();

      this._type = type;
  }

  protected _getCoordsMap() {
      return mapTerrainToCoords;
  }
}