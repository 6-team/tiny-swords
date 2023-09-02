import { Maybe } from '../../tools/monads/maybe';
import { mapTileNameToClass } from './scene.const';
import { ITile, SceneConfig } from './scene.types';
import { bridgeLevel, level1, level2, level3, level4, level5, level6, level7 } from '../../generator/generate';
import { DecoTile } from '../deco/deco';
import { Tile } from '../tile/tile';

export function* enumerate<T>(iterable: Iterable<T>): Generator<[number, T], void, void> {
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
    this.#context.imageSmoothingEnabled = false; // Отключаю сглаживание
  }

  async render(tileCoords: [number, number], tile: ITile) {
    const { image, coords, size } = await tile.getData();

    const destTileSize = this.#tileSize * this.#scale;
    const destTileX = tileCoords[0] * destTileSize;
    const destTileY = tileCoords[1] * destTileSize;

    this.#context.drawImage(image, coords[0], coords[1], size, size, destTileX, destTileY, destTileSize, destTileSize);

    const imageLevel = (level, tileDeco = false) => {
      if (level[`${tileCoords[1]}.${tileCoords[0]}`]) {
        const newTail = level[`${tileCoords[1]}.${tileCoords[0]}`];
        let tail: Tile<number>;
        if (!tileDeco) {
          const { constructor: Constructor, args } = mapTileNameToClass[newTail.tail];

          tail = new Constructor(...args);
        } else {
          tail = new DecoTile(newTail.tail);
        }

        tail.getData().then(({ image, coords, size }) => {
          this.#context.drawImage(
            image,
            coords[0],
            coords[1],
            size,
            size,
            destTileX,
            destTileY,
            destTileSize,
            destTileSize,
          );
        });
      }
    };

    imageLevel(level1);
    imageLevel(level2);
    imageLevel(level3);
    imageLevel(level4);
    imageLevel(bridgeLevel);
    imageLevel(level7, true);

    return this;
  }

  async renderLayer(map: Array<Array<boolean | null>>) {
    for (const [rowIndex, row] of enumerate(map)) {
      for (const [tileNameIndex, tileName] of enumerate(row)) {
        const keyLevel1 = level1[`${rowIndex}.${tileNameIndex}`];
        const keyLevel2 = level2[`${rowIndex}.${tileNameIndex}`];
        const keyLevel3 = level3[`${rowIndex}.${tileNameIndex}`];
        const keyLevel4 = level4[`${rowIndex}.${tileNameIndex}`];
        const keyLevel7 = level7[`${rowIndex}.${tileNameIndex}`];
        const keyBridgeLevel = bridgeLevel[`${rowIndex}.${tileNameIndex}`];

        const current = keyLevel1 || keyLevel2 || keyLevel3 || keyLevel4 || keyBridgeLevel || keyLevel7;

        if (current) {
          await new Maybe(tileName)
            .map((name) => mapTileNameToClass[current.tail])
            .map((data) => {
              const { constructor: Constructor, args } = data;

              return this.render([tileNameIndex, rowIndex], new Constructor(...args));
            })
            .extract();
        }
      }
    }
  }
}
