<script lang="ts">
  import { onMount } from "svelte";
  import { Renderer } from "../entites/renderer/renderer";
  import { TileName } from "../entites/renderer/renderer.const";
  import { CoordinateSystem } from "../entites/coordinate-system/coordinate-system";
  import { DecoTile } from "../entites/deco/deco";
  import { Movable } from "../entites/movable/movable";

  import { Grid } from "../entites/grid/grid";
  import { LAYER_MAIN_TEMPLATE_BRIDGE_CENTER, LAYER_MAIN_TEMPLATE_WATER_BORDER_1, LAYER_MAIN_TEMPLATE_HOUSE, LAYER_MAIN_TEMPLATE_TREE } from "../entites/layers/main/templates.const";
  import { LAYER_MAIN_RULES, LAYER_MAIN_WEIGHT } from "../entites/layers/main/rules.const";
  import { LAYER_ADDITIONAL_EMPTY_CONDITIONS, LAYER_ADDITIONAL_TREE_BOTTOM_CONDITIONS, LAYER_ADDITIONAL_WATER_CONDITIONS } from "../entites/layers/additional/conditions.const";
  import { LAYER_DECO_GROUND_CONDITIONS, LAYER_DECO_WATER_CONDITIONS } from "../entites/layers/deco/conditions.const";
  import { LAYER_FOREGROUND_HOUSE_CONDITIONS, LAYER_FOREGROUND_TREE_TOP_CONDITIONS } from "../entites/layers/foreground/conditions.const";
/*
  const { layers, boundaries } = new LayersGrid(20, 13, 6)
    .fill(0, WATER),
    .init(2, TEMPLATES)
    .wfc(2, rules)
    .copy(2, 1)
    .filter(1)
    .wfc(1, rules)


*/

  /**
   * Создаем основной слой карты
   */
  const grid = new Grid(20, 13);

  grid.fill([
    LAYER_MAIN_TEMPLATE_BRIDGE_CENTER,
    LAYER_MAIN_TEMPLATE_WATER_BORDER_1,
    LAYER_MAIN_TEMPLATE_TREE,
    LAYER_MAIN_TEMPLATE_HOUSE,
  ]);

  grid.init(LAYER_MAIN_WEIGHT);
  grid.wfc(LAYER_MAIN_RULES);

  const mainMap = grid.map();

  /**
   * На основе основного слоя создаем дополнительный слой
   * Например чтобы добавить тень под мостами или траву под елками
   * Используем точные условия
   */
   const waterGrid = new Grid(20, 13);
   waterGrid.fill([LAYER_ADDITIONAL_WATER_CONDITIONS], grid as any);

  const waterMap = waterGrid.map();


  /**
   * На основе основного слоя создаем дополнительный слой
   * Например чтобы добавить тень под мостами или траву под елками
   * Используем точные условия
   */
  const additionalGrid = new Grid(20, 13);
  additionalGrid.fill([LAYER_ADDITIONAL_EMPTY_CONDITIONS], grid as any);

  const additionalMap = additionalGrid.map();

  /**
   * На основе основного слоя создаем слой c декорациями
   * Используем условия с рандомом
   */
  const decorationsGrid = new Grid(20, 13);
  decorationsGrid.fill([LAYER_DECO_WATER_CONDITIONS, LAYER_DECO_GROUND_CONDITIONS], grid as any);

  const decorationsMap = decorationsGrid.map();

  /**
   * На основе основного слоя создаем слой с нижней частью деревьев
   * Используем точные условия
   */
  const treeBottomGrid = new Grid(20, 13);
  treeBottomGrid.fill([LAYER_ADDITIONAL_TREE_BOTTOM_CONDITIONS], grid as any);

  const treeBottomMap = treeBottomGrid.map();

  /**
   * На основе основного слоя создаем слой с верхней частью деревьев
   * Используем точные условия
   */
  const foregroundGrid = new Grid(20, 13);
  foregroundGrid.fill([LAYER_FOREGROUND_TREE_TOP_CONDITIONS, LAYER_FOREGROUND_HOUSE_CONDITIONS], grid as any);

  const foregroundMap = foregroundGrid.map();

  /**
   * Создаем границы
   */
  const boundaries: number[][] = [];

  grid.array.forEach(({ coords, options }) => {
    if (options[0] === TileName.WATER_MIDDLE_MIDDLE || options[0] === TileName.TREE_STRUMP) {
      boundaries.push([coords[0], coords[1]]);
    }
  });

  onMount(async () => {
    const TILE_SIZE = 64;
    const SCALE = 0.75;

    /**
     * Рендер карты по слоям
     */
    const system = new CoordinateSystem({ tileSize: TILE_SIZE, maxX: 20, maxY: 13 });
    const staticScene = new Renderer({
      canvas: document.getElementById('canvas') as HTMLCanvasElement,
      scale: SCALE,
      coordinateSystem: system,
    });

    await staticScene.renderStaticLayer(waterMap);
    await staticScene.renderStaticLayer(additionalMap);
    await staticScene.renderStaticLayer(mainMap);
    await staticScene.renderStaticLayer(decorationsMap);
    await staticScene.renderStaticLayer(treeBottomMap);

    /**
     * Рендер слоя с объектами переднего плана
     */
    const systemForeground = new CoordinateSystem({ tileSize: TILE_SIZE, maxX: 20, maxY: 13 });
    const foregroundScene = new Renderer({
      canvas: document.getElementById('canvas_foreground') as HTMLCanvasElement,
      scale: SCALE,
      coordinateSystem: systemForeground,
    });

    await foregroundScene.renderStaticLayer(foregroundMap);

    /**
     * Рендер интерактивных элементов, которые будут в движении
     */
    // const interactiveSystem = new CoordinateSystem({ tileSize: TILE_SIZE / 2, maxX: 40, maxY: 40 });
    const interactiveScene = new Renderer({
      canvas: document.getElementById('canvas_interactive') as HTMLCanvasElement,
      scale: SCALE,
      coordinateSystem: system,
    });

    const mushroom = new DecoTile() // Для примера будем управлять грибом
      .addAbility("movable", new Movable({ initialX: 3, initialY: 6, initialHeight: 1 }))
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
  <canvas id="canvas_foreground" width="960" height="720" style="position: absolute; left: 0; top: 0;"></canvas>
</div>
