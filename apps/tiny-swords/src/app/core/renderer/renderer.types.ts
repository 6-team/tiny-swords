import { IGrid } from '../../common/common.types';

export interface RendererConfig {
  canvas: HTMLCanvasElement;
  Grid: IGrid;
  scale: number;
}
