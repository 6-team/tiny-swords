import { LayerCondition } from "../../../layer/layer.types";
import { TileName } from "../../../renderer";

/**
 * Шаблон для границ
 */
export const boundaryConditions = (layers): LayerCondition[] => {
    const conditions = [];

    layers.forEach((layer) => {
      layer.array.forEach(({ coords, boundary }) => {
        if (boundary) {
          conditions.push({ tile: TileName.BOUNDARY, coords, })
        }
      });
    });

    return conditions;
}