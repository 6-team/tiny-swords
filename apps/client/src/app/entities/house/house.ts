import { Tile } from "../tile/tile";
import { HouseType, mapTerrainToCoords } from "./house.const";

export class HouseTile extends Tile<HouseType> {
  protected _type: HouseType;
  protected _sprite = './img/Factions/Knights/Buildings/House/House_Blue.png';

  constructor(type: HouseType = HouseType.TOP_LEFT) {
    super();

    this.setType(type);
  }

  setType(type: HouseType = HouseType.TOP_LEFT): void {
    this._type = type;
  }

  protected _getCoordsMap() {
      return mapTerrainToCoords;
  }
}
