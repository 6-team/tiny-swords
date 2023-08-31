import { Tile } from "../tile/tile";
import { BoundaryType, mapBoundaryToCoords } from "./boundary.const";

export class BoundaryTile extends Tile<BoundaryType> {
    protected _type: BoundaryType;
    protected _sprite = '/img/Boundary/Boundary.png';

    constructor(type: BoundaryType = BoundaryType.MIDDLE) {
        super();

        this._type = type;
    }

    protected _getCoordsMap() {
        return mapBoundaryToCoords;
    }
}