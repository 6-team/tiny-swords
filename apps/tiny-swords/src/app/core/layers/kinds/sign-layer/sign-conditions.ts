import { LayerCondition } from "../../../layer/layer.types";
import { TileName } from "../../../renderer";

/**
 * Generates sign conditions for a layer.
 * @param {Array<number>} enter - The coordinates of the entrance [x, y].
 * @param {Array<number>} exit - The coordinates of the exit [x, y].
 * @returns {Array<LayerCondition>} An array of sign conditions.
 */
export const signConditions = (enter: [number, number], exit: [number, number]): LayerCondition[] => {
  return [
    // left sign
    { tile: TileName.DECO_SIGN_STOP_BOTTOM, coords: [enter[0] - 1, enter[1]], boundary: true },
    { tile: TileName.DECO_SIGN_STOP_TOP, coords: [enter[0] - 1, enter[1] - 1] },
    // right sign
    { tile: TileName.DECO_SIGH_RIGHT_BOTTOM, coords: [exit[0] + 1, exit[1]], boundary: true },
    { tile: TileName.DECO_SIGH_RIGHT_TOP, coords: [exit[0] + 1, exit[1] - 1] },
  ];
}
