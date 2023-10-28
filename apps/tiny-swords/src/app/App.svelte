<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { Observable, combineLatest, concatAll, concatMap, filter, first, from, map, merge, skip, switchMap, tap, withLatestFrom } from "rxjs";

  import type { IEntity } from "@shared";

  import type { TPixelsCoords } from "@abilities/abilities.types";
  import type { IFightingCharacter } from "@abilities/fighting";
  import { SCALE, TOTAL_LIVES } from '@common/common.const'
  import { actions } from "@core/actions";
  import { Heroes } from "@core/heroes";
  import { enemies } from "@core/enemies";
  import { Renderer } from "@core/renderer";
  import { grid64 } from "@core/grid";
  import { HeroResourcesBar } from "@core/hero-resource-bar";
  import { Level } from "@core/level/level";
  import { LayersRenderType } from "@core/layers"
  import { collisions } from "@core/collisions";
  import { ImprovementTypes, type availableResourcesCheckType, type buyImprovementsType  } from "@common/common.types";
  import { MainMenu,EndGameMenu, NextLevelMenu, ControlHint } from "@components";
  import { Hero } from '@entities/hero'
  import { Resource, ResourcesType } from '@entities/resource';
  import {
    nextLevelMenu,
    isMainMenuStore,
    isMuttedStore,
    endGameMenuStore,
    multiplayerStore,
  } from "@store";

  let staticScene: Renderer;
  let foregroundScene: Renderer;
  let resourcesScene: Renderer;
  let interactiveScene: Renderer;
  let heroBarsScene: Renderer;
  let heroHealthBarScene: Renderer;

  let isNextLevelMenu = false;
  let isMainMenu = true;
  let endGameMenu = true;
  let isMuttedValue = false;
  let isMultiplayer = false;
  let uniq = {}

  const level = new Level();
  const heroes = new Heroes(level.startCoords);
  const nextLevelSprite$ = level.endCoords$.pipe(map(([x, y]) => grid64.transformToPixels(x, y, 1, 1)));
  const gameResources = new HeroResourcesBar([new Resource({type: ResourcesType.GOLD, quantity: 0}), new Resource({type: ResourcesType.WOOD, quantity: 0})])

  nextLevelMenu.subscribe(value => isNextLevelMenu = value);
  isMainMenuStore.subscribe(value => isMainMenu = value);
  isMuttedStore.subscribe( value => isMuttedValue = value);
  endGameMenuStore.subscribe(value => endGameMenu = value)
  multiplayerStore.subscribe(value => isMultiplayer = value)

  function handleMovingHeroesToStartCoords(): void {
    level.startCoords$.subscribe(([startX, startY]) => {
     heroes.heroes$.forEach(heroes => {
      for (const hero of heroes) {
        const [x, y] = grid64.transformToPixels(startX - 1, startY - 1, 3, 3);

        hero.moving.setCoords([x, y]);
      }
    });
  });
  }

  function renderStaticLayers(): void {
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

  function restartGame() {
    endGameMenuStore.set(false);
    heroes.mainHero.fighting.reset();

    if (isMultiplayer) {
      const [startX, startY] = level.startCoords;
      const [x, y] = grid64.transformToPixels(startX - 1, startY - 1, 3, 3);

      heroes.mainHero.moving.setCoords([x, y])
      actions.updatePlayer({ id: heroes.mainHero.id, breakpoint: [x, y]}).subscribe()
    } else {
      createNewLevel();
    }
  }

  function handleHeroMovement(action$: Observable<IEntity>): void {
    action$
      .pipe(
        map((hero) => heroes.initHero(hero, level.boundaries$, enemies.enemies$)),
        switchMap((hero: Hero) => {
          const movement$ = hero.moving.movements$.pipe(switchMap((direction) => actions.updatePlayer({ id: hero.id, direction, coords: hero.moving.coords })));
          const attack$ = hero.fighting.attack$.pipe(switchMap((attackingType) => actions.updatePlayer({ id: hero.id, attackingType })));;
          const breakpoint$ = hero.moving.breakpoints$.pipe(skip(1),switchMap((breakpoint) => {
            return actions.updatePlayer({ id: hero.id, breakpoint });
          }));

          return merge(movement$, attack$, breakpoint$);
        })
      ).subscribe();
  }

  function handleEnemyMovement(): void {
    level.enemiesCoords$
      .pipe(
        tap(() => enemies.clearEnemies()),
      )
      .subscribe()
  }

  function handleUpdatedEnemies(): void {
    actions.updateEnemyListener()
      .pipe(
        filter((enemy) => !!enemy.id),
        map((enemy) => {
          const existingEnemy = enemies.getEnemy(enemy.id);

          return existingEnemy || enemy.isDied ? null : enemy;
        }),
        filter(Boolean),
        map((enemy) => enemies.initEnemy(enemy, level.boundaries$, heroes.heroes$, heroes.mainHero$)),
      )
      .subscribe();
  }

  function handleUpdatedPlayers(): void {
    actions.updatePlayerListener()
      .subscribe((player) => {
        if (!player.id) return;

        const existingPlayer = heroes.getHero(player.id);

        if (existingPlayer) return;

        heroes.initConnectedHero(player);
      });
  }

  const rerenderComponent = () => uniq = {};

  const buyImprovements: buyImprovementsType = (resources, type):void => {
    if (!availableResourcesCheck(resources, type)) return;

    gameResources.spend(resources);
    applyActionOnResource(type);
    rerenderComponent();
  };

  const applyActionOnResource = (type: ImprovementTypes) => {
    switch (type) {
      case ImprovementTypes.LIFE:
        heroes.mainHero.fighting.addLive();
        break;
      case ImprovementTypes.LIFE_SLOT:
      heroes.mainHero.fighting.unblockLive();
        break;
      default:
        break;
    }
  };

  const availableResourcesCheck: availableResourcesCheckType = (resources, improvementType):boolean => {
    const isEnoughResources = gameResources.availableResourcesCheck(resources);

    switch (improvementType) {
      case ImprovementTypes.LIFE:
        return isEnoughResources && heroes.mainHero.fighting.checkAddLive();
      case ImprovementTypes.LIFE_SLOT:
        return isEnoughResources && heroes.mainHero.fighting.checkUnblockLive();
      default:
        return isEnoughResources;
    }
  };


  function handleUpdatedLevel(): void {
    actions.updateLevelListener()
      .pipe(tap(() => console.log('Update level')))
      .subscribe((data) => {
        level.updateLevel(data);

        if (isNextLevelMenu) nextLevelMenu.set(false);
      })
  }

  function handleNewEnemy(): void {
    enemies.newEnemy$.subscribe((enemy) => {
      enemy.fighting.isAttacking$
        .pipe(filter((isAttacking) => !isAttacking), withLatestFrom(heroes.mainHero$))
        .subscribe(([_, hero]) => {
          if (!hero) {
            return;
          }

          const hasCollision = collisions.hasCollision(
            enemy.fighting.getAffectedArea(),
            hero.moving.getCollisionArea()
          );

          if (hasCollision) {
            hero.fighting.takeDamage();
          }
        });

      enemy.fighting.isDied$.pipe(first()).subscribe(() => enemies.removeEnemy(enemy.id));
    });
  }

  function checkCollisions(character: Hero, nextLevelSprite: TPixelsCoords): void {
    const hasCollisionWithNextLevelArea = collisions.hasCollision(
      character.moving.getCollisionArea(),
      nextLevelSprite
    );

    if (hasCollisionWithNextLevelArea) {
      nextLevelMenu.set(true);

      return;
    }

    const resources = level.resources;

    for (const resource of resources) {
      const hasCollision = collisions.hasCollision(
        character.moving.getCollisionArea(),
        resource.coords
      );

      if (hasCollision) {
        if(resource.resourceType === ResourcesType.MEAT) {
          character.fighting.addLive();
        }

        character.collecting.collect(resource);

        const updatedResources = resources.filter((original) => original !== resource);

        gameResources.addResource(resource.resourceType)
        level.updateResources(updatedResources)
      }
    }
  }

  function checkAttackCollisions(hero: IFightingCharacter) {
    for (const enemy of enemies.enemies) {
      const hasAttackCollision = collisions.hasCollision(
        hero.fighting.getAffectedArea(),
        enemy.moving.getCollisionArea()
      );

      if (hasAttackCollision) {
        hero.fighting.isAttacking$
          .pipe(filter(isAttacking => !isAttacking), first(), switchMap(() => actions.updateEnemy({ id: enemy.id, isDied: true })))
          .subscribe(() => {
            enemy.fighting.takeDamage();
          });

        break;
      }
    }
  }

  function handleMovableLayer(): void {
    combineLatest([heroes.heroes$, enemies.enemies$]).subscribe(([heroes, enemies]) => {
      interactiveScene.renderMovableLayer([...enemies, ...heroes]);

      for (const hero of heroes) {
        hero.moving.breakpoints$.pipe(withLatestFrom(nextLevelSprite$)).subscribe(([_, nextLevelSprite]) => {
          checkCollisions(hero, nextLevelSprite);
        });

        hero.fighting.attack$.subscribe(() => checkAttackCollisions(hero));
      }

      multiplayerStore.set(heroes.length > 1);
    });
  }

  function handleResourceScene(): void {
    level.resources$.subscribe((resources) => {
      resourcesScene.clear();
      resources.forEach((resource) => {
        resourcesScene.render(resource.coords, resource);
      });
    });
  }

  function handleHeroBarsScene(): void {
    gameResources.resources$.subscribe(() => {
      heroBarsScene.clear()
      heroBarsScene.renderResourcesBar(gameResources.getResources())
    });
  }

  function handleMainHero(): void {
    heroes.mainHero$.pipe(filter(Boolean)).subscribe((hero) => {
      combineLatest([
        hero.fighting.livesCount$,
        hero.fighting.blockedLivesCount$
      ]).subscribe(([availableLives, blockedLives,]) => {
        heroHealthBarScene.clear();
        heroHealthBarScene.renderHealthBar({ availableLives, blockedLives, totalLives: TOTAL_LIVES });
      });

      hero.fighting.isDied$.pipe(filter(Boolean)).subscribe(() => {
        hero.sounds.playGameOverSound();
        endGameMenuStore.set(true);
        hero.moving.setCoords([innerWidth, innerHeight]);
        actions.updatePlayer({ id: hero.id, breakpoint: [innerWidth, innerHeight]}).subscribe()
      });

      handleHeroBarsScene()
    });
  }

  function initScenes(): void {
    staticScene = initScene('canvas');
    foregroundScene = initScene('canvas_foreground');
    interactiveScene = initScene('canvas_interactive');
    resourcesScene = initScene('canvas_resources');
    heroBarsScene = initScene('canvas_hero_bar');
    heroHealthBarScene = initScene('canvas_hero_health_bar');
  }

  function initScene(id: string): Renderer {
    return new Renderer({
      canvas: document.getElementById(id) as HTMLCanvasElement,
      scale: SCALE,
      grid: grid64,
    });
  }

  onMount(async () => {
    handleNewEnemy();
    handleMovingHeroesToStartCoords();
    handleEnemyMovement();
    handleUpdatedLevel();
    handleUpdatedPlayers();
    handleUpdatedEnemies();
    initScenes();
    renderStaticLayers();
    handleResourceScene();
    handleMovableLayer();
    handleMainHero();
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
  <canvas id="canvas_hero_health_bar" width="1280" height="120px" style="position: absolute; left: 50%; top: 0; transform: translateX(-50%);"></canvas>

  {#if isMainMenu}
    <MainMenu {initGame} {connectToMultipleGame}/>
    <ControlHint />
  {/if}

  {#if isNextLevelMenu}
   {#key uniq}
    <NextLevelMenu {createNewLevel} {buyImprovements} {availableResourcesCheck}/>
   {/key}
  {/if}

  {#if endGameMenu}
    <EndGameMenu isMultiplayer={isMultiplayer} onClick={restartGame} />
  {/if}

  <button class="volume-btn" on:click={()=> isMuttedStore.set(!isMuttedValue)}>
    <img src={isMuttedValue ? './img/UI/Disable_03.png' : './img/UI/Regular_03.png'} alt= 'volume-img'/>
  </button>
</div>

<style lang="scss">
  :global(*) {
    font-family: "vinqueregular", serif;
    cursor: url('/img/UI/01.png') 20 20, auto !important;
  }

  :global(body) {
    background-color: rgba(71, 171, 169, 1);
  }

  @font-face {
		font-family: 'Vinque';
		src:  url("/fonts/vinque_rg.otf") format("opentype");
		font-style: normal;
	}

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

