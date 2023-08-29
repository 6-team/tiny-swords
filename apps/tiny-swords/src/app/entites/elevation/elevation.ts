import { Tile } from "../tile/tile";
import { ElevationType, mapTerrainToCoords } from "./elevation.const";

export class ElevationTile extends Tile<ElevationType> {
    protected _type: ElevationType;
    protected _sprite = '/img/Terrain/Ground/Tilemap_Elevation.png';

    constructor(type: ElevationType = ElevationType.MIDDLE_MIDDLE) {
        super();

        this._type = type;
    }

    protected _getCoordsMap() {
        return mapTerrainToCoords;
    }
}