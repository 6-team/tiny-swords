import { ICoordinateSystem } from '../../common/common.types';

export type RendererConfig = {
  canvas: HTMLCanvasElement;
  coordinateSystem: ICoordinateSystem;
  scale: number;
};
