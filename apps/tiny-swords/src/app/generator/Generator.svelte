<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { Observable, concatAll, concatMap, filter, from, map, switchMap, tap, withLatestFrom } from "rxjs";
  import { Hero } from '../entities/hero'
  import {  Resource, ResourcesType } from '../entities/resource/index';
  import { TILE_SIZE, SCALE } from '../common/common.const'
  import { actions, Heroes, Grid, Renderer, grid64, HeroHealthBar, HeroResourcesBar } from "../core";
  import { Level } from "../core/level/level";
  import { nextLevelMenu, isMainMenuStore, isMuttedStore } from "../store";
  import MainMenu from "../components/mainMenu/MainMenu.svelte";
  import NextLevelMenu from "../components/nextLevelMenu/NextLevelMenu.svelte";
  import { frames$ } from "../tools/observables";
  import { collisions } from "../core/collisions";
  import { LayersRenderType } from "../core/layers/layers.types";

  import type { IPlayer } from "@shared";
  import type { TPixelsCoords } from "../abilities/abilities.types";
  import type { ICollectingCharacter, IMovableCharacter } from "../common/common.types";

  let staticScene: Renderer;
  let foregroundScene: Renderer;

  const level = new Level();
  const heroes = new Heroes(level.startCoords);
  const heroHealthBar = new HeroHealthBar({totalLives: 3, availableLives: 1, blockedLives: 1});

  const nextLevelTile$ = level.endCoords$.pipe(map(([x, y]) => grid64.transformToPixels(x, y, 1, 1)));

  let isNextLevelMenu = false;
  let isMainMenu = true;
  let isMuttedValue = false;

  nextLevelMenu.subscribe(value => isNextLevelMenu = value);
  isMainMenuStore.subscribe(value => isMainMenu = value);
  isMuttedStore.subscribe( value => isMuttedValue = value)

  level.startCoords$.subscribe(([startX, startY]) => {
    /**
     * Выставляем зависимость: герои должны перемещаться в новую позицию, когда стартовые координаты поменялись.
     * А меняются они, когда герои переходят на новый уровень.
     */
     heroes.heroes$.forEach(heroes => {
      for (const hero of heroes) {

        const movable = hero.getAbility('movable');
        const [x, y] = grid64.transformToPixels(startX - 1, startY - 1, 3, 3);

        movable.setCoords([x, y]);
      }
    });
  });

  function renderLayers(): void {
    level.maps$
      .pipe(
        tap(() => [staticScene, foregroundScene].forEach((scene) => scene.clear())),
        concatAll(),
        concatMap(({ map, type }) => {
          if (type === LayersRenderType.Background) return from(staticScene.renderStaticLayer(map));

          return from(foregroundScene.renderStaticLayer(map));
        })
      )
      .subscribe();
  }

  function createNewLevel(): void {
    level.next().pipe(switchMap(() => actions.updateLevel(level.data))).subscribe();
  }

  const initGame = (): void => {
    const action$ = actions.initGame(level.data).pipe(filter(Boolean), tap(() => console.log('The game was created')));

    handleHeroMovement(action$);
  }

  const connectToMultipleGame = (): void => {
    const action$ = actions.connectToMultipleGame().pipe(tap(() => console.log('You connected to multiple game')));

    handleHeroMovement(action$);
  }

  function handleHeroMovement(action$: Observable<IPlayer>): void {
    action$
      .pipe(
        map((hero) => heroes.initHero(hero, level.boundaries$)),
        switchMap((hero: Hero) => {
          const movable = hero.getAbility('movable');

          return movable.movement$.pipe(switchMap((direction) => actions.updatePlayer({ id: hero.id, direction, coords: movable.coords })));
        })
      ).subscribe();
  }

  function handleUpdatedPlayers(): void {
    actions.updatePlayerListener()
      .pipe(tap((player) => console.log('Update player', player)))
      .subscribe((player) => {
        const existingPlayer = heroes.getHero(player);

        if (existingPlayer) return;

        heroes.initConnectedHero(player);
      });
  }

  const gameResources = new HeroResourcesBar([new Resource({type: ResourcesType.GOLD, quantity: 0}), new Resource({type: ResourcesType.WOOD, quantity: 0})])

  const buyImprovements = (resources: {[K in ResourcesType]?: number}):void => {
    gameResources.spend(resources);
    heroHealthBar.unblockLive()

  };
  const availableResourcesCheck = (resources: {[K in ResourcesType]?: number}):boolean => gameResources.availableResourcesCheck(resources);
  
  function handleUpdatedLevel(): void {
    actions.updateLevelListener()
      .pipe(tap(() => console.log('Update level')))
      .subscribe((data) => {
        level.updateLevel(data);

        if (isNextLevelMenu) nextLevelMenu.set(false);
      })
  }

  onMount(async () => {
    handleUpdatedLevel()
    handleUpdatedPlayers();
    /**
     * Рендер статичной карты
     */
    const grid64 = new Grid({ tileSize: TILE_SIZE, maxX: level.gridX, maxY: level.gridY });

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

    renderLayers();

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

    const heroHealthBarScene = new Renderer({
      canvas: document.getElementById('canvas_hero_health-bar') as HTMLCanvasElement,
      scale: SCALE,
      grid: grid64,
    });

    await heroBarsScene.renderResourcesBar(gameResources.getResources())

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

      const resources = level.resources;

      for (const resource of resources) {
        const hasCollision = collisions.hasCollision(
          movable.getCollisionArea(),
          resource.coords
        );

        if (hasCollision) {

          if(resource.resourceType === ResourcesType.MEAT) {
            heroHealthBar.addLive();
          }
          collecting.collect(resource);

          const updatedResources = resources.filter((original) => original !== resource);
          gameResources.addResource(resource.getType())
          level.updateResources(updatedResources)
        }
      }
    }

    let lastTime = 0;

    level.resources$.subscribe((resources) => {
      resourcesScene.clear();
      resources.forEach((resource) => {
        resourcesScene.render(resource.coords, resource);
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

    gameResources.resources$.subscribe(() => {
    heroBarsScene.clear()
    heroBarsScene.renderResourcesBar(gameResources.getResources())
  }
    )
    heroHealthBar.healthBar$.subscribe(lives => {
      heroHealthBarScene.clear();
      heroHealthBarScene.renderHealthBar(lives)
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
  <canvas id="canvas_hero_health-bar" width="1280" height="120px" style="position: absolute; left: 50%; top: 0; transform: translateX(-50%);"></canvas>
  {#if isMainMenu}
    <MainMenu {initGame} {connectToMultipleGame}/>
  {/if}
  {#if isNextLevelMenu}
    <NextLevelMenu {createNewLevel} {buyImprovements} {availableResourcesCheck}/>
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
