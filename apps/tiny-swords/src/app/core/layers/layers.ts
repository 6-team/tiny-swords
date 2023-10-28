import { LevelType } from '@core/level';
import { Resource } from '@entities/resource';
import { grid64 } from '@core/grid';
import { getStartEndCoords } from './utils';
import { LayersMap, LayersRenderType } from './layers.types';
import { GroundLayer } from './kinds/ground-layer/ground-layer';
import { WaterLayer } from './kinds/water-layer/water-layer';
import { ShadowLayer } from './kinds/shadow-layer/shadow-layer';
import { DecoLayer } from './kinds/decorations-layer/decorations-layer';
import { BuildingsLayer } from './kinds/buildings-layer/buildings-layer';
import { SignLayer } from './kinds/sign-layer/sign-layer';
import { ForegroundLayer } from './kinds/foreground-layer/foreground-layer';
import { SandLayer } from './kinds/sand-layer/sand-layer';
import { ResourcesLayer } from './kinds/resources-layer/resurces-layer';
import { EnemiesLayer } from './kinds/enemies-layer/enemies-layer';
import { StonesLayer } from './kinds/stones-layer/stones-layer';
import { ElevationLayer } from './kinds/elevation-layer/elevation-layer';

/**
 * Represents a class for creating a layers array for static rendering by level type
 */
export class Layers {
  /**
   * Array of layers
   *
   * @type {Array<Layer>}
   */
  private _layers;

  /**
   * Resource Layer
   *
   * @type {ResourcesLayer}
   */
  private _resources;

  /**
   * Enemy Layer
   *
   * @type {EnemiesLayer}
   */
  private _enemies;

  /**
   * The size of the layer matrix by width
   *
   * @type {number}
   */
  gridX: number;

  /**
   * The size of the layer matrix in height
   *
   * @type {number}
   */
  gridY: number;

  /**
   * Coordinates of initialization of players
   *
   * @type {number}
   */
  startCoords: [number, number];

  /**
   * Coordinates to go to the next level
   *
   * @type {number}
   */
  endCoords;

  /**
   * Creating an array of layers by the type of the current level.
   * The building of the next level depends on the type of the next level
   *
   * @param {LevelType} level
   * @param {LevelType} nextLevel
   * @param {number} gridX
   * @param {number} gridY
   * @param {number} border
   */
  constructor(level, nextLevel, gridX, gridY, border) {
    const [startCoords, endCoords] = getStartEndCoords(gridX, gridY, border);

    this.gridX = gridX;
    this.gridY = gridY;
    this.startCoords = startCoords;
    this.endCoords = endCoords;

    let terrainLayer;

    switch (level) {
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

    this._layers = [
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

    this._resources = new ResourcesLayer(gridX, gridY, level, [terrainLayer, buildingsLayer, signLayer, decoLayer]);
    this._enemies = new EnemiesLayer(gridX, gridY, level, startCoords, endCoords, [
      terrainLayer,
      buildingsLayer,
      signLayer,
    ]);
  }

  /**
   * Array of boundaries for collisions with static map objects
   *
   * @returns {[number, number][]} - Array of coordinates
   */
  get boundaries() {
    const boundaries = [];

    this._layers.forEach(({ layer }) => {
      layer.array.forEach(({ coords, boundary }) => {
        if (boundary) {
          boundaries.push(coords);
        }
      });
    });

    return boundaries;
  }

  /**
   * Getting an array of maps for rendering
   *
   * @returns {LayersMap[]} - Array of maps with coordinates
   */
  get maps(): LayersMap[] {
    const maps = [];

    this._layers.forEach(({ layer, type, renderOrder }) => {
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

  /**
   * Getting an array of resource objects
   *
   * @returns {Resource[]} - Array of Resource objects
   */
  get resources() {
    return this._resources.array
      .filter(({ collapsed }) => collapsed)
      .map(({ options, coords }) => {
        return new Resource({ type: options[0], coords: grid64.transformToPixels(coords[0], coords[1], 1, 1) });
      });
  }

  /**
   * Getting an array of coordinates to initialize enemies
   *
   * @returns {[number, number][]} - Array of coordinates for initializing enemies
   */
  get enemies() {
    return this._enemies.array.filter(({ collapsed }) => collapsed).map(({ coords }) => coords);
  }
}
