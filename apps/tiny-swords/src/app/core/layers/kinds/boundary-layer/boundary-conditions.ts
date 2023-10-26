import { Layer } from "@core/layer";
import { LayerCondition } from "@core/layer";
import { TileName } from "@core/renderer";

/**
 * Creates an array of layer conditions representing boundary conditions based on provided layers.
 *
 * @param {Layer[]} layers - An array of layers from which to extract boundary conditions.
 * @returns {LayerCondition[]} - An array of layer conditions representing boundary conditions.
 */
export const boundaryConditions = (layers: Layer[]): LayerCondition[] => {
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