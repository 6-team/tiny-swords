import { IGrid, IMovableCharacter, ITile } from '../../common/common.types';
import { Maybe } from '../../tools/monads/maybe';
import { TileName, mapTileNameToClass } from './renderer.const';
import { RendererConfig } from './renderer.types';

function* enumerate<T>(iterable: Iterable<T>): Iterable<[number, T]> {
  let index = 0;

  for (const value of iterable) {
    yield [index++, value];
  }
}

async function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.src = src;
  });
}

/**
 * Класс, отвечающий за рендер элементов в canvas.
 * По идее ничего не знает про размеры тайлов и каким координатам в px соответствуют номера тайлов.
 */
export class Renderer {
  #canvas: HTMLCanvasElement;
  #context: CanvasRenderingContext2D;
  #grid: IGrid;
  #scale: number;

  constructor({ canvas, grid, scale }: RendererConfig) {
    this.#canvas = canvas;
    this.#context = this.#canvas.getContext('2d');
    this.#grid = grid;
    this.#scale = scale;
    this.#context.imageSmoothingEnabled = false; // Отключаю сглаживание
  }

  clear(): void {
    this.#context.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
  }

  async render(elementPxCoords: [number, number, number, number], tile: ITile) {
    const [elementPxX, elementPxY, elementPxHeight, elementPxWidth] = elementPxCoords;
    const { image, coords, size } = await tile.getData();

    this.#context.drawImage(
      image,
      coords[0],
      coords[1],
      size,
      size,
      elementPxX * this.#scale,
      elementPxY * this.#scale,
      elementPxHeight * this.#scale,
      elementPxWidth * this.#scale,
    );

    return this;
  }

  async renderWithAnimation(elementPxCoords: [number, number, number, number], tile: ITile, deltaTime?: number) {
    const [elementPxX, elementPxY, elementPxHeight, elementPxWidth] = elementPxCoords;
    const { image, size, col, row, coords, scale } = await tile.getData();

    const dx =
      this.#scale > scale ? elementPxX * this.#scale + (this.#grid.tileSize * scale) / 2 : elementPxX * this.#scale;
    const dy =
      this.#scale > scale ? elementPxY * this.#scale + (this.#grid.tileSize * scale) / 2 : elementPxY * this.#scale;

    this.#context.drawImage(
      image,
      coords[0] * col,
      coords[1] * row,
      size,
      size,
      dx,
      dy,
      elementPxHeight * scale,
      elementPxWidth * scale,
    );

    // FOR_TEST_PURPOSES:
    // Данный функционал закоментирован для проверки движения персонажа (просто накладывается сетка 3х3 для понимания коллизий персонажа)

    // for(let i = 0; i < 3; i++) {
    //   for(let j = 0; j < 3; j++) {
    //     this.#context.strokeRect(
    //       elementPxX * this.#scale + this.#grid.tileSize * this.#scale * i,
    //       elementPxY * this.#scale + this.#grid.tileSize * this.#scale * j,
    //       this.#grid.tileSize * this.#scale,
    //       this.#grid.tileSize * this.#scale)
    //   }
    // }

    tile.initAnimation(deltaTime);

    return this;
  }

  async renderMovable(tile: IMovableCharacter, deltaTime: number) {
    const { coords, sizes } = tile.getAbility('movable');

    this.renderWithAnimation([coords[0], coords[1], sizes[0], sizes[1]], tile, deltaTime);
  }

  async renderStaticLayer(map: Array<Array<TileName | null>>) {
    for (const [rowIndex, row] of enumerate(map)) {
      for (const [tileNameIndex, tileName] of enumerate(row)) {
        await new Maybe(tileName)
          .map((name) => mapTileNameToClass[name])
          .map((data) => {
            const { constructor: Constructor, args } = data;

            return this.render(this.#grid.transformToPixels(tileNameIndex, rowIndex, 1, 1), new Constructor(...args));
          })
          .extract();
      }
    }
  }

  async renderMovableLayer(movables: Array<IMovableCharacter>, deltaTime: number) {
    this.clear();

    for (const movable of movables) {
      new Maybe(movable).map((tile) => this.renderMovable(tile, deltaTime));
    }
  }

  async renderHealthBar(lives: { totalLives: number; availableLives: number; blockedLives: number }) {
    const { totalLives, availableLives, blockedLives } = lives;
    const heartWidth = 20;
    const heartHeight = 20;
    const heartgPadding = 10;
    const backgroundWidth = 128;
    const backgroundHeight = 42;
    const barPositionX = 1080;
    const barPositionY = 20;

    const [backgroundImage, heartImage, wastedHeartImage, lockedHeartImage] = await Promise.all([
      loadImage('img/UI/Ribbon_Yellow_3Slides.png'),
      loadImage('img/UI/1.png'),
      loadImage('img/UI/1-1.png'),
      loadImage('img/UI/Regular_10.png'),
    ]);

    this.#context.drawImage(backgroundImage, barPositionX, barPositionY, backgroundWidth, backgroundHeight);

    for (let i = 0; i < totalLives; i++) {
      let heart;
      if (i < availableLives) {
        heart = heartImage;
      } else if (i < availableLives + blockedLives) {
        heart = wastedHeartImage;
      } else {
        heart = lockedHeartImage;
      }

      this.#context.drawImage(
        heart,
        i * (heartWidth + heartgPadding) + barPositionX + 22,
        barPositionY + 5,
        heartWidth,
        heartHeight,
      );
    }
    return this;
  }

  async renderResourcesBar(resources: Array<{ type: string; count: number; image: string }>) {
    const backgroundImage = await loadImage('img/UI/Banner_Connection_Left.png');
    const hPadding = 30;
    const vPadding = 10;
    const backgroundWidth = 85;
    const backgroundHeight = 100;

    this.#context.font = '18px vinque';
    this.#context.fillStyle = 'SaddleBrown';

    const maxWidthText = Math.max(...resources.map(({ count }) => this.#context.measureText(String(count)).width));
    this.#context.drawImage(
      backgroundImage,
      50,
      20,
      backgroundWidth + maxWidthText + maxWidthText / 2,
      backgroundHeight,
    );

    await Promise.all(
      resources.map(async (resource, i) => {
        const resourceImage = await loadImage(resource.image);
        this.#context.fillText(String(resource.count), 115 + maxWidthText / 5, i * hPadding + 55);
        this.#context.drawImage(resourceImage, vPadding + 50 + maxWidthText / 5, i * hPadding + 5, 70, 70);
      }),
    );
    return this;
  }
}
