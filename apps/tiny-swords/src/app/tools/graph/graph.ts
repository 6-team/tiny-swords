import { createPrefilledColors } from './graph.utils';
import { Colors, Errors } from './graph.types';

class Edge<T> {
  constructor(public destination: T, public weight?: number) {}
}

export class Graph<T> {
  #list: Map<T, Array<Edge<T>>> = new Map();
  #directed: boolean;

  constructor(initial?: Iterable<T> | null, directed?: boolean) {
    this.#directed = directed ?? false;

    if (initial) {
      for (const vertex of initial) {
        this.addVertex(vertex);
      }
    }
  }

  get directed(): boolean {
    return this.#directed;
  }

  getAdjacent(key: T): Array<Edge<T>> | void {
    return this.#list.get(key);
  }

  addVertex(key: T): this {
    if (!this.getAdjacent(key)) {
      this.#list.set(key, []);
    }

    return this;
  }

  addEdge(origin: T, destination: T): this;
  addEdge(origin: T, destination: T, weight: number): this;
  addEdge(origin: T, destination: T, weight?: number): this {
    this.addVertex(origin);
    this.addVertex(destination);

    const originAdjacent = this.getAdjacent(origin);
    const destAdjacent = this.getAdjacent(destination);

    if (originAdjacent) {
      originAdjacent.push(new Edge(destination, weight));
    }

    if (!this.#directed && destAdjacent) {
      destAdjacent.push(new Edge(origin, weight));
    }

    return this;
  }

  isAdjacent(origin: T, destination: T): boolean {
    const adjacent = this.getAdjacent(origin);

    if (!adjacent) {
      throw new Error(Errors.VERTEX_NOT_FOUND);
    }

    return adjacent.some((edge: Edge<T>) => edge.destination === destination);
  }

  /**
   * Обходит связный подграф в глубину, начиная с переданной вершины
   *
   * @param startVertex Вершина, с которой начнётся обход графа
   * @param colors Отображение вершин графа на их цвета в контексте обхода графа
   */
  *#DFS(startVertex: T, colors: Map<T, Colors>): Iterable<[T, Colors]> {
    const stack = [startVertex];

    while (stack.length) {
      const key = stack.pop();

      if (!key) {
        continue;
      }

      const color = colors.get(key);

      /**
       * Ситуация, когда все потомки вершины посещены и мы вновь достаём её из стека:
       * В таком случае считаем, что вершина полностью обработана
       */
      if (color === Colors.GRAY) {
        colors.set(key, Colors.BLACK);

        yield [key, Colors.BLACK];

        continue;
      }

      /**
       * Если вершина еще не посещалась, помечаем её, как посещенную, но еще не обработанную
       */
      if (color === Colors.WHITE && key) {
        colors.set(key, Colors.GRAY);
        stack.push(key);

        yield [key, Colors.GRAY];

        const adjacent = this.#list.get(key!);

        if (adjacent) {
          for (let index = adjacent.length; index > 0; index--) {
            const edge = adjacent[index - 1];

            if (colors.get(edge.destination) === Colors.WHITE) {
              stack.push(edge.destination);
            }
          }
        }
      }
    }
  }

  /**
   * Обходит связный подграф в ширину, начиная с переданной вершины
   *
   * @param startVertex Вершина, с которой начнётся обход графа
   * @param colors Отображение вершин графа на их цвета в контексте обхода графа
   */
  *#BFS(startVertex: T, colors: Map<T, Colors>): Iterable<T> {
    const queue = [startVertex];

    while (queue.length) {
      const key = queue.shift();
      const color = colors.get(key!);

      /**
       * Если вершина еще не посещалась, помечаем её, как посещенную, но еще не обработанную
       */
      if (color === Colors.WHITE && key) {
        colors.set(key, Colors.GRAY);
        queue.push(key);

        yield key;

        const adjacent = this.#list.get(key!);

        if (adjacent) {
          for (const edge of adjacent) {
            if (colors.get(edge.destination) === Colors.WHITE) {
              queue.push(edge.destination);
            }
          }
        }

        /**
         * Запланировали посещение всех смежных вершин, значит с текущей закончили, она обработана
         */
        colors.set(key, Colors.BLACK);
      }
    }
  }

  *getDFSIterator() {
    const colors = createPrefilledColors(this.#list);

    for (const [vertex] of this.#list) {
      for (const [currentVertex, currentColor] of this.#DFS(vertex, colors)) {
        /**
         * При DFS мы показываем вершины в порядке их посещения
         * Я решил, что дам возможность отследить и посещение и окончательную обработку вершины
         */
        if (currentColor === Colors.GRAY) {
          yield currentVertex;
        }
      }
    }
  }

  *getDFSReversedIterator() {
    const colors = createPrefilledColors(this.#list);

    for (const [vertex] of this.#list) {
      for (const [currentVertex, currentColor] of this.#DFS(vertex, colors)) {
        if (currentColor === Colors.BLACK) {
          yield currentVertex;
        }
      }
    }
  }

  *getBFSIterator() {
    const colors = createPrefilledColors(this.#list);
    const list = this.#list;

    for (const [key] of list) {
      yield* this.#BFS(key, colors);
    }
  }

  topologicalSort(): Array<T> {
    return [...this.getDFSIterator()];
  }

  #getClosestNotVisitedVertex(visited: Map<T, boolean>, distances: Map<T, number>): T {
    let minVertex = null;
    let minDistance = Infinity;

    for (const vertex of this.#list.keys()) {
      if (!visited.get(vertex) && distances.get(vertex)! < minDistance) {
        minDistance = distances.get(vertex)!;
        minVertex = vertex;
      }
    }

    return minVertex!;
  }

  #restorePath(previous: Map<T, T | null>, start: T, end: T) {
    const path = [end];
    let current = end;

    while (current !== null) {
      const prev = previous.get(current)!;

      path.push(prev);
      current = prev;

      if (prev === start) {
        return path.reverse();
      }
    }

    throw new Error(Errors.PATH_NOT_FOUND);
  }

  getShortPath(start: T, end: T): [number, Array<T>] {
    if (!this.#directed) {
      throw new Error(Errors.UNABLE_FIND_SHORT_PATH);
    }

    const keys = Array.from(this.#list.keys());
    const visited = new Map<T, boolean>();
    const distances = new Map<T, number>();
    const previous = new Map<T, T | null>();

    function hasUnvisited() {
      for (const vertex of keys) {
        if (!visited.get(vertex) && distances.get(vertex)! < Infinity) {
          return true;
        }
      }

      return false;
    }

    function relax(start: T, edge: Edge<T>) {
      const newDistance = distances.get(start)! + edge.weight!;

      if (distances.get(edge.destination)! > newDistance) {
        distances.set(edge.destination, newDistance);
        previous.set(edge.destination, start);
      }
    }

    for (const vertex of keys) {
      distances.set(vertex, Infinity);
      previous.set(vertex, null);
    }

    distances.set(start, 0);

    while (hasUnvisited()) {
      const nextVertex = this.#getClosestNotVisitedVertex(visited, distances);
      const neighbours = this.#list.get(nextVertex)!;

      visited.set(nextVertex, true);

      for (const edge of neighbours) {
        relax(nextVertex, edge);
      }
    }

    return [distances.get(end)!, this.#restorePath(previous, start, end)];
  }
}
