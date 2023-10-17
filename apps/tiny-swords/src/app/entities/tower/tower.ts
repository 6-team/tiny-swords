import { Tile } from "../tile/tile";
import { TowerType, mapTerrainToCoords } from "./tower.const";

export class TowerTile extends Tile<TowerType> {
  protected _type: TowerType;
  protected _sprite = './img/Factions/Knights/Buildings/Tower/Tower_Blue.png';

  constructor(type: TowerType = TowerType.TOP_LEFT) {
    super();

    this.setType(type);
  }

  setType(type: TowerType = TowerType.TOP_LEFT): void {
    this._type = type;
  }

  protected _getCoordsMap() {
      return mapTerrainToCoords;
  }
}
