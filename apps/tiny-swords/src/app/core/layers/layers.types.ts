import { SpriteName } from "@core/renderer";

export const enum LayersRenderType {
  Background,
	Foreground,
}

export interface LayersMap {
	type: LayersRenderType;
	map: (SpriteName | null)[][];
	renderOrder: number;
}