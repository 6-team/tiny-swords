<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { Observable, filter, map, switchMap, tap } from "rxjs";
  import { Hero } from '../entities/hero'
  import { Resource, ResourcesType } from '../entities/resource/index';
  import { TILE_SIZE, SCALE } from '../common/common.const'
  import { Actions, Heroes, Grid, Renderer, grid64 } from "../core";
  import { Level } from "../core/level/level";
  import { nextLevelMenu, isMainMenu } from "../store/store";
  import MainMenu from "../components/mainMenu/MainMenu.svelte";
  import NextLevelMenu from "../components/nextLevelMenu/NextLevelMenu.svelte";
  import type { IController } from '../controllers';
  import type { IMovable } from "../abilities";
  import type { IPlayer, MovingDirection } from "@shared";
  import type { ICollecting, TMovableDimentions } from "../abilities/abilities.types";
  import { frames$ } from "../tools/observables";

  const actions = new Actions();
  const heroes = new Heroes();

  let interactiveScene: Renderer;

  const level = new Level();
  const { enter, exit, maps, boundaries, layers: LAYERS, gridX, gridY } = level.init();

  const nextLevelArea = [exit];

  const goldPixels = grid64.transformToPixels(5, 4, 1, 1);
  const goldController = {
    movement$: new Observable(),
    attack$: new Observable(),
    setDirection: () => void 0
  } as IController;
  const gold = new Resource({
    type: ResourcesType.GOLD,
    initialX: goldPixels[0],
    initialY: goldPixels[1],
    width: goldPixels[3],
    height: goldPixels[2],
    controllerCreator: () => goldController
  });

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
    const boundariesCoords = boundaries.map((bound): TMovableDimentions => grid64.transformToPixels(bound[0], bound[1], 1, 1));

    action$
      .pipe(
        map((hero) => heroes.initHero(hero, boundariesCoords)),
        switchMap((hero: Hero) => {
          const movable = hero.getAbility('movable');

          return movable.movement$.pipe(switchMap((direction) => actions.updatePlayer({ id: hero.id, direction })));
        })
      ).subscribe();
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

    // Дальше проверка: если перс повернут к врагу и они в соседних клетках, то удар засчитан
    // ...

    // Это надо будет наверное вынести куда то
    function checkCollisions(direction: MovingDirection, movable: IMovable, collecting: ICollecting): void {
      // for (const area of nextLevelArea) {
      //   const hasCollisionWithNextLevelArea = movable.checkCollision(
      //     grid64.transformToPixels(area[0], area[1], 1, 1),
      //   );

      //   if (hasCollisionWithNextLevelArea) {
      //     nextLevelMenu.set(true)
      //     break;
      //   }
      // }

      // const goldMovable = gold.getAbility("movable");
      // const hasCollision = movable.checkCollision(
      //   [goldMovable.coords[0], goldMovable.coords[1], goldMovable.sizes[0], goldMovable.sizes[1]],
      // );

      // if (hasCollision) {
      //   // @TODO: Собрать один раз
      //   collecting.collect(gold);
      // }
    }

    let lastTime = 0;

    frames$.subscribe((timeStamp = 0) => {
      const deltaTime = timeStamp - lastTime;

      interactiveScene.renderMovableLayer(heroes.heroes, deltaTime);
      interactiveScene.renderMovableLayer([gold], 0);

      lastTime = timeStamp
    });
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

