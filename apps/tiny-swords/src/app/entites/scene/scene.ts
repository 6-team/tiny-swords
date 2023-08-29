import { Maybe } from "../../tools/monads/maybe";
import { TileName, mapTileNameToClass } from "./scene.const";
import { ITile, SceneConfig } from "./scene.types";

function* enumerate<T>(iterable: Iterable<T>): Generator<[number, T], void, void> {
  let index = 0;

  for (const value of iterable) {
    yield [index++, value];
  }
}

export class Scene {
  #context: CanvasRenderingContext2D;
  #tileSize: number;
  #scale: number;

  constructor({ tileSize, scale }: SceneConfig) {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;

    this.#context = canvas.getContext('2d');
    this.#tileSize = tileSize;
    this.#scale = scale;
  }

  async render(tileCoords: [number, number], tile: ITile) {
    const { image, coords, size } = await tile.getData();

    const destTileSize = this.#tileSize * this.#scale;
    const destTileX = tileCoords[0] * destTileSize;
    const destTileY = tileCoords[1] * destTileSize;

    this.#context.drawImage(
      image,
      coords[0],
      coords[1],
      size,
      size,
      destTileX,
      destTileY,
      destTileSize,
      destTileSize
    );

    return this;
  }

  async renderLayer(map: Array<Array<TileName | null>>) {
    for (const [rowIndex, row] of enumerate(map)) {
      for (const [tileNameIndex, tileName] of enumerate(row)) {
        await new Maybe(tileName)
          .map(name => mapTileNameToClass[name])
          .map(data => {
            const { constructor: Constructor, args } = data;

            return this.render([tileNameIndex, rowIndex], new Constructor(...args));
          })
          .extract();
      }
    }
  }
}
