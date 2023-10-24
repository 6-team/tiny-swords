import { IResource, IGrid, ITile } from "@common/common.types";
import { Maybe } from "@tools/monads";
import { TileName, mapTileNameToClass } from './renderer.const';
import { RendererConfig } from './renderer.types';
import { frames$ } from "@tools/observables";
import { Subscription } from 'rxjs';
import { IMovingCharacter } from "@abilities/moving";

/**
 * Returns an iterable that yields tuples where the first element is the index and
 * the second is the value from the provided iterable.
 *
 * @template T - The type of the elements in the input iterable.
 *
 * @param {Iterable<T>} iterable - The iterable sequence to enumerate.
 *
 * @yields {[number, T]} - A tuple where the first element is the index and the second is the value from the iterable.
 */
function* enumerate<T>(iterable: Iterable<T>): Iterable<[number, T]> {
  let index = 0;

  for (const value of iterable) {
    yield [index++, value];
  }
}

/**
 * Loads an image from a given source string.
 *
 * @param {string} src - The source of the image to load.
 * @returns {Promise<HTMLImageElement>} A Promise that resolves to an HTMLImageElement.
 */
export async function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.src = src;
  });
}

export class Renderer {
  private _canvas: HTMLCanvasElement;
  private _context: CanvasRenderingContext2D;
  private _grid: IGrid;
  private readonly _scale: number;
  private _framesSubscription?: Subscription;

  /**
   * Constructs a new Renderer instance responsible for rendering various aspects of the game.
   *
   * @param {RendererConfig} config - An object containing the configuration settings for the renderer.
   */
  constructor({ canvas, grid, scale }: RendererConfig) {
    this._canvas = canvas;
    this._context = this._canvas.getContext('2d');
    this._grid = grid;
    this._scale = scale;
    this._context.imageSmoothingEnabled = false; // Отключаю сглаживание
  }

  /**
   * Clears all the rendered content from the canvas.
   */
  clear(): void {
    this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
  }


  /**
   * Renders a game tile on the screen at the provided pixel coordinates.
   *
   * @param {[number, number, number, number]} elementPxCoords - The x and y coordinates along with height and width of the element in pixels.
   * @param {ITile} tile - The tile to be rendered.
   *
   * @returns {Promise<Renderer>} A promise to the Renderer instance for chaining.
   */
  async render(elementPxCoords: [number, number, number, number], tile: ITile): Promise<this> {
    const [elementPxX, elementPxY, elementPxHeight, elementPxWidth] = elementPxCoords;
    const { image, coords, size } = await tile.getData();

    this._context.drawImage(
      image,
      coords[0],
      coords[1],
      size,
      size,
      elementPxX * this._scale,
      elementPxY * this._scale,
      elementPxHeight * this._scale,
      elementPxWidth * this._scale,
    );

    return this;
  }

  /**
   * Renders a game tile on the screen at the provided pixel coordinates with an animation.
   *
   * @param {[number, number, number, number]} elementPxCoords - The x and y coordinates along with height and width of the element in pixels.
   * @param {ITile} tile - The tile to be rendered.
   * @param {number} [deltaTime] - The amount of time that should be spent rendering the animation.
   *
   * @returns {Promise<Renderer>} A promise to the Renderer instance for chaining.
   */
  async renderWithAnimation(elementPxCoords: [number, number, number, number], tile: ITile, deltaTime?: number): Promise<this> {
    const [elementPxX, elementPxY, elementPxHeight, elementPxWidth] = elementPxCoords;
    const { image, size, coords, scale } = await tile.getData();

    const dx =
      this._scale > scale ? elementPxX * this._scale + (this._grid.tileSize * scale) / 2 : elementPxX * this._scale;
    const dy =
      this._scale > scale ? elementPxY * this._scale + (this._grid.tileSize * scale) / 2 : elementPxY * this._scale;

    this._context.drawImage(
      image,
      coords[0],
      coords[1],
      size,
      size,
      dx,
      dy,
      elementPxHeight * scale,
      elementPxWidth * scale,
    );

    tile.switchAnimationFrame(deltaTime);

    return this;
  }


  /**
   * Renders a movable game character.
   *
   * @param {IMovingCharacter} tile - The movable character to be rendered.
   * @param {number} deltaTime - The amount of time that should be spent rendering the animation.
   *
   * @returns {Promise<void>}
   */
  async renderMovable(tile: IMovingCharacter, deltaTime: number): Promise<void> {
    const { coords, sizes } = tile.moving;

    await this.renderWithAnimation([coords[0], coords[1], sizes[0], sizes[1]], tile, deltaTime);
  }

  /**
   * Renders the static background layer of the game map.
   *
   * @param {Array<Array<TileName | null>>} map - 2D array representing the map to be rendered.
   *
   * @returns {Promise<void>}
   */
  async renderStaticLayer(map: Array<Array<TileName | null>>): Promise<void> {
    for (const [rowIndex, row] of enumerate(map)) {
      for (const [tileNameIndex, tileName] of enumerate(row)) {
        await new Maybe(tileName)
          .map((name) => mapTileNameToClass[name])
          .map((data) => {
            const { constructor: Constructor, args } = data;

            return this.render(this._grid.transformToPixels(tileNameIndex, rowIndex, 1, 1), new Constructor(...args));
          })
          .extract();
      }
    }
  }

  /**
   * Renders the movable characters on the layer of the game map.
   *
   * @param {Array<IMovingCharacter>} movables - The movable characters to be rendered.
   *
   * @returns {Promise<void>}
   */
  async renderMovableLayer(movables: Array<IMovingCharacter>) {
    let lastTime = 0;

    if (this._framesSubscription) {
      this._framesSubscription.unsubscribe();
    }

    this._framesSubscription = frames$.subscribe((timeStamp = 0) => {
      const deltaTime = timeStamp - lastTime;

      this.clear();

      for (const movable of movables) {
        new Maybe(movable).map((tile) => this.renderMovable(tile, deltaTime));
      }

      lastTime = timeStamp;
    });
  }

  /**
   * Renders the health bar of a character.
   *
   * @param {Object} lives - Describes the character's total, available, and blocked lives.
   * @param {number} lives.totalLives - The total number of lives the character has.
   * @param {number} lives.availableLives - The number of lives the character currently has available.
   * @param {number} lives.blockedLives - The number of lives the character currently has blocked.
   *
   * @returns {Promise<Renderer>} A promise to the Renderer instance for chaining.
   */
  async renderHealthBar(lives: { totalLives: number; availableLives: number; blockedLives: number }): Promise<this> {
    const { totalLives, availableLives, blockedLives } = lives;
    const heartWidth = 20;
    const heartHeight = 20;
    const heartPadding = 10;
    const backgroundWidth = 128;
    const backgroundHeight = 42;
    const barPositionX = 1152;
    const barPositionY = 20;

    const [backgroundImage, heartImage, lockedHeartImage] = await Promise.all([
      loadImage('./img/UI/Ribbon_Yellow_3Slides.png'),
      loadImage('./img/UI/1.png'),
      loadImage('./img/UI/Regular_10.png'),
    ]);

    this._context.drawImage(backgroundImage, barPositionX, barPositionY, backgroundWidth, backgroundHeight);

    const available = availableLives ? new Array(availableLives).fill(heartImage) : [];
    const wasted = new Array(totalLives - availableLives - blockedLives);
    const blocked = blockedLives >= 1 ? new Array(blockedLives).fill(lockedHeartImage) : [];

    const hearts = [...available, ...wasted, ...blocked];

    hearts.forEach((heart, i) => {
      if (heart) {
        this._context.drawImage(
          heart,
          i * (heartWidth + heartPadding) + barPositionX + 22,
          barPositionY + 5,
          heartWidth,
          heartHeight,
        );
      }
    });
    return this;
  }

  /**
   * Renders the resources bar of a character.
   *
   * @param {Array<IResource>} resources - The resources to be rendered.
   *
   * @returns {Promise<Renderer>} A promise to the Renderer instance for chaining.
   */
  async renderResourcesBar(resources: Array<IResource>): Promise<this> {
    const backgroundImage = await loadImage('./img/UI/Banner_Connection_Left.png');
    const hPadding = 30;
    const vPadding = 10;
    const backgroundWidth = 85;
    const backgroundHeight = 100;

    this._context.font = '18px vinque';
    this._context.fillStyle = 'SaddleBrown';

    const maxWidthText = Math.max(
      ...resources.map((resource) => this._context.measureText(String(resource.getQuantity())).width),
    );
    this._context.drawImage(backgroundImage, 0, 20, backgroundWidth + maxWidthText + 20, backgroundHeight);

    await Promise.all(
      resources.map(async (resource, i) => {
        const resourceImage = await loadImage(resource.resourceImage);
        this._context.fillText(String(resource.getQuantity()), 85 + maxWidthText / 5, i * hPadding + 55);
        this._context.drawImage(resourceImage, vPadding + 20 + maxWidthText / 5, i * hPadding + 23, 45, 45);
      }),
    );
    return this;
  }
}
