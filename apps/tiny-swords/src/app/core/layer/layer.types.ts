import { SpriteName } from "@core/renderer";

export interface LayerCell {
	collapsed: boolean,
	coords: [number, number],
	options: SpriteName[],
	boundary: boolean,
}

export interface LayerCondition {
  sprite: SpriteName;
  coords: [number, number];
	boundary?: boolean;
}

export interface LayerRules {
  [key: number]: SpriteName[][];
}

export type SpriteWeight = [SpriteName, number, boolean];