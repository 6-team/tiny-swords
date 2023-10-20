<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { Observable, combineLatest, concatAll, concatMap, filter, first, from, map, merge, skip, switchMap, tap, withLatestFrom } from "rxjs";
  import { Hero } from '../entities/hero'
  import { Resource, ResourcesType } from '../entities/resource';
  import { SCALE, TOTAL_LIVES } from '../common/common.const'
  import { actions, Heroes, Renderer, grid64, HeroResourcesBar, enemies } from "../core";
  import { Level } from "../core/level/level";
  import {
    nextLevelMenu,
    isMainMenuStore,
    isMuttedStore,
    endGameMenuStore,
    multiplayerStore,
  } from "../store";
  import { MainMenu, NextLevelMenu, EndGameMenu } from "../components";
  import { frames$ } from "../tools/observables";
  import { collisions } from "../core/collisions";
  import { LayersRenderType } from "../core/layers/layers.types"

  import type { AttackingType, IPlayer } from "@shared";
  import type { TPixelsCoords } from "../abilities/abilities.types";
  import { type IAttackingCharacter, ImprovementTypes, type availableResourcesCheckType, type buyImprovementsType  } from "../common/common.types";

  let staticScene: Renderer;
  let foregroundScene: Renderer;

  const level = new Level();
  const heroes = new Heroes(level.startCoords);

  const nextLevelTile$ = level.endCoords$.pipe(map(([x, y]) => grid64.transformToPixels(x, y, 1, 1)));

  let isNextLevelMenu = false;
  let isMainMenu = true;
  let endGameMenu = true;
  let isMuttedValue = false;
  let isMultiplayer = false;
  let uniq = {}

  nextLevelMenu.subscribe(value => isNextLevelMenu = value);
  isMainMenuStore.subscribe(value => isMainMenu = value);
  isMuttedStore.subscribe( value => isMuttedValue = value);
  endGameMenuStore.subscribe(value => endGameMenu = value)
  multiplayerStore.subscribe(value => isMultiplayer = value)


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

  function restartGame() {
    endGameMenuStore.set(false);
    heroes.mainHero.fighting.reset();

    if (isMultiplayer) {
      const movable = heroes.mainHero.getAbility('movable');
      const [startX, startY] = level.startCoords;
      const [x, y] = grid64.transformToPixels(startX - 1, startY - 1, 3, 3);
      movable.setCoords([x, y])
      actions.updatePlayer({ id: heroes.mainHero.id, breakpoint: [x, y]}).subscribe()
    } else {
      createNewLevel();
    }
  }

  function handleHeroMovement(action$: Observable<IPlayer>): void {
    const bounds$ = combineLatest([enemies.enemiesBoundaries$, level.boundaries$]).pipe(
      map((tuple) => tuple.flat())
    );

    action$
      .pipe(
        map((hero) => heroes.initHero(hero, bounds$)),
        switchMap((hero: Hero) => {
          const movable = hero.getAbility('movable');
          const attacking = hero.getAbility('attacking')
          const controller = movable.getController();
          const movement$ = controller.movement$.pipe(switchMap((direction) => actions.updatePlayer({ id: hero.id, direction, coords: movable.coords })));
          const attack$ = attacking.attack$.pipe(switchMap((attackingType) => actions.updatePlayer({ id: hero.id, attackingType })));;
          const breakpoint$ = movable.breakpoints$.pipe(skip(1),switchMap((breakpoint) => {
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
    const bounds$ = combineLatest([heroes.heroesBoundaries$, level.boundaries$]).pipe(
      map((tuple) => tuple.flat())
    );

    actions.updateEnemyListener()
      .pipe(
        filter((enemy) => !!enemy.id),
        map((enemy) => {
          const existingEnemy = enemies.getEnemy(enemy.id);

          return existingEnemy || enemy.isDied ? null : enemy;
        }),
        filter(Boolean),
        map((enemy) => enemies.initEnemy(enemy, heroes.heroes$)),
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

  /**
   * @TODO Что это? Отрефакторить!
   */
  const rerenderComponent = () => {
    uniq = {}
  }

  const gameResources = new HeroResourcesBar([new Resource({type: ResourcesType.GOLD, quantity: 0}), new Resource({type: ResourcesType.WOOD, quantity: 0})])

  const buyImprovements: buyImprovementsType = (resources, type):void => {
  if(availableResourcesCheck(resources, type)){
    gameResources.spend(resources);
    applyActionOnResource(type);
    rerenderComponent();
  }
};

  const applyActionOnResource = (type: ImprovementTypes) => {
    switch(type){
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
    switch(improvementType){
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

  onMount(async () => {
    handleEnemyMovement();
    handleUpdatedLevel();
    handleUpdatedPlayers();
    handleUpdatedEnemies();
    /**
     * Рендер статичной карты
     */

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
    function checkCollisions(character: Hero, nextLevelTile: TPixelsCoords): void {
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
            character.fighting.addLive();
          }

          collecting.collect(resource);

          const updatedResources = resources.filter((original) => original !== resource);

          gameResources.addResource(resource.resourceType)
          level.updateResources(updatedResources)
        }
      }
    }

    function checkAttackCollisions(hero: IAttackingCharacter, type: AttackingType) {
      const attacking = hero.getAbility('attacking');

      for (const enemy of enemies.enemies) {
        const enemyMovable = enemy.getAbility('movable');
        const hasAttackCollision = collisions.hasCollision(
          attacking.getAffectedArea(),
          enemyMovable.getCollisionArea()
        );

        if (hasAttackCollision) {
          attacking.isAttacking$
            .pipe(filter(isAttacking => !isAttacking), first(), switchMap(() => actions.updateEnemy({ id: enemy.id, isDied: true }))).subscribe(() => {
              enemy.fighting.takeDamage();
            });

          break;
        }
      }
    }

    level.resources$.subscribe((resources) => {
      resourcesScene.clear();
      resources.forEach((resource) => {
        resourcesScene.render(resource.coords, resource);
      });
    });

    combineLatest([heroes.heroes$, enemies.enemies$]).subscribe(([heroes, enemies]) => {
      interactiveScene.renderMovableLayer([...enemies, ...heroes]);

      for (const hero of heroes) {
        const movable = hero.getAbility('movable');
        const attacking = hero.getAbility('attacking');

        movable.breakpoints$.pipe(withLatestFrom(nextLevelTile$)).subscribe(([_, nextLevelTile]) => {
          checkCollisions(hero, nextLevelTile);
        });

        attacking.attack$.subscribe((type) => {
          checkAttackCollisions(hero, type);
        });
      }

      multiplayerStore.set(heroes.length > 1)
    });

    gameResources.resources$.subscribe(() => {
      heroBarsScene.clear()
      heroBarsScene.renderResourcesBar(gameResources.getResources())
    });

    heroes.mainHero$.pipe(filter(Boolean)).subscribe((hero) => {
      combineLatest([
        hero.fighting.livesCount$,
        hero.fighting.blockedLivesCount$
      ]).subscribe(([availableLives, blockedLives,]) => {
        heroHealthBarScene.clear();
        heroHealthBarScene.renderHealthBar({ availableLives, blockedLives, totalLives: TOTAL_LIVES });
      });

      hero.fighting.isDied$.pipe(filter(Boolean)).subscribe(() => {
        hero.sounds.playGameOverSound(); // @TODO Вынести в gameSounds, вместо heroSounds
        endGameMenuStore.set(true);
        hero.moving.setCoords([innerWidth, innerHeight])
        actions.updatePlayer({ id: hero.id, breakpoint: [innerWidth, innerHeight]}).subscribe()
      });
    });
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
   {#key uniq}
    <NextLevelMenu {createNewLevel} {buyImprovements} {availableResourcesCheck}/>
   {/key}
  {/if}
  {#if endGameMenu}
    <EndGameMenu isMultiplayer={isMultiplayer} onClick={restartGame} />
  {/if}
  <button class="volume-btn" on:click={()=> {
    isMuttedStore.set(!isMuttedValue)}}>
    <img src = {isMuttedValue ? './img/UI/Disable_03.png' : './img/UI/Regular_03.png'} alt= 'volume-img'/>
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
