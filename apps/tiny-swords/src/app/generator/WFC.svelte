<script lang="ts">
  import { onMount } from "svelte";
  import { Renderer } from "../entites/renderer/renderer";
  import { TileName } from "../entites/renderer/renderer.const";
  import { CoordinateSystem } from "../entites/coordinate-system/coordinate-system";
  import { DecoTile } from "../entites/deco/deco";
  import { Movable } from "../entites/movable/movable";

  import { LAYER_MAIN_TEMPLATE_BRIDGE_CENTER, LAYER_MAIN_TEMPLATE_WATER_BORDER_1, LAYER_MAIN_TEMPLATE_LEFT_HOUSE, LAYER_MAIN_TEMPLATE_TREE, LAYER_MAIN_TEMPLATE_RIGHT_HOUSE } from "../entites/layers/templates/main";
  import { LAYER_MAIN_RULES, LAYER_MAIN_WEIGHT } from "../entites/layers/rules/ground";
  import { LAYER_ADDITIONAL_EMPTY_CONDITIONS, LAYER_ADDITIONAL_HOUSE_CONDITIONS, LAYER_ADDITIONAL_SIGN_CONDITIONS, LAYER_ADDITIONAL_TREE_BOTTOM_CONDITIONS, LAYER_ADDITIONAL_WATER_CONDITIONS } from "../entites/layers/templates/additional";
  import { LAYER_DECO_GROUND_CONDITIONS, LAYER_DECO_WATER_CONDITIONS } from "../entites/layers/templates/deco";
  import { LAYER_FOREGROUND_HOUSE_CONDITIONS, LAYER_FOREGROUND_TREE_TOP_CONDITIONS } from "../entites/layers/templates/foreground";
  import { LayersGrid } from "../entites/layers/grid/grid";

  /**
   * Создаем основную структуру карты со слоями
   */
  const SIZE_X = 20;
  const SIZE_Y = 13;
  const LAYERS = {
    WATER: 'water',
    SHADOW: 'shadow',
    MAIN: 'main',
    DECO: 'decorations',
    ADD: 'additional',
    SIGN: 'sign',
    FOREG: 'foreground'
  };
  const LAYERS_LIST = [
    LAYERS.WATER,
    LAYERS.SHADOW,
    LAYERS.MAIN,
    LAYERS.DECO,
    LAYERS.ADD,
    LAYERS.SIGN,
    LAYERS.FOREG,
  ];

  const layersGrid = new LayersGrid(SIZE_X, SIZE_Y, LAYERS_LIST)
    .fill([LAYER_ADDITIONAL_WATER_CONDITIONS])            // заполняем ячейки слоя water тайлами воды
    .switch(LAYERS.MAIN)                                       // переключаемся на слой main
    .fill([
      LAYER_MAIN_TEMPLATE_WATER_BORDER_1,                 // заполняем ячейки слоя main тайлами воды по границе карты
      LAYER_MAIN_TEMPLATE_LEFT_HOUSE,                     // ставим поверхность для левого дома
      LAYER_MAIN_TEMPLATE_RIGHT_HOUSE,                    // ставим поверхность для правого дома
      LAYER_MAIN_TEMPLATE_BRIDGE_CENTER,                  // ставим мост в середину
    ])
    .wfc(LAYER_MAIN_RULES, LAYER_MAIN_WEIGHT)             // заполняем остальные ячейки алгоритмом wfc
    .switch(LAYERS.SHADOW)                                     // переключаемся на слой shadow
    .fill([LAYER_ADDITIONAL_EMPTY_CONDITIONS], LAYERS.MAIN)    // заполняем ячейки под мостами тайлами тени и земли
    .switch(LAYERS.DECO)                                       // переключаемся на слой deco
    .fill([
      LAYER_DECO_WATER_CONDITIONS,                        // заполняем ячейки тайлами декораций
      LAYER_DECO_GROUND_CONDITIONS,                       // заполняем ячейки тайлами поверхности
    ], LAYERS.MAIN)
    .switch(LAYERS.ADD)                                 // переключаемся на слой additional
    .fill([
      LAYER_ADDITIONAL_HOUSE_CONDITIONS,                  // заполняем ячейки тайлами нижней части дома
      LAYER_ADDITIONAL_TREE_BOTTOM_CONDITIONS,            // заполняем ячейки тайлами нижней части дерева
    ])
    .switch(LAYERS.SIGN)                                       // переключаемся на слой sign
    .fill([LAYER_ADDITIONAL_SIGN_CONDITIONS])             // заполняем ячейки тайлами знаков
    .switch(LAYERS.FOREG)                                 // переключаемся на слой foreground
    .fill([
      LAYER_FOREGROUND_HOUSE_CONDITIONS,                  // заполняем ячейки тайлами верхней части дома
      LAYER_FOREGROUND_TREE_TOP_CONDITIONS,               // заполняем ячейки тайлами верхней части дерева
    ], LAYERS.ADD);

    const {
      options: {
        enter,                                            // получаем координаты старта игрока
        exit,                                             // получаем координаты выхода
      },                            
      maps,                                               // карты для рендера
      boundaries,                                         // границы
    } = layersGrid;

  onMount(async () => {
    const TILE_SIZE = 64;
    const SCALE = 0.75;

    /**
     * Рендер карты по слоям
     */
    const system = new CoordinateSystem({ tileSize: TILE_SIZE, maxX: SIZE_X, maxY: SIZE_Y });
    const staticScene = new Renderer({
      canvas: document.getElementById('canvas') as HTMLCanvasElement,
      scale: SCALE,
      coordinateSystem: system,
    });

    await staticScene.renderStaticLayer(maps[LAYERS.WATER]);
    await staticScene.renderStaticLayer(maps[LAYERS.SHADOW]);
    await staticScene.renderStaticLayer(maps[LAYERS.MAIN]);
    await staticScene.renderStaticLayer(maps[LAYERS.DECO]);
    await staticScene.renderStaticLayer(maps[LAYERS.ADD]);
    await staticScene.renderStaticLayer(maps[LAYERS.SIGN]);

    /**
     * Рендер слоя с объектами переднего плана
     */
    const systemForeground = new CoordinateSystem({ tileSize: TILE_SIZE, maxX: SIZE_X, maxY: SIZE_Y });
    const foregroundScene = new Renderer({
      canvas: document.getElementById('canvas_foreground') as HTMLCanvasElement,
      scale: SCALE,
      coordinateSystem: systemForeground,
    });

    await foregroundScene.renderStaticLayer(maps[LAYERS.FOREG]);

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
      .addAbility("movable", new Movable({ initialX: enter[0], initialY: enter[1], initialHeight: 1 }))
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

      console.log(boundaries);

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
