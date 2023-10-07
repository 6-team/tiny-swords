import { LayerCondition } from "../../../layer/layer.types";
import { TileName } from "../../../renderer";

/**
 * Шаблон для дорисовки знаков
 */
export const signConditions = (enter: [number, number], exit: [number, number]): LayerCondition[] => {
  return [
    // левый знак
    { tile: TileName.DECO_SIGN_STOP_BOTTOM, coords: [enter[0] - 1, enter[1]], boundary: true },
    { tile: TileName.DECO_SIGN_STOP_TOP, coords: [enter[0] - 1, enter[1] - 1] },
    // правый знак
    { tile: TileName.DECO_SIGH_RIGHT_BOTTOM, coords: [exit[0] + 1, exit[1]], boundary: true },
    { tile: TileName.DECO_SIGH_RIGHT_TOP, coords: [exit[0] + 1, exit[1] - 1] },
  ];
}
