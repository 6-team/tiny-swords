import { TileName } from "@core/renderer";

export interface LayerCell {
	collapsed: boolean,
	coords: [number, number],
	options: TileName[],
	boundary: boolean,
}

export interface LayerCondition {
  tile: TileName;
  coords: [number, number];
	boundary?: boolean;
}

export interface LayerRules {
  [key: number]: TileName[][];
}

export type TileWeight = [TileName, number, boolean];