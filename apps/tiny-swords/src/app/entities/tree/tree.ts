import { Sprite } from "../sprite/sprite";
import { TreeType, mapTerrainToCoords } from "./tree.const";

export class TreeSprite extends Sprite<TreeType> {
  protected _type: TreeType;
  protected _sprite = './img/Resources/Tree/Tree.png';

  constructor(type: TreeType = TreeType.STRUMP) {
    super();

    this.setType(type);
  }

  setType(type: TreeType = TreeType.STRUMP): void {
    this._type = type;
  }

  protected _getCoordsMap() {
    return mapTerrainToCoords;
  }
}
