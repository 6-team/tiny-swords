import { Matrix } from "../../../tools/matrix/matrix";
import { TileName } from "../../renderer/renderer.const";

export interface ILayersGridCell {
	collapsed: boolean,
	coords: [number, number],
	options: TileName[],
}

export interface ILayersGridOptions {
	gridX: number,
	gridY: number,
	enter: [number, number],
	exit: [number, number],
}

type ILayersGridTemplateProps = ILayersGridOptions & {
	grid: Matrix<ILayersGridCell>;
	boundaries: [number, number][];
};

export interface ILayersGridTemplate {
  create: (data: ILayersGridTemplateProps) => ILayersGridCondition[];
}

export const enum RoleType {
  ENTER = 'enter',
  EXIT = 'exit',
}

export interface ILayersGridCondition {
  tile: TileName;
  coords: [number, number];
	boundary?: boolean;
  role?: RoleType,
}
