import { GroundLayer } from './kinds/ground-layer/ground-layer';
import { LayersMap, LayersRenderType } from './layers.types';
import { WaterLayer } from './kinds/water-layer/water-layer';
import { getStartEndCoords } from './layers.utils';
import { ShadowLayer } from './kinds/shadow-layer/shadow-layer';
import { DecoLayer } from './kinds/decorations-layer/decorations-layer';
import { BuildingsLayer } from './kinds/buildings-layer/buildings-layer';
import { SignLayer } from './kinds/sign-layer/sign-layer';
// import { BoundaryLayer } from './kinds/boundary-layer/boundary-layer';
import { ForegroundLayer } from './kinds/foreground-layer/foreground-layer';
import { SandLayer } from './kinds/sand-layer/sand-layer';
import { LevelType } from '../level/level.types';
import { Resource } from '../../entities/resource';
import { grid64 } from '../grid';
import { ResourcesLayer } from './kinds/resources-layer/resurces-layer';
import { EnemiesLayer } from './kinds/enemies-layer/enemies-layer';
import { StonesLayer } from './kinds/stones-layer/stones-layer';
import { ElevationLayer } from './kinds/elevation-layer/elevation-layer';

export class Layers {
  #layers;
  #resources;
  #enemies;
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

    let terrainLayer;

    switch(level) {
      case LevelType.Ground:
        terrainLayer = new GroundLayer(gridX, gridY, border, startCoords, endCoords);
        break;
      case LevelType.Sand:
        terrainLayer = new SandLayer(gridX, gridY, border, startCoords, endCoords);
        break;
      case LevelType.Stones:
        terrainLayer = new StonesLayer(gridX, gridY, border, startCoords, endCoords);
        break;
    }

    const buildingsLayer = new BuildingsLayer(gridX, gridY, level, nextLevel, startCoords, endCoords, terrainLayer);
    const signLayer = new SignLayer(gridX, gridY, startCoords, endCoords);
    const decoLayer = new DecoLayer(gridX, gridY, level, [terrainLayer, buildingsLayer, signLayer]);

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
        layer: decoLayer,
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
      //   renderOrder: 7,
      // },
      {
        layer: new ElevationLayer(gridX, gridY, level, terrainLayer),
        type: LayersRenderType.Background,
        renderOrder: 6,
      },
      {
        layer: new ForegroundLayer(gridX, gridY, level, nextLevel, startCoords, endCoords, terrainLayer),
        type: LayersRenderType.Foreground,
        renderOrder: 8,
      },
    ];

    this.#resources = new ResourcesLayer(gridX, gridY, level, [terrainLayer, buildingsLayer, signLayer, decoLayer]);
    this.#enemies = new EnemiesLayer(gridX, gridY, level, startCoords, endCoords, [terrainLayer, buildingsLayer, signLayer]);
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

  get resources() {
    return this.#resources.array
      .filter(({ collapsed }) => collapsed)
      .map(({ options, coords }) => {
        return new Resource({ type: options[0], coords: grid64.transformToPixels(coords[0], coords[1], 1, 1) })
      });
  }

  get enemies() {
    return this.#enemies.array
      .filter(({ collapsed }) => collapsed)
      .map(({ coords }) => (coords));
  }
}
