import { LayerCondition } from "../../../layer/layer.types";
import { LevelType } from "../../../level/level.types";
import { TileName } from "../../../renderer";

const getStonesConditions = (tile, coords) => {
  switch(tile) {
    // тень под мостом
    case TileName.BRIDGE_MIDDLE:
      return [{ tile: TileName.BRIDGE_SHADOW, coords: [coords[0], coords[1] + 1] }];

    // Боковая скала
    case TileName.ELEVATION_BOTTOM_LEFT:
      return [{ tile: TileName.ELEVATION_EDGE_LEFT, coords: [coords[0], coords[1] + 1] }];
    case TileName.ELEVATION_BOTTOM_MIDDLE:
      return [{ tile: TileName.ELEVATION_EDGE_MIDDLE, coords: [coords[0], coords[1] + 1] }];
    case TileName.ELEVATION_BOTTOM_RIGHT:
      return [{ tile: TileName.ELEVATION_EDGE_RIGHT, coords: [coords[0], coords[1] + 1] }];
  
    default:
      return [];
  }
}

/**
 * Шаблон для дополнительных слоев высоты покрытия:
 * - тень под мостами
 * - трава или песок по мостами
 * - пена
 */
export const elevationConditions = (level: LevelType, layer): LayerCondition[] => {
  let conditions = [];
  
  if (level === LevelType.Stones) {
    layer.array.forEach(({ coords, options }) => {
      const conditionsCell = getStonesConditions(options[0], coords);

      if (conditionsCell.length) {
        conditions = [
          ...conditions,
          ...conditionsCell,
        ];
      }
    });
  }

  return conditions;
}
