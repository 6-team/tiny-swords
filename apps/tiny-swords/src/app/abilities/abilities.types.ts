import { ITile, TNumberOfPixels, TPixelsPosition } from '@common/common.types';

export interface IAbility<Context> {
  /**
   * Устанавливает контекст/носителя данной способности.
   * Нужно, чтобы вызывать его методы, такие как показ анимации, изменение изображения и т.п.
   *
   * @param context Контекст
   * @returns Объект способности
   */
  setContext(context: Context): this;
}

export interface WithSetPersonageContext {
  setContext(context: ITile): void;
}

export type TPixelsCoords = [
  pxX: TPixelsPosition,
  pxY: TPixelsPosition,
  pxHeight: TNumberOfPixels,
  pxWidth: TNumberOfPixels,
];

export type TCollisionArea = TPixelsCoords;
