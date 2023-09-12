import { Matrix } from "../../tools/matrix/matrix";
import { TileName } from "../renderer";

export interface LayersCell {
	collapsed: boolean,
	coords: [number, number],
	options: TileName[],
}

export interface LayersOptions {
	gridX: number,
	gridY: number,
	enter: [number, number],
	exit: [number, number],
}

type LayersTemplateProps = LayersOptions & {
	grid: Matrix<LayersCell>;
	boundaries: [number, number][];
};

export interface LayersTemplate {
  create: (data: LayersTemplateProps) => LayersCondition[];
}

export const enum RoleType {
  ENTER = 'enter',
  EXIT = 'exit',
}

export interface LayersCondition {
  tile: TileName;
  coords: [number, number];
	boundary?: boolean;
  role?: RoleType,
}