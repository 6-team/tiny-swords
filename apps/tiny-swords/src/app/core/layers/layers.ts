import { GroundLayer } from "./kinds/ground/ground-layer/ground-layer";
import { LayersMap, LayersRenderType } from "./layers.types";
import { WaterLayer } from "./kinds/common/water-layer/water-layer";
import { getStartEndCoords } from "./layers.utils";
import { ShadowLayer } from "./kinds/ground/shadow-layer/shadow-layer";
import { DecoLayer } from "./kinds/common/decorations-layer/decorations-layer";
import { BuildingsLayer } from "./kinds/ground/buildings-layer/buildings-layer";
import { SignLayer } from "./kinds/common/sign-layer/sign-layer";
import { BoundaryLayer } from "./kinds/common/boundary-layer/boundary-layer";
import { ForegroundLayer } from "./kinds/ground/foreground-layer/foreground-layer";

export class Layers {
  #layers;
  gridX;
  gridY;
  startCoords;
  endCoords;

  constructor(currentLevelType, nextLevelType, gridX, gridY) {
    const border = 1;
    const [startCoords, endCoords] = getStartEndCoords(gridX, gridY, border, [2, 2], [2, 2]);
      
    this.gridX = gridX;
    this.gridY = gridY;
    this.startCoords = startCoords;
    this.endCoords = endCoords;

    const groundLayer = new GroundLayer(gridX, gridY, border, startCoords, endCoords, nextLevelType);
    const buildingsLayer =  new BuildingsLayer(gridX, gridY, nextLevelType, startCoords, endCoords, groundLayer);
    const signLayer = new SignLayer(gridX, gridY, startCoords, endCoords);

    this.#layers = [
      {
        layer: new WaterLayer(gridX, gridY),
        type: LayersRenderType.Background,
        renderOrder: 0,
      },
      {
        layer: groundLayer,
        type: LayersRenderType.Background,
        renderOrder: 2,
      },
      {
        layer: new ShadowLayer(gridX, gridY, groundLayer),
        type: LayersRenderType.Background,
        renderOrder: 1,
      },
      {
        layer: new DecoLayer(gridX, gridY, currentLevelType, groundLayer),
        type: LayersRenderType.Background,
        renderOrder: 3,
      },
      {
        layer: buildingsLayer,
        type: LayersRenderType.Background,
        renderOrder: 4,
      },
      {
        layer: signLayer,
        type: LayersRenderType.Background,
        renderOrder: 5,
      },
      {
        layer: new BoundaryLayer(gridX, gridY, [groundLayer, buildingsLayer, signLayer]),
        type: LayersRenderType.Background,
        renderOrder: 6,
      },
      {
        layer: new ForegroundLayer(gridX, gridY, nextLevelType, startCoords, endCoords, groundLayer),
        type: LayersRenderType.Foreground,
        renderOrder: 7,
      },
    ];
  }

  get boundaries() {
    const boundaries = [];

    this.#layers.forEach(({ layer }) => {
      layer.array.forEach(({ coords, boundary }) => {
        if (boundary) {
          boundaries.push(coords);
        }
      });
    });

    return boundaries;
  }

  get maps(): LayersMap[] {
    const maps = [];

    this.#layers.forEach(({ layer, type, renderOrder }) => {
      const map = [];

      for (let y = 0; y < this.gridY; y++) {
        const row = [];

        for (let x = 0; x < this.gridX; x++) {
          const cell = layer.array[this.gridX * y + x];

          if (cell?.collapsed) {
            row.push(cell.options[0]);
          } else {
            row.push(null);
          }
        }

        map.push(row);
      }

      maps.push({
        map,
        type,
        renderOrder,
      });
    });

    return maps.sort((a, b) => a.renderOrder - b.renderOrder);
  }
}