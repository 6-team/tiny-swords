<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { BehaviorSubject, Observable, filter, map, switchMap, tap, withLatestFrom, zip } from "rxjs";
  import { Hero } from '../entities/hero'
  import { Resource, ResourcesType } from '../entities/resource/index';
  import { TILE_SIZE, SCALE } from '../common/common.const'
  import { Actions, Heroes, Grid, Renderer, grid64 } from "../core";
  import { Level } from "../core/level/level";
  import { nextLevelMenu, isMainMenuStore, endCoordsStore, startCoordsStore, mapsStore, boundariesStore, storeToObservable, isMuttedStore } from "../store";
  import MainMenu from "../components/mainMenu/MainMenu.svelte";
  import NextLevelMenu from "../components/nextLevelMenu/NextLevelMenu.svelte";
  import { frames$ } from "../tools/observables";
  import { collisions } from "../core/collisions";
  import { LayersRenderType } from "../core/layers/layers.types";

  import type { IPlayer } from "@shared";
  import type { TCollisionArea, TPixelsCoords } from "../abilities/abilities.types";
  import type { ICollectingCharacter, IMovableCharacter } from "../common/common.types";

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
  }

  function createNewLevel(): void {
    const { boundaries, endCoords, startCoords, maps } = new Level().next();

    [staticScene, foregroundScene].forEach((scene) => scene.clear())

    boundariesStore.set(boundaries);
    endCoordsStore.set(endCoords);
    startCoordsStore.set(startCoords);
    mapsStore.set(maps);

    renderAsync();
  }

  const nextLevelTile$ = endCoords.pipe(map(coords => grid64.transformToPixels(coords[0] - 1, coords[1] - 1, 1, 1)));
  const startPosition = grid64.transformToPixels(0, 0, 3, 3); // Любая позиция, все равно она обновится в подписке на startCoords

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
      coords: grid64.transformToPixels(4, 4, 1, 1),
      element: new Resource({
        type: ResourcesType.MEAT,
      })
    },
    {
      coords: grid64.transformToPixels(5, 4, 1, 1),
      element: new Resource({
        type: ResourcesType.WOOD,
      })
    }
  ]);

  let isNextLevelMenu = false;
  let isMainMenu = true;
  let isMuttedValue = false;

  nextLevelMenu.subscribe(value => isNextLevelMenu = value);
  isMainMenuStore.subscribe(value => isMainMenu = value);
  isMuttedStore.subscribe( value => isMuttedValue = value)

  startCoords.subscribe((coords) => {
    /**
     * Выставляем зависимость: герои должны перемещаться в новую позицию, когда стартовые координаты поменялись.
     * А меняются они, когда герои переходят на новый уровень.
     */ 
    heroes.heroes$.forEach(heroesArray => {
      const hero = heroesArray.at(-1);

      if (!hero) {
        return;
      }

      const movable = hero.getAbility('movable');
      const [x, y] = grid64.transformToPixels(coords[0] - 1, coords[1] - 1, 3, 3);

      movable.setCoords([x, y]);
    });
  });

  const initGame = (): void => {
    const action$ = actions.initGame().pipe(filter(Boolean), tap(() => console.log('The game was created')));

    handleHeroMovement(action$);
  }

  const connectToMultipleGame = (): void => {
    const action$ = actions.connectToMultipleGame().pipe(tap(() => console.log('You connected to multiple game')));

    handleHeroMovement(action$);
  }

  function handleHeroMovement(action$: Observable<IPlayer>): void {
    const boundariesCoords$ = boundaries
      .pipe(
        map(
          (bounds): Array<TCollisionArea> => bounds.map(
            (bound) => grid64.transformToPixels(bound[0], bound[1], 1, 1)
          )
        )
      );

    action$
      .pipe(
        map((hero) => heroes.initHero(hero, boundariesCoords$)),
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
    function checkCollisions(character: IMovableCharacter & ICollectingCharacter, nextLevelTile: TPixelsCoords): void {
      const movable = character.getAbility('movable');
      const collecting = character.getAbility('collecting');

      const hasCollisionWithNextLevelArea = collisions.hasCollision(
        movable.getCollisionArea(),
        nextLevelTile
      );

      if (hasCollisionWithNextLevelArea) {
        nextLevelMenu.set(true);

        return;
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

        movable.breakpoints$.pipe(withLatestFrom(nextLevelTile$)).subscribe(([_, nextLevelTile]) => {
          checkCollisions(hero, nextLevelTile);
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
  <canvas id="canvas_resources" width="1280" height="832" style="position: absolute; left: 50%; top: 120px; transform: translateX(-50%);"></canvas>
  <canvas id="canvas_interactive" width="1280" height="832" style="position: absolute; left: 50%; top: 120px; transform: translateX(-50%);"></canvas>
  <canvas id="canvas_foreground" width="1280" height="832" style="position: absolute; left: 50%; top: 120px; transform: translateX(-50%);"></canvas>
  <canvas id="canvas_hero_bar" width="1280" height="120px" style="position: absolute; left: 50%; top: 0; transform: translateX(-50%);"></canvas>
  {#if isMainMenu}
    <MainMenu {initGame} {connectToMultipleGame}/>
  {/if}
  {#if isNextLevelMenu}
    <NextLevelMenu {createNewLevel}/>
  {/if}
  <button class="volume-btn" on:click={()=> {
    isMuttedStore.set(!isMuttedValue)}}>
    <img src = {isMuttedValue ? 'img/UI/Disable_03.png' : 'img/UI/Regular_03.png'} alt= 'volume-img'/>
  </button>
</div>

<style lang="scss">
  button.volume-btn {
    border: none;
    background: transparent;
    outline: none;
    position: absolute;
    top: 50%;
    left: 100%;
    transform: translate(-100%, -50%);
    img:hover {scale: 1.2}
  }
</style>