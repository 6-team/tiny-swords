<script lang="ts">
  import { onMount } from "svelte";
  import { Renderer } from "../entites/renderer/renderer";
  import { CoordinateSystem } from "../entites/coordinate-system/coordinate-system";
  import { DecoTile } from "../entites/deco/deco";
  import { Movable } from "../entites/movable/movable";
  import { Level } from "../entites/level/level";

  let level: any;

  const init = async () => {
    level = new Level ();
    const { enter, exit, maps, boundaries, layers: LAYERS, gridX, gridY } = level.init();

    const TILE_SIZE = 64;
    const SCALE = 0.75;

    /**
     * Рендер карты по слоям
     */
    const system = new CoordinateSystem({ tileSize: TILE_SIZE, maxX: gridX, maxY: gridY });
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
    await staticScene.renderStaticLayer(maps[LAYERS.BOUND]);

    /**
     * Рендер слоя с объектами переднего плана
     */
    const systemForeground = new CoordinateSystem({ tileSize: TILE_SIZE, maxX: gridX, maxY: gridY });
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
  }

  onMount(async () => {
    init();
  });
</script>

<div style='position: relative; height: 720px'>
  <canvas id="canvas" width="960" height="720" style="position: absolute; left: 0; top: 0;"></canvas>
  <canvas id="canvas_interactive" width="960" height="720" style="position: absolute; left: 0; top: 0;"></canvas>
  <canvas id="canvas_foreground" width="960" height="720" style="position: absolute; left: 0; top: 0;"></canvas>
</div>

<div style='position: relative' on:click={() => init()}>Next</div>
