import { IGrid } from '../../common/common.types';

export interface RendererConfig {
  canvas: HTMLCanvasElement;
  grid: IGrid;
  scale: number;
}
