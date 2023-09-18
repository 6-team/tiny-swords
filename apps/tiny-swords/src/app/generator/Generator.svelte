<script lang="ts">
  import { onMount } from "svelte";
  import { Renderer } from '../core/renderer/renderer';
  import { Grid } from '../core/grid';
  import { Hero } from '../entities/hero'
  import { KeyboardController } from "../controllers/keyboard";
  import { ServerController } from '../controllers/server';
  import { TILE_SIZE, SCALE } from '../common/common.const'
  import type { IMovable } from "../abilities";
  import { Level } from "../core/level/level";
  import { nextLevelMenu, isMainMenu } from "../store/store";
  import MainMenu from "../components/mainMenu/MainMenu.svelte";
  import NextLevelMenu from "../components/nextLevelMenu/NextLevelMenu.svelte";
  import { TileName } from "../core/renderer";
  

  const level = new Level();
  const { enter, exit, maps, boundaries, layers: LAYERS, gridX, gridY } = level.init();

  const nextLevelArea = [exit];

  const resourcesMap = [
    [],
    [],
    [null, null, TileName.RESOURCES_GOLD, TileName.RESOURCES_WOOD, TileName.RESOURCES_MEAL],
  ];

  let isNextLevelMenu = false;
  let isMainMenuShow = true
  nextLevelMenu.subscribe( value => isNextLevelMenu = value)
  isMainMenu.subscribe( value => isMainMenuShow = value)

  onMount(async () => {
    /**
     * Рендер статичной карты
     */
    const grid64 = new Grid({ tileSize: TILE_SIZE, maxX: gridX, maxY: gridY });

    const staticScene = new Renderer({
      canvas: document.getElementById('canvas') as HTMLCanvasElement,
      scale: SCALE,
      grid: grid64,
    });

    await staticScene.renderStaticLayer(maps[LAYERS.WATER]);
    await staticScene.renderStaticLayer(maps[LAYERS.SHADOW]);
    await staticScene.renderStaticLayer(maps[LAYERS.MAIN]);
    await staticScene.renderStaticLayer(maps[LAYERS.DECO]);
    await staticScene.renderStaticLayer(maps[LAYERS.ADD]);
    await staticScene.renderStaticLayer(maps[LAYERS.SIGN]);
    await staticScene.renderStaticLayer(maps[LAYERS.BOUND]);

    await staticScene.renderStaticLayer(resourcesMap);

    /**
     * Рендер слоя с объектами переднего плана
     */
    const foregroundScene = new Renderer({
      canvas: document.getElementById('canvas_foreground') as HTMLCanvasElement,
      scale: SCALE,
      grid: grid64,
    });

    await foregroundScene.renderStaticLayer(maps[LAYERS.FOREG]);

    /**
     * Рендер интерактивных элементов, которые будут в движении
     */
    const interactiveScene = new Renderer({
      canvas: document.getElementById('canvas_interactive') as HTMLCanvasElement,
      scale: SCALE,
      grid: grid64,
    });

    const heroBarsScene = new Renderer({
      canvas: document.getElementById('canvas_hero_bar') as HTMLCanvasElement,
      scale: SCALE,
      grid: grid64,
    });

    await heroBarsScene.renderResourcesBar([
              { type: 'gold', image: 'img/Resources/G_Idle.png', count: 9999 },
              { type: 'wood', image: 'img/Resources/W_Idle.png', count: 0 },
            ]);

    await heroBarsScene.renderHealthBar({
      totalLives: 3,
      availableLives: 1,
      blockedLives: 1,
    });

    const [initialX, initialY, height, width] = grid64.transformToPixels(enter[0], enter[1], 3, 3);
    const keyboardController = new KeyboardController();
    // const serverController = new ServerController(); // Прокинь serverController, чтобы увидеть, как сервер будет управлять персонажем
    const hero = new Hero({ controller: keyboardController, initialX, initialY, height, width });
    const movable = hero.getAbility('movable');

    // Переменные для определения положения персонажа относительно середины поля
    // Предполагается, что значения поля будут захардкожены
    const middleX = (Math.max(...boundaries.map(([x]) => x)) * TILE_SIZE * SCALE) / 2
    const middleY = (Math.max(...boundaries.map(([_, y]) => y)) * TILE_SIZE * SCALE) / 2
    // Дальше проверка: если перс повернут к врагу и они в соседних клетках, то удар засчитан
    // ...

    // Это надо будет наверное вынести куда то
    function checkCollisions(coords: [number, number], movable: IMovable): void {
      for (const area of nextLevelArea) {
        const hasCollisionWithNextLevelArea = Grid.checkCollision(
          [coords[0] - TILE_SIZE * SCALE, coords[1], movable.sizes[0], movable.sizes[1]],
          grid64.transformToPixels(area[0], area[1], 1, 1),
        );

        if (hasCollisionWithNextLevelArea) {
          // alert('You won!');
          nextLevelMenu.set(true)
          break;
        }
      }

      for (const bound of boundaries) {
        const horizontalOffset = coords[0] > middleX ? -TILE_SIZE * SCALE : TILE_SIZE * SCALE;
        const verticalOffset = coords[1] > middleY ? -TILE_SIZE * SCALE : TILE_SIZE * SCALE;
        const hasCollision = Grid.checkCollision(
          [coords[0] + horizontalOffset, coords[1] + verticalOffset, movable.sizes[0], movable.sizes[1]],
          grid64.transformToPixels(bound[0], bound[1], 1, 1),
        );

        if (hasCollision) {
          movable.stopMovement();

          break;
        }
      }
    }

    let lastTime = 0;

    const animate = (timeStamp = 0) => {
      requestAnimationFrame(animate);
      const deltaTime = timeStamp - lastTime;

      interactiveScene.renderMovableLayer([hero], deltaTime);

      lastTime = timeStamp
    }

    animate();

    movable.movement$.subscribe((direction) => {
      // console.log(direction);

      // Отправить команду на сервер. Дальше сервер передаёт её другим игрокам.
      // У этих игроков твой персонаж начинает управляться через ServerController.
    })

    movable.coords$.subscribe((coords) => {
      checkCollisions(coords, movable);
    })
  });
</script>

<div>
  <canvas id="canvas" width="1280" height="832" style="position: absolute; left: 50%; top: 0; transform: translateX(-50%);"></canvas>
  <canvas id="canvas_interactive" width="1280" height="832" style="position: absolute; left: 50%; top: 0; transform: translateX(-50%);"></canvas>
  <canvas id="canvas_foreground" width="1280" height="832" style="position: absolute; left: 50%; top: 0; transform: translateX(-50%);"></canvas>
  <canvas id="canvas_hero_bar" width="1280" height="120px" style="position: absolute; left: 50%; top: 0; transform: translateX(-50%);"></canvas>
  {#if isMainMenuShow}
  <!-- Передать экшены для кнопок -->
    <MainMenu/>
  {/if}
  {#if isNextLevelMenu}
    <NextLevelMenu/>
  {/if}
</div>
