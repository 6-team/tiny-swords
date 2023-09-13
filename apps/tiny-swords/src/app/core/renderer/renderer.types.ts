import { ICoordinateSystem } from '../../common/common.types';

export interface RendererConfig {
  canvas: HTMLCanvasElement;
  coordinateSystem: ICoordinateSystem;
  scale: number;
}
