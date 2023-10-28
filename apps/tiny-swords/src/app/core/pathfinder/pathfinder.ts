import { MovingDirection } from '@shared';
import { Graph } from '@tools/graph';
import { Errors } from './pathfinder.const';
import { IPathFinderProps } from './pathfinder.types';

import type { TNumberOfSprites, TSpritePosition, TTiledCoords } from '@common/common.types';

/**
 * @class Designed to find the shortest path between two coordinates on the map
 */
export class PathFinder {
  private _graph = new Graph<string>(null, true);

  /**
   * @constructor
   * @param props.width — Map width
   * @param props.height — Map height
   * @param props.bounds — Array of map boundaries coordinates
   */
  constructor({ width, height, bounds }: IPathFinderProps) {
    this._graph = this._createGraph(width, height, bounds);
  }

  /**
   * Returns the sequence of commands that character need to perform to get to the destination point
   *
   * @param {TTiledCoords} from — Coordinates of the starting point
   * @param {TTiledCoords} to — Coordinates of the destination point
   * @returns {Array<MovingDirection>} The sequence of commands
   */
  getDirections(from: TTiledCoords, to: TTiledCoords): Array<MovingDirection> {
    const [_, path] = this._graph.getShortPath(
      this.createVertexName(from[0], from[1]),
      this.createVertexName(to[0], to[1]),
    );

    return this.pathToDirections(path);
  }

  /**
   * Creates vertex name from coordinates
   *
   * @param {TSpritePosition} x — X-axis coordinate
   * @param {TSpritePosition} y — Y-axis coordinate
   * @returns Vertex name
   */
  createVertexName(x: TSpritePosition, y: TSpritePosition): string {
    return `${x}_${y}`;
  }

  /**
   * Return vertex coordinates on map
   *
   * @param name Vertex name
   * @returns Coordinates
   */
  extractCoords(name: string): [x: TSpritePosition, y: TSpritePosition] {
    if (!/^\d+_\d+$/.test(name)) {
      throw new Error(Errors.WRONG_VERTEX_NAME);
    }

    return name.split('_').map((num: string) => Number(num)) as [TSpritePosition, TSpritePosition];
  }

  /**
   * Transforms a sequence of vertices into a sequence of commands for movement
   *
   * @param {Array<string>} path — Sequence of vertices names
   * @returns The sequence of commands
   */
  pathToDirections = (path: Array<string>): Array<MovingDirection> => {
    const commands: Array<MovingDirection> = [];

    for (let index = 0; index < path.length - 1; index++) {
      const [startX, startY] = this.extractCoords(path[index]);
      const [destX, destY] = this.extractCoords(path[index + 1]);

      if (destX > startX) {
        commands.push(MovingDirection.RIGHT);

        continue;
      }

      if (destX < startX) {
        commands.push(MovingDirection.LEFT);

        continue;
      }

      if (destY > startY) {
        commands.push(MovingDirection.DOWN);

        continue;
      }

      if (destY < startY) {
        commands.push(MovingDirection.UP);

        continue;
      }
    }

    return commands;
  };

  /**
   * Creates a graph representation of the map
   *
   * @private
   * @param {TNumberOfSprites} maxX Map width in tiles
   * @param {TNumberOfSprites} maxY Map height in tiles
   * @param {Array<TTiledCoords>} bounds Map boundaries
   * @returns Graph representation of the map
   */
  private _createGraph(maxX: TNumberOfSprites, maxY: TNumberOfSprites, bounds: Array<TTiledCoords>): Graph<string> {
    const boundsSet = new Set(bounds.map((coords: TTiledCoords) => this.createVertexName(coords[0], coords[1])));
    const graph = new Graph<string>(null, true);

    for (let x = 0; x < maxX; x++) {
      for (let y = 0; y < maxY; y++) {
        const origin = this.createVertexName(x, y);
        const left = this.createVertexName(x - 1, y);
        const right = this.createVertexName(x + 1, y);
        const top = this.createVertexName(x, y - 1);
        const bottom = this.createVertexName(x, y + 1);

        graph.addVertex(origin);

        if (boundsSet.has(origin)) {
          continue;
        }

        if (x > 0 && !graph.isAdjacent(origin, left) && !boundsSet.has(left)) {
          graph.addEdge(origin, left, 1);
        }

        if (x < maxX - 1 && !graph.isAdjacent(origin, right) && !boundsSet.has(right)) {
          graph.addEdge(origin, right, 1);
        }

        if (y > 0 && !graph.isAdjacent(origin, top) && !boundsSet.has(top)) {
          graph.addEdge(origin, top, 1);
        }

        if (y < maxY - 1 && !graph.isAdjacent(origin, bottom) && !boundsSet.has(bottom)) {
          graph.addEdge(origin, bottom, 1);
        }
      }
    }

    return graph;
  }
}
