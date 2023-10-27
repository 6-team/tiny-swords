import { Renderer } from './renderer';
import { from } from 'rxjs';
import { ITile } from "@common/common.types";
import { mapTileNameToClass, TileName } from './renderer.const';

jest.mock('rxjs', () => ({
  ...jest.requireActual('rxjs'),
  from: jest.fn(),
  of: jest.fn(),
}));

describe('Renderer', () => {
  let renderer: Renderer;
  let mockCanvas: any;
  let mockContext: any;
  let mockGrid: any;
  let mockTile: any;
  let mockMovableCharacter: any;
  let mockLayer: any[] = [];

  beforeEach(() => {
    mockCanvas = { width: 500, height: 500 };
    mockContext = {
      getContext: jest.fn(),
      clearRect: jest.fn(),
      drawImage: jest.fn(),
    };
    mockGrid = {
      tileSize: 32,
      width: mockCanvas.width,
      height: mockCanvas.height,
      transformToPixels: jest.fn((x, y, w, h) => [x * 32, y * 32, w * 32, h * 32]),
    };
    mockTile = {
      getData: jest.fn(),
    };
    mockMovableCharacter = {
      getAbility: jest.fn(),
    };

    mockCanvas.getContext = jest.fn(() => mockContext);
    (from as jest.Mock).mockReturnValue({
      subscribe: jest.fn((fn) => fn(1000)),
      unsubscribe: jest.fn(),
    });

    mockLayer = [
      [
        { id: 1, image: new Image() },
        { id: 2, image: new Image() },
      ],
      [
        { id: 3, image: new Image() },
        { id: 4, image: new Image() },
      ],
    ];

    // reset the mockContext before each test
    mockContext.drawImage.mockReset();

    renderer = new Renderer({ canvas: mockCanvas, grid: mockGrid, scale: 1 });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create Renderer', () => {
    expect(renderer).toBeDefined();
  });

  it('should clear the canvas', () => {
    renderer.clear();
    expect(mockContext.clearRect).toHaveBeenCalledWith(0, 0, mockCanvas.width, mockCanvas.height);
  });

  it('render method should draw image correctly', async () => {
    const mockTile = {
      getData: jest.fn().mockResolvedValue({
        image: new Image(),
        coords: [10, 20],
        size: 30,
      }),
      switchAnimationFrame: jest.fn(),
    } as unknown as ITile;

    const elementPxCoords: [number, number, number, number] = [0, 0, 100, 100];

    await renderer.render(elementPxCoords, mockTile);

    expect(mockContext.drawImage).toHaveBeenCalledWith(
      (await mockTile.getData()).image,
      10,
      20,
      30,
      30,
      0,
      0,
      100,
      100,
    );
  });

  it('renderWithAnimation method should draw an animated image correctly', async () => {
    const mockTile = {
      getData: jest.fn().mockResolvedValue({
        image: new Image(),
        coords: [10, 20],
        size: 30,
        scale: 1,
      }),
      switchAnimationFrame: jest.fn(),
    } as any;

    const elementPxCoords: [number, number, number, number] = [0, 0, 100, 100];
    const deltaTime = 200;

    await renderer.renderWithAnimation(elementPxCoords, mockTile, deltaTime);

    expect(mockContext.drawImage).toHaveBeenCalledWith(
      (await mockTile.getData()).image,
      10,
      20,
      30,
      30,
      0,
      0,
      100,
      100,
    );

    expect(mockTile.switchAnimationFrame).toHaveBeenCalledWith(deltaTime);
  });

  it('renderStaticLayer calls render for each tile in the map', async () => {
    let renderCallCount = 0;
    const tile: ITile = {
      getData: () => {
        renderCallCount++;
        return Promise.resolve({ image: new Image(), coords: [0, 0], size: 16, scale: 1 });
      },
      setAnimation: jest.fn(),
      switchAnimationFrame: jest.fn(),
      setAnimationOnce: jest.fn(),
    };

    const originalMapping = mapTileNameToClass;
    (mapTileNameToClass as any) = {
      [TileName.WATER_MIDDLE_MIDDLE]: {
        constructor: function () {
          return tile;
        },
        args: [],
      },
      [TileName.DECO_WEED_M]: {
        constructor: function () {
          return tile;
        },
        args: [],
      },
    };

    const map: Array<Array<TileName | null>> = [
      [TileName.WATER_MIDDLE_MIDDLE, null],
      [null, TileName.DECO_WEED_M],
    ];

    await renderer.renderStaticLayer(map);

    expect(renderCallCount).toEqual(2);

    (mapTileNameToClass as any) = originalMapping;
  });
});
