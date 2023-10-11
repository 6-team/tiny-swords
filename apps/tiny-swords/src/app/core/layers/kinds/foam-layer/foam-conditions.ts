import { LayerCondition } from "../../../layer/layer.types";
import { TileName } from "../../../renderer";

const getFoamConditions = (tile, coords) => {
  if (tile === TileName.SAND_BOTTOM_MIDDLE) {
    return [{ tile: TileName.FOAM_BOTTOM, coords: [coords[0], coords[1] + 1] }];
  } else if (tile === TileName.SAND_TOP_MIDDLE) {
    return [{ tile: TileName.FOAM_TOP, coords: [coords[0], coords[1] - 1] }];
  } else if (tile === TileName.SAND_MIDDLE_LEFT) {
    return [{ tile: TileName.FOAM_LEFT, coords: [coords[0] - 1, coords[1]] }];
  } else if (tile === TileName.SAND_MIDDLE_RIGHT) {
    return [{ tile: TileName.FOAM_RIGHT, coords: [coords[0] + 1, coords[1]] }];
  } else if (tile === TileName.SAND_TOP_LEFT) {
    return [
      { tile: TileName.FOAM_LEFT, coords: [coords[0] - 1, coords[1]] },
      { tile: TileName.FOAM_TOP, coords: [coords[0], coords[1] - 1] }
    ];
  } else if (tile === TileName.SAND_TOP_RIGHT) {
    return [
      { tile: TileName.FOAM_RIGHT, coords: [coords[0] + 1, coords[1]] },
      { tile: TileName.FOAM_TOP, coords: [coords[0], coords[1] - 1] }
    ];
  } else if (tile === TileName.SAND_BOTTOM_LEFT) {
    return [
      { tile: TileName.FOAM_LEFT, coords: [coords[0] - 1, coords[1]] },
      { tile: TileName.FOAM_BOTTOM, coords: [coords[0], coords[1] + 1] }
    ];
  } else if (tile === TileName.SAND_BOTTOM_RIGHT) {
    return [
      { tile: TileName.FOAM_RIGHT, coords: [coords[0] + 1, coords[1]] },
      { tile: TileName.FOAM_BOTTOM, coords: [coords[0], coords[1] + 1] }
    ];
  }

  return [];
}

/**
 * Шаблон для пены
 */
export const foamConditions = (layer): LayerCondition[] => {
  let conditions = [];

  layer.array.forEach(({ coords, options }) => {
    const conditionsCell = getFoamConditions(options[0], coords);

    if (conditionsCell.length) {
      conditions = [
        ...conditions,
        ...conditionsCell,
      ];
    }
  });

  return conditions;
}
