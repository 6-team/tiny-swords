import { Tile } from "../tile/tile";
import { DecoType, mapTerrainToCoords } from "./deco.const";

export class DecoTile extends Tile<DecoType> {
    protected _type: DecoType;
    protected _sprite;

    constructor(type: DecoType = DecoType.MUSHROOM_M) {
        super();

        this._type = type;

        switch(type) {
            case DecoType.MUSHROOM_S:
                this._sprite = '/img/Deco/01.png';
                break;
            case DecoType.MUSHROOM_M:
                this._sprite = '/img/Deco/02.png';
                break;
            case DecoType.MUSHROOM_L:
                this._sprite = '/img/Deco/03.png';
                break;

            case DecoType.STONE_S:
                this._sprite = '/img/Deco/04.png';
                break;
            case DecoType.STONE_M:
                this._sprite = '/img/Deco/05.png';
                break;
            case DecoType.STONE_L:
                this._sprite = '/img/Deco/06.png';
                break;

            case DecoType.BUSH_S:
                this._sprite = '/img/Deco/07.png';
                break;
            case DecoType.BUSH_M:
                this._sprite = '/img/Deco/08.png';
                break;
            case DecoType.BUSH_L:
                this._sprite = '/img/Deco/09.png';
                break;
        
            case DecoType.WEED_S:
                this._sprite = '/img/Deco/10.png';
                break;
            case DecoType.WEED_M:
                this._sprite = '/img/Deco/11.png';
                break;

            case DecoType.PUMPKIN_S:
                this._sprite = '/img/Deco/12.png';
                break;
            case DecoType.PUMPKIN_M:
                this._sprite = '/img/Deco/13.png';
                break;

            case DecoType.BONE_S:
                this._sprite = '/img/Deco/15.png';
                break;
            case DecoType.BONE_M:
                this._sprite = '/img/Deco/14.png';
                break;

            case DecoType.SIGN_STOP:
                this._sprite = '/img/Deco/16.png';
                break;
            case DecoType.SIGH_RIGHT:
                this._sprite = '/img/Deco/17.png';
                break;

            case DecoType.SCARECROW:
                this._sprite = '/img/Deco/18.png';
                break;
        }
    }

    protected _getCoordsMap() {
        return mapTerrainToCoords;
    }
}