<script lang="ts">
  import { onMount } from "svelte";
  import { Renderer } from '../core/renderer/renderer';
  import { CoordinateSystem } from '../core/coordinate-system';
  import { Movable } from '../abilities/movable';
  import { Attacking } from '../abilities/attacking';
  import { Character } from '../entities/character'
  import { KeyboardController } from "../controllers/keyboard";
  import { TILE_SIZE, SCALE } from '../common/common.const'
  import { Level } from "../core/level/level";

  const level = new Level();
  const { enter, exit, maps, boundaries, layers: LAYERS, gridX, gridY } = level.init();

  onMount(async () => {
    /**
     * Рендер статичной карты
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
    const interactiveScene = new Renderer({
      canvas: document.getElementById('canvas_interactive') as HTMLCanvasElement,
      scale: SCALE,
      coordinateSystem: system,
    });

    const [initialX, initialY, initialHeight] = system.transformToPixels(enter[0], enter[1], 3, 3);

    const character = new Character({
      abilities: {
        movable: new Movable({ initialX, initialY, initialHeight}),
        attacking: new Attacking()
      }
    });

    const movable = character.getAbility('movable')
    const keyboardController = new KeyboardController(character, system);


    // Переменные для определения положения персонажа относительно середины поля
    // Предполагается, что значения поля будут захардкожены
    const middleX = (Math.max(...boundaries.map(([x]) => x)) * TILE_SIZE * SCALE) / 2
    const middleY = (Math.max(...boundaries.map(([_, y]) => y)) * TILE_SIZE * SCALE) / 2
    // Дальше проверка: если перс повернут к врагу и они в соседних клетках, то удар засчитан
    // ...

    // Это надо будет наверное вынести куда то
    function checkCollisions(): void {
      for (const area of [exit]) {
        const hasCollisionWithNextLevelArea = CoordinateSystem.checkCollision(
          [movable.coords[0] - TILE_SIZE * SCALE, movable.coords[1], movable.sizes[0], movable.sizes[1]],
          system.transformToPixels(area[0], area[1], 1, 1),
        );

        if (hasCollisionWithNextLevelArea) {
          alert('You won!');
          break;
        }
      }

      for (const bound of boundaries) {
        const horizontalOffset = movable.coords[0] > middleX ? -TILE_SIZE * SCALE : TILE_SIZE * SCALE;
        const verticalOffset = movable.coords[1] > middleY ? -TILE_SIZE * SCALE : TILE_SIZE * SCALE;
        const hasCollision = CoordinateSystem.checkCollision(
          [movable.coords[0] + horizontalOffset, movable.coords[1] + verticalOffset, movable.sizes[0], movable.sizes[1]],
          system.transformToPixels(bound[0], bound[1], 1, 1),
        );

        if (hasCollision) {
          movable.back();

          break;
        }
      }
    }

    let lastTime = 0;

    const animate = (timeStamp = 0) => {
      requestAnimationFrame(animate);
      const deltaTime = timeStamp - lastTime;
      keyboardController.init()

      interactiveScene.renderMovableLayer([character], deltaTime);

      if (keyboardController.isCharacterMoving) {
        checkCollisions();
      }


      lastTime = timeStamp
    }


    animate()
  });
</script>

<div>
  <canvas id="canvas" width="1300" height="900" style="position: absolute; left: 0; top: 0;"></canvas>
  <canvas id="canvas_interactive" width="1280" height="832" style="position: absolute; left: 0; top: 0;"></canvas>
  <canvas id="canvas_foreground" width="1280" height="832" style="position: absolute; left: 0; top: 0;"></canvas>
</div>
