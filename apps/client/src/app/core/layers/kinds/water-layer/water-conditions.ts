import { LayerCondition } from "../../../layer/layer.types";
import { TileName } from "../../../renderer";

/**
 * Шаблон для заливки всего слоя водой
 */
export const fullWaterConditions = (layer): LayerCondition[] => {
  const conditions = [];

  layer.array.forEach(({ coords }) => {
    conditions.push({ tile: TileName.WATER_MIDDLE_MIDDLE, coords, })
  });

  return conditions;
}
