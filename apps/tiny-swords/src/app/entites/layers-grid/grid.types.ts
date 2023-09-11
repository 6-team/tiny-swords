import { TileName } from "../renderer/renderer.const";

export interface IGridCell {
	collapsed: boolean,
	coords: number[],
	options: TileName[],
}
