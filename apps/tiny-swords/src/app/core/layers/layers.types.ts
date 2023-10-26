import { TileName } from "@core/renderer";

export const enum LayersRenderType {
  Background,
	Foreground,
}

export interface LayersMap {
	type: LayersRenderType;
	map: (TileName | null)[][];
	renderOrder: number;
}