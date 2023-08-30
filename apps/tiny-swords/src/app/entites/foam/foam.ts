import { Tile } from "../tile/tile";
import { FoamType, mapTerrainToCoords } from "./foam.const";

export class FoamTile extends Tile<FoamType> {
    protected _type: FoamType;
    protected _sprite = '/img/Terrain/Water/Foam/Foam.png';

    constructor(type: FoamType = FoamType.MIDDLE) {
        super();

        this._type = type;
    }

    protected _getCoordsMap() {
        return mapTerrainToCoords;
    }
}