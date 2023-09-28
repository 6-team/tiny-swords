<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { BehaviorSubject, Observable, filter, map, switchMap, tap } from "rxjs";
  import { Hero } from '../entities/hero'
  import { Resource, ResourcesType } from '../entities/resource/index';
  import { TILE_SIZE, SCALE } from '../common/common.const'
  import { Actions, Heroes, Grid, Renderer, grid64 } from "../core";
  import { Level } from "../core/level/level";
  import { nextLevelMenu, isMainMenu } from "../store/store";
  import MainMenu from "../components/mainMenu/MainMenu.svelte";
  import NextLevelMenu from "../components/nextLevelMenu/NextLevelMenu.svelte";
  import { frames$ } from "../tools/observables";
  import { collisions } from "../core/collisions";
  import { LayersRenderType } from "../core/layers/layers.types";

  import type { IPlayer } from "@shared";
  import type { TCollisionArea } from "../abilities/abilities.types";
  import type { ICollectingCharacter, IMovableCharacter } from "../common/common.types";

  const level = new Level();
  const { startCoords, endCoords, boundaries, maps, gridX, gridY } = level.next();
  const nextLevelArea = [grid64.transformToPixels(endCoords[0], endCoords[1], 1, 1)];
  const startPosition = grid64.transformToPixels(startCoords[0] - 1, startCoords[1] - 1, 3, 3);

  const actions = new Actions();
  const heroes = new Heroes(startPosition);

  const resources$ = new BehaviorSubject([
    {
      coords: grid64.transformToPixels(3, 4, 1, 1),
      element: new Resource({
        type: ResourcesType.GOLD,
      })
    },
    {
      coords: grid64.transformToPixels(4, 5, 1, 1),
      element: new Resource({
        type: ResourcesType.MEAT,
      })
    },
    {
      coords: grid64.transformToPixels(5, 6, 1, 1),
      element: new Resource({
        type: ResourcesType.WOOD,
      })
    }
  ]);

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
    const boundariesCoords = boundaries.map((bound): TCollisionArea => grid64.transformToPixels(bound[0], bound[1], 1, 1));

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
    actions.updatePlayerListener()
      .pipe(tap((player) => console.log('Update player', player)))
      .subscribe((player) => {
        const existingPlayer = heroes.getHero(player);

        if (existingPlayer) {
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

    /**
     * Рендер слоя с объектами переднего плана
     */
    const foregroundScene = new Renderer({
      canvas: document.getElementById('canvas_foreground') as HTMLCanvasElement,
      scale: SCALE,
      grid: grid64,
    });

    async function renderAsync() {
      for (const { map, type } of maps) {
        if (type === LayersRenderType.Background) {
          await staticScene.renderStaticLayer(map);
        }
        if (type === LayersRenderType.Foreground) {
          await foregroundScene.renderStaticLayer(map);
        }
      }
    }

    renderAsync();

    /**
     * Рендер интерактивных элементов, которые будут в движении
     */
    const interactiveScene = new Renderer({
      canvas: document.getElementById('canvas_interactive') as HTMLCanvasElement,
      scale: SCALE,
      grid: grid64,
    });

    const resourcesScene = new Renderer({
      canvas: document.getElementById('canvas_resources') as HTMLCanvasElement,
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
    function checkCollisions(character: IMovableCharacter & ICollectingCharacter): void {
      const movable = character.getAbility('movable');
      const collecting = character.getAbility('collecting');

      for (const area of nextLevelArea) {
        const hasCollisionWithNextLevelArea = collisions.hasCollision(
          movable.getCollisionArea(),
          area
        );

        if (hasCollisionWithNextLevelArea) {
          nextLevelMenu.set(true);

          break;
        }
      }

      const resources = resources$.getValue();

      for (const resource of resources) {
        const hasCollision = collisions.hasCollision(
          movable.getCollisionArea(),
          resource.coords
        );

        if (hasCollision) {
          collecting.collect(resource.element);
          resources$.next(resources.filter((original) => original.element !== resource.element));
        }
      }
    }

    let lastTime = 0;

    resources$.subscribe((resources) => {
      resourcesScene.clear();
      resources.forEach(({ coords, element }) => {
        resourcesScene.render(coords, element);
      });
    });

    frames$.subscribe((timeStamp = 0) => {
      const deltaTime = timeStamp - lastTime;

      interactiveScene.renderMovableLayer(heroes.heroes, deltaTime);
      lastTime = timeStamp
    });

    heroes.heroes$.subscribe((heroes) => {
      for (const hero of heroes) {
        const movable = hero.getAbility('movable');

        movable.breakpoints$.subscribe((_) => {
          checkCollisions(hero);
        });
      }
    });
  });

  onDestroy(() => {
    actions.closeGame();
  })
</script>

<div>
  <canvas id="canvas" width="1280" height="832" style="position: absolute; left: 50%; top: 120px; transform: translateX(-50%);"></canvas>
  <canvas id="canvas_resources" width="1280" height="832" style="position: absolute; left: 50%; top: 0; transform: translateX(-50%);"></canvas>
  <canvas id="canvas_interactive" width="1280" height="832" style="position: absolute; left: 50%; top: 120px; transform: translateX(-50%);"></canvas>
  <canvas id="canvas_foreground" width="1280" height="832" style="position: absolute; left: 50%; top: 120px; transform: translateX(-50%);"></canvas>
  <canvas id="canvas_hero_bar" width="1280" height="120px" style="position: absolute; left: 50%; top: 0; transform: translateX(-50%);"></canvas>
  {#if isMainMenuShow}
  <!-- Передать экшены для кнопок -->
    <MainMenu {initGame} {connectToMultipleGame}/>
  {/if}
  {#if isNextLevelMenu}
    <NextLevelMenu/>
  {/if}
</div>

