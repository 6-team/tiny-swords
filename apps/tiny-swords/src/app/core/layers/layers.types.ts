import { Matrix } from "../../tools/matrix/matrix";
import { TileName } from "../renderer";

export interface ILayersCell {
	collapsed: boolean,
	coords: [number, number],
	options: TileName[],
}

export interface ILayersOptions {
	gridX: number,
	gridY: number,
	enter: [number, number],
	exit: [number, number],
}

type ILayersTemplateProps = ILayersOptions & {
	grid: Matrix<ILayersCell>;
	boundaries: [number, number][];
};

export interface ILayersTemplate {
  create: (data: ILayersTemplateProps) => ILayersCondition[];
}

export const enum RoleType {
  ENTER = 'enter',
  EXIT = 'exit',
}

export interface ILayersCondition {
  tile: TileName;
  coords: [number, number];
	boundary?: boolean;
  role?: RoleType,
}