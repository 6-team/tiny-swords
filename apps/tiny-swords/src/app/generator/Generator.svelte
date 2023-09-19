<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { Hero } from '../entities/hero'
  import { TILE_SIZE, SCALE } from '../common/common.const'
  import { Actions, Heroes, Grid, Renderer, TileName } from "../core";
  import { Level } from "../core/level/level";
  import { nextLevelMenu, isMainMenu } from "../store/store";
  import MainMenu from "../components/mainMenu/MainMenu.svelte";
  import NextLevelMenu from "../components/nextLevelMenu/NextLevelMenu.svelte";
  import type { IMovable } from "../abilities";
  import { Observable, filter, map, switchMap, tap } from "rxjs";
  import type { IPlayer } from "@shared";

  const actions = new Actions();
  const heroes = new Heroes();

  let interactiveScene: Renderer;

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

  const initGame = (): void => {
    const action$ = actions.initGame().pipe(filter(Boolean), tap(() => console.log('The game was created')));

    handleHeroMovement(action$);
  }

  const connectToMultipleGame = (): void => {
    const action$ = actions.connectToMultipleGame().pipe(tap(() => console.log('You connected to multiple game')));

    handleHeroMovement(action$);
  }

  function handleHeroMovement(action$: Observable<IPlayer>): void {
    action$.pipe(map(heroes.initHero.bind(heroes)), switchMap((hero: Hero) => {
      const movable = hero.getAbility('movable');

      return movable.movement$.pipe(switchMap((direction) => actions.updatePlayer({ id: hero.id, direction })));
    })).subscribe();
  }

  function handleUpdatedPlayers(): void {
    actions.updatePlayerListener().pipe(tap((player) => console.log('Update player', player))).subscribe((player) => {
      const existingPlayer = heroes.getHero(player);

      if (existingPlayer) {
        const movable = existingPlayer.getAbility('movable')

        movable.setDirection(player.direction!);

        return;
      }

      heroes.initConnectedHero(player);
    });
  }

  onMount(async () => {
    handleUpdatedPlayers();
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
    interactiveScene = new Renderer({
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

      interactiveScene.renderMovableLayer(heroes.heroes, deltaTime);

      lastTime = timeStamp
    }

    animate();
  });

  onDestroy(() => {
    actions.closeGame();
  })
</script>

<div>
  <canvas id="canvas" width="1280" height="832" style="position: absolute; left: 50%; top: 0; transform: translateX(-50%);"></canvas>
  <canvas id="canvas_interactive" width="1280" height="832" style="position: absolute; left: 50%; top: 0; transform: translateX(-50%);"></canvas>
  <canvas id="canvas_foreground" width="1280" height="832" style="position: absolute; left: 50%; top: 0; transform: translateX(-50%);"></canvas>
  <canvas id="canvas_hero_bar" width="1280" height="120px" style="position: absolute; left: 50%; top: 0; transform: translateX(-50%);"></canvas>
  {#if isMainMenuShow}
  <!-- Передать экшены для кнопок -->
    <MainMenu {initGame} {connectToMultipleGame}/>
  {/if}
  {#if isNextLevelMenu}
    <NextLevelMenu/>
  {/if}
</div>

