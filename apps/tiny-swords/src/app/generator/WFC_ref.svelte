<script lang="ts">
  import { onMount } from "svelte";
  import { Renderer } from "../entites/renderer/renderer";
  import { TileName } from "../entites/renderer/renderer.const";
  import { CoordinateSystem } from "../entites/coordinate-system/coordinate-system";
  import { DecoTile } from "../entites/deco/deco";
  import { Movable } from "../entites/movable/movable";

  import { Grid } from "../entites/grid/grid";
  import {
    LEVEL_ADD_TILE_BRIDGE,
    LEVEL_ADD_TILE_TREE,
    LEVEL_DECO_CONDITION,
    LEVEL_SURFACE_TILE_RULES,
    LEVEL_SURFACE_TILE_WEIGHT,
    LEVEL_TEMPLATE_BRIDGE_CENTER,
    LEVEL_TEMPLATE_GROUND_PLAYER,
    LEVEL_TEMPLATE_WATER_BORDER_2,
    LEVEL_TEMPLATE_WATER_BORDER_3
  } from "../entites/levels-data/levels-data.const";

  const waterMap = [
    new Array(20).fill(TileName.WATER_MIDDLE_MIDDLE),
    new Array(20).fill(TileName.WATER_MIDDLE_MIDDLE),
    new Array(20).fill(TileName.WATER_MIDDLE_MIDDLE),
    new Array(20).fill(TileName.WATER_MIDDLE_MIDDLE),
    new Array(20).fill(TileName.WATER_MIDDLE_MIDDLE),
    new Array(20).fill(TileName.WATER_MIDDLE_MIDDLE),
    new Array(20).fill(TileName.WATER_MIDDLE_MIDDLE),
    new Array(20).fill(TileName.WATER_MIDDLE_MIDDLE),
    new Array(20).fill(TileName.WATER_MIDDLE_MIDDLE),
    new Array(20).fill(TileName.WATER_MIDDLE_MIDDLE),
    new Array(20).fill(TileName.WATER_MIDDLE_MIDDLE),
    new Array(20).fill(TileName.WATER_MIDDLE_MIDDLE),
    new Array(20).fill(TileName.WATER_MIDDLE_MIDDLE),
  ];

  // const bridgeMap = wfc.map(bridgeGrid.array, 20, 13);

  // Создаем сетку для генерации поверхности
  const grid = new Grid(20, 13);

  // ставим в ячейки тайлы по шаблону или все возможные
  grid.init([
    LEVEL_TEMPLATE_BRIDGE_CENTER,
    LEVEL_TEMPLATE_WATER_BORDER_2,
    LEVEL_TEMPLATE_GROUND_PLAYER,
  ], LEVEL_SURFACE_TILE_WEIGHT);
  grid.wfc(LEVEL_SURFACE_TILE_RULES); 

  // создаем карту для рендера поверхности
  const map = grid.map();

  // Создаем сетку для доп тайлов, например мостов
  const bridgeGrid = new Grid(20, 13);
  bridgeGrid.mask(grid, LEVEL_ADD_TILE_BRIDGE);

  const bridgeMap = bridgeGrid.map();

  // Генерируем декорации
  const decorationsGrid = new Grid(20, 13);
  decorationsGrid.mask(grid, LEVEL_DECO_CONDITION);

  const decorationsMap = decorationsGrid.map();

  // рисуем деревья
  const treeGrid = new Grid(20, 13);
  treeGrid.mask(decorationsGrid, LEVEL_ADD_TILE_TREE);

  const treeMap = treeGrid.map();

  // генерируем границы
  const boundaries: number[][] = [];

  grid.array.forEach(({ coords, options }) => {
    if (options[0] === TileName.WATER_MIDDLE_MIDDLE) {
      boundaries.push([coords[0], coords[1]]);
    }
  });

  onMount(async () => {
    const TILE_SIZE = 64;
    const SCALE = 0.75;

    /**
     * Рендер статичной карты
     */
    const system = new CoordinateSystem({ tileSize: TILE_SIZE, maxX: 20, maxY: 13 });
    const staticScene = new Renderer({
      canvas: document.getElementById('canvas') as HTMLCanvasElement,
      scale: SCALE,
      coordinateSystem: system,
    });

    await staticScene.renderStaticLayer(waterMap);
    await staticScene.renderStaticLayer(bridgeMap);
    await staticScene.renderStaticLayer(map);
    await staticScene.renderStaticLayer(decorationsMap);
    await staticScene.renderStaticLayer(treeMap);

    /**
     * Рендер интерактивных элементов, которые будут в движении
     */
    const interactiveSystem = new CoordinateSystem({ tileSize: TILE_SIZE / 2, maxX: 40, maxY: 40 });
    const interactiveScene = new Renderer({
      canvas: document.getElementById('canvas_interactive') as HTMLCanvasElement,
      scale: SCALE,
      coordinateSystem: system,
    });

    const mushroom = new DecoTile() // Для примера будем управлять грибом
      .addAbility("movable", new Movable({ initialX: 2, initialY: 4, initialHeight: 1 }))
    const movableAbility = mushroom.getAbility<Movable>("movable");

    interactiveScene.addInteractiveElement(mushroom);
    interactiveScene.renderInteractiveLayer();

    document.addEventListener('keydown', (event) => {
      switch (event.key) {
        case "ArrowLeft":
        case "a":
          movableAbility.setCoords(([prevX, prevY]) => [prevX - 1, prevY]);

          break;
        case "ArrowRight":
        case "d":
          movableAbility.setCoords(([prevX, prevY]) => [prevX + 1, prevY]);

          break;
        case "ArrowUp":
        case "w":
          movableAbility.setCoords(([prevX, prevY]) => [prevX, prevY - 1]);

          break;
        case "ArrowDown":
        case "s":
          movableAbility.setCoords(([prevX, prevY]) => [prevX, prevY + 1]);

          break;
        default:
          return;
      }

      for (const bound of boundaries) {
        const hasCollision = CoordinateSystem.checkCollision(
          system.transformToPixels(movableAbility.coords[0], movableAbility.coords[1], movableAbility.sizes[0], movableAbility.sizes[1]),
          system.transformToPixels(bound[0], bound[1], 1, 1),
        );

        if (hasCollision) {
          movableAbility.back();

          break;
        }
      }

      requestAnimationFrame(() => interactiveScene.renderInteractiveLayer());
    });
  });
</script>

<div style='position: relative'>
  <canvas id="canvas" width="960" height="720" style="position: absolute; left: 0; top: 0;"></canvas>
  <canvas id="canvas_interactive" width="960" height="720" style="position: absolute; left: 0; top: 0;"></canvas>
</div>
