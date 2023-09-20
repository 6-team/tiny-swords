import { TileName } from "../renderer";

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

export interface LayerWight {
  [index: number]: [TileName, number, boolean]
}