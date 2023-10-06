import { Tile } from "../tile/tile";
import { SheepType, mapSheepToCoords } from "./sheep.const";

export class SheepTile extends Tile<SheepType> {
  protected _type: SheepType;
  protected _sprite = '/img/Resources/Sheep/HappySheep_Idle.png';

  constructor(type: SheepType = SheepType.SHEEP_RIGHT) {
    super();

    this.setType(type);
  }

  setType(type: SheepType = SheepType.SHEEP_RIGHT): void {
    this._type = type;
  }

  protected _getCoordsMap() {
    return mapSheepToCoords;
  }
}