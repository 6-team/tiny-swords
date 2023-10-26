import { MovingDirection } from '@shared';
import { Errors } from './pathfinder.const';
import { Graph } from '../../tools/graph';
import { TNumberOfTiles, TTiledCoords } from '../../common/common.types';

interface IPathFinderProps {
  width: TNumberOfTiles;
  height: TNumberOfTiles;
  bounds: Array<TTiledCoords>;
}

export class PathFinder {
  private _graph = new Graph<string>(null, true);

  constructor({ width, height, bounds }: IPathFinderProps) {
    this._graph = this._createGraph(width, height, bounds);
  }

  getDirections(from: TTiledCoords, to: TTiledCoords) {
    const [_, path] = this._graph.getShortPath(
      this.createVertexName(from[0], from[1]),
      this.createVertexName(to[0], to[1]),
    );

    return this.pathToDirections(path);
  }

  createVertexName(x: number, y: number): string {
    return `${x}_${y}`;
  }

  extractCoords(name: string): [x: number, y: number] {
    if (!/^\d+_\d+$/.test(name)) {
      throw new Error(Errors.WRONG_VERTEX_NAME);
    }

    return name.split('_').map((num: string) => Number(num)) as [number, number];
  }

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

  private _createGraph(maxX: TNumberOfTiles, maxY: TNumberOfTiles, bounds: Array<TTiledCoords>): Graph<string> {
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
