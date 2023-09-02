import { TileName } from '../../entites/scene/scene.const';
export type PositionLedge = 'bottom' | 'top';

type TilePositionVertical = 'Left' | 'Right' | 'Middle';
type TilePositionHorizon = 'top' | 'bottom' | 'middle' | 'horizontal' | 'vertical' | 'edge';

type TilePosition = `${TilePositionHorizon}${TilePositionVertical}`;

export interface ILevelPosition {
  position: Record<TilePosition, TileName>;
}

export interface ILevel {
  get coordinates(): Record<string, number>;
  setTiles(): void;
}

export interface ILevelTile {
  get middleMiddle(): TileName;
  get topLeft(): TileName;
  get bottomLeft(): TileName;
  get bottomMiddle(): TileName;
  get bottomRight(): TileName;
  get horizontalLeft(): TileName;
  get horizontalMiddle(): TileName;
  get horizontalRight(): TileName;
  get middleLeft(): TileName;
  get middleRight(): TileName;
  get topMiddle(): TileName;
  get topRight(): TileName;
  get verticalLeft(): TileName;
  get verticalMiddle(): TileName;
  get verticalRight(): TileName;
  get edgeLeft(): TileName;
  get edgeMiddle(): TileName;
  get edgeRight(): TileName;
}
