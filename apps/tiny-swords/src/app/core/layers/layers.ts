import { GroundLayer } from './kinds/common/ground-layer/ground-layer';
import { LayersMap, LayersRenderType } from './layers.types';
import { WaterLayer } from './kinds/common/water-layer/water-layer';
import { getStartEndCoords } from './layers.utils';
import { ShadowLayer } from './kinds/common/shadow-layer/shadow-layer';
import { DecoLayer } from './kinds/common/decorations-layer/decorations-layer';
import { BuildingsLayer } from './kinds/common/buildings-layer/buildings-layer';
import { SignLayer } from './kinds/common/sign-layer/sign-layer';
import { BoundaryLayer } from './kinds/common/boundary-layer/boundary-layer';
import { ForegroundLayer } from './kinds/common/foreground-layer/foreground-layer';
import { LevelType } from '../level/level';
import { SandLayer } from './kinds/common/sand-layer/sand-layer';

export class Layers {
  #layers;
  gridX;
  gridY;
  startCoords;
  endCoords;

  constructor(level, nextLevel, gridX, gridY, border) {
    const [startCoords, endCoords] = getStartEndCoords(gridX, gridY, border);

    this.gridX = gridX;
    this.gridY = gridY;
    this.startCoords = startCoords;
    this.endCoords = endCoords;

    const terrainLayer =
      level === LevelType.Ground
        ? new GroundLayer(gridX, gridY, border, startCoords, endCoords)
        : new SandLayer(gridX, gridY, border, startCoords, endCoords);

    const buildingsLayer = new BuildingsLayer(gridX, gridY, level, nextLevel, startCoords, endCoords, terrainLayer);
    const signLayer = new SignLayer(gridX, gridY, startCoords, endCoords);

    this.#layers = [
      {
        layer: new WaterLayer(gridX, gridY),
        type: LayersRenderType.Background,
        renderOrder: 0,
      },
      {
        layer: terrainLayer,
        type: LayersRenderType.Background,
        renderOrder: 2,
      },
      {
        layer: new ShadowLayer(gridX, gridY, level, terrainLayer),
        type: LayersRenderType.Background,
        renderOrder: 1,
      },
      {
        layer: new DecoLayer(gridX, gridY, level, [terrainLayer, buildingsLayer, signLayer]),
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
      // {
      //   layer: new BoundaryLayer(gridX, gridY, [terrainLayer, buildingsLayer, signLayer]),
      //   type: LayersRenderType.Background,
      //   renderOrder: 6,
      // },
      {
        layer: new ForegroundLayer(gridX, gridY, level, nextLevel, startCoords, endCoords, terrainLayer),
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
