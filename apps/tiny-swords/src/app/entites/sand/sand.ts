import { Tile } from "../tile/tile";
import { SandType, mapTerrainToCoords } from "./sand.const";

export class SandTile extends Tile<SandType> {
    protected _type: SandType;
    protected _sprite = '/img/Terrain/Ground/Tilemap_Flat.png';

    constructor(type: SandType = SandType.MIDDLE_MIDDLE) {
        super();

        this._type = type;
    }

    protected _getCoordsMap() {
        return mapTerrainToCoords;
    }
}