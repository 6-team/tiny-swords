<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { Hero } from '../entities/hero'
  import { TILE_SIZE, SCALE } from '../common/common.const'
  import { Actions, Heroes, Grid, Renderer, TileName, grid64 } from "../core";
  import { Level } from "../core/level/level";
  import { nextLevelMenu, isMainMenu, endCoordsStore, startCoordsStore, mapsStore, boundariesStore, storeToObservable } from "../store";
  import MainMenu from "../components/mainMenu/MainMenu.svelte";
  import NextLevelMenu from "../components/nextLevelMenu/NextLevelMenu.svelte";
  import { LayersRenderType } from "../core/layers/layers.types";

  import type { IMovable } from "../abilities";
  import { Observable, filter, map, tap, switchMap, zip, } from "rxjs";
  import type { IPlayer } from "@shared";

  const resourcesMap = [
    [],
    [],
    [null, null, TileName.RESOURCES_GOLD, TileName.RESOURCES_WOOD, TileName.RESOURCES_MEAL],
  ];

  let interactiveScene: Renderer;
  let staticScene: Renderer;
  let foregroundScene: Renderer;

  const level = new Level();
  const { gridX, gridY, ...levelParts } = level.next();

  const boundaries = storeToObservable(boundariesStore, levelParts.boundaries);
  const startCoords = storeToObservable(startCoordsStore, levelParts.startCoords);
  const endCoords = storeToObservable(endCoordsStore, levelParts.endCoords);
  const maps = storeToObservable(mapsStore, levelParts.maps);

  const levelStores$ = zip(boundaries, startCoords, endCoords, maps)
    .pipe(map(([boundaries, startCoords, endCoords, maps]) => ({ boundaries, startCoords, endCoords, maps })),
);

  async function renderAsync(): Promise<void> {
    for (const { map, type } of $maps) {
      if (type === LayersRenderType.Background) {
        await staticScene.renderStaticLayer(map);
      }
      if (type === LayersRenderType.Foreground) {
        await foregroundScene.renderStaticLayer(map);
      }
    }

    await staticScene.renderStaticLayer(resourcesMap);
  }

  function createNewLevel(): void {
    const { boundaries, endCoords, startCoords, maps } = new Level().next();
      [staticScene, foregroundScene].forEach((scene) => scene.clear())
      boundariesStore.set(boundaries);
      endCoordsStore.set(endCoords);
      startCoordsStore.set(startCoords);
      mapsStore.set(maps);

      renderAsync()

      heroes.heroes$.forEach(heroes => {
        heroes.forEach(hero => {
          const movable = hero.getAbility('movable')
          const [x, y] = grid64.transformToPixels(startCoords[0] - 1, startCoords[1] - 1, 3, 3)

          movable?.setCoords([x, y])
        })
      })
  }

  const actions = new Actions();
  const heroes = new Heroes([$startCoords[0] - 1, $startCoords[1] - 1]);

  let isNextLevelMenu = false;
  let isMainMenuShow = true;

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

     staticScene = new Renderer({
      canvas: document.getElementById('canvas') as HTMLCanvasElement,
      scale: SCALE,
      grid: grid64,
    });

    /**
     * Рендер слоя с объектами переднего плана
     */
    foregroundScene = new Renderer({
      canvas: document.getElementById('canvas_foreground') as HTMLCanvasElement,
      scale: SCALE,
      grid: grid64,
    });

    await renderAsync();

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
    function checkCollisions(movable: IMovable): void {
      for (const area of [$endCoords]) {
        const hasCollisionWithNextLevelArea = movable.checkCollision(
          grid64.transformToPixels(area[0], area[1], 1, 1),
        );

        if (hasCollisionWithNextLevelArea) {
          nextLevelMenu.set(true)
          break;
        }
      }

      for (const bound of $boundaries) {
        const hasCollision = movable.checkCollision(
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

    heroes.heroes$.subscribe((heroes) => {
      for (const hero of heroes) {
        const movable = hero.getAbility('movable');

        movable.coords$.subscribe((_) => {
          checkCollisions(movable);
        });
      }
    });
  
    levelStores$.subscribe(level => {
      console.log('new level', level)
    })
    
  });

  onDestroy(() => {
    actions.closeGame();
  })
</script>

<div>
  <canvas id="canvas" width="1280" height="832" style="position: absolute; left: 50%; top: 120px; transform: translateX(-50%);"></canvas>
  <canvas id="canvas_interactive" width="1280" height="832" style="position: absolute; left: 50%; top: 120px; transform: translateX(-50%);"></canvas>
  <canvas id="canvas_foreground" width="1280" height="832" style="position: absolute; left: 50%; top: 120px; transform: translateX(-50%);"></canvas>
  <canvas id="canvas_hero_bar" width="1280" height="120px" style="position: absolute; left: 50%; top: 0; transform: translateX(-50%);"></canvas>
  {#if isMainMenuShow}
    <MainMenu {initGame} {connectToMultipleGame}/>
  {/if}
  {#if isNextLevelMenu}
    <NextLevelMenu {createNewLevel}/>
  {/if}
</div>

