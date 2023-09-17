<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { Hero } from '../entities/hero'
  import { TILE_SIZE, SCALE } from '../common/common.const'
  import { Actions, grid64, Heroes, Grid, Renderer, TileName } from "../core";

  import type { IMovable } from "../abilities";
  import { Observable, filter, map, switchMap, tap } from "rxjs";
  import type { IPlayer } from "@shared";

  const actions = new Actions();
  const heroes = new Heroes();

  let interactiveScene: Renderer;

  const waterMap = [
    new Array(20).fill(TileName.WATER_MIDDLE_MIDDLE),
    new Array(20).fill(TileName.WATER_MIDDLE_MIDDLE),
    new Array(20).fill(TileName.WATER_MIDDLE_MIDDLE),
    [...new Array(2).fill(TileName.WATER_MIDDLE_MIDDLE), ...new Array(16).fill(null), ...new Array(2).fill(TileName.WATER_MIDDLE_MIDDLE)],
    [...new Array(2).fill(TileName.WATER_MIDDLE_MIDDLE), ...new Array(16).fill(null), ...new Array(2).fill(TileName.WATER_MIDDLE_MIDDLE)],
    [...new Array(2).fill(TileName.WATER_MIDDLE_MIDDLE), ...new Array(16).fill(null), ...new Array(2).fill(TileName.WATER_MIDDLE_MIDDLE)],
    [...new Array(2).fill(TileName.WATER_MIDDLE_MIDDLE), ...new Array(16).fill(null), ...new Array(2).fill(TileName.WATER_MIDDLE_MIDDLE)],
    [...new Array(2).fill(TileName.WATER_MIDDLE_MIDDLE), ...new Array(16).fill(null), ...new Array(2).fill(TileName.WATER_MIDDLE_MIDDLE)],
    [...new Array(2).fill(TileName.WATER_MIDDLE_MIDDLE), ...new Array(16).fill(null), ...new Array(2).fill(TileName.WATER_MIDDLE_MIDDLE)],
    [...new Array(2).fill(TileName.WATER_MIDDLE_MIDDLE), ...new Array(16).fill(null), ...new Array(2).fill(TileName.WATER_MIDDLE_MIDDLE)],
    [...new Array(2).fill(TileName.WATER_MIDDLE_MIDDLE), ...new Array(16).fill(null), ...new Array(2).fill(TileName.WATER_MIDDLE_MIDDLE)],
    new Array(20).fill(TileName.WATER_MIDDLE_MIDDLE),
    new Array(20).fill(TileName.WATER_MIDDLE_MIDDLE),
  ];

  const foamMap = [
    [],
    [],
    [null,               TileName.FOAM_TOP,                           ...new Array(16).fill(null), TileName.FOAM_TOP],
    [TileName.FOAM_LEFT, TileName.FOAM_MIDDLE,                        ...new Array(16).fill(null), TileName.FOAM_MIDDLE, TileName.FOAM_RIGHT],
    [TileName.FOAM_LEFT, TileName.FOAM_MIDDLE,                        ...new Array(16).fill(null), TileName.FOAM_MIDDLE, TileName.FOAM_RIGHT],
    [TileName.FOAM_LEFT, TileName.FOAM_MIDDLE,                        ...new Array(16).fill(null), TileName.FOAM_MIDDLE, TileName.FOAM_RIGHT],
    [TileName.FOAM_LEFT, TileName.FOAM_MIDDLE,                        ...new Array(16).fill(null), TileName.FOAM_MIDDLE, TileName.FOAM_RIGHT],
    [TileName.FOAM_LEFT, TileName.FOAM_MIDDLE,                        ...new Array(16).fill(null), TileName.FOAM_MIDDLE, TileName.FOAM_RIGHT],
    [TileName.FOAM_LEFT, TileName.FOAM_MIDDLE,                        ...new Array(16).fill(null), TileName.FOAM_MIDDLE, TileName.FOAM_RIGHT],
    [TileName.FOAM_LEFT, TileName.FOAM_MIDDLE,                        ...new Array(16).fill(null), TileName.FOAM_MIDDLE, TileName.FOAM_RIGHT],
    [TileName.FOAM_LEFT, TileName.FOAM_MIDDLE,                        ...new Array(16).fill(null), TileName.FOAM_MIDDLE, TileName.FOAM_RIGHT],
    [TileName.FOAM_LEFT, ...new Array(18).fill(TileName.FOAM_MIDDLE), TileName.FOAM_RIGHT],
    [null,               ...new Array(18).fill(TileName.FOAM_BOTTOM)],
  ];

  const sandMap = [
    [],
    [],
    [],
    [null, TileName.SAND_TOP_LEFT,    TileName.SAND_TOP_MIDDLE,    ...new Array(14).fill(null), TileName.SAND_TOP_MIDDLE,    TileName.SAND_TOP_RIGHT],
    [null, TileName.SAND_MIDDLE_LEFT, TileName.SAND_MIDDLE_MIDDLE, ...new Array(14).fill(null), TileName.SAND_MIDDLE_MIDDLE, TileName.SAND_MIDDLE_RIGHT],
    [null, TileName.SAND_MIDDLE_LEFT, TileName.SAND_MIDDLE_MIDDLE, ...new Array(14).fill(null), TileName.SAND_MIDDLE_MIDDLE, TileName.SAND_MIDDLE_RIGHT],
    [null, TileName.SAND_MIDDLE_LEFT, TileName.SAND_MIDDLE_MIDDLE, ...new Array(14).fill(null), TileName.SAND_MIDDLE_MIDDLE, TileName.SAND_MIDDLE_RIGHT],
    [null, TileName.SAND_MIDDLE_LEFT, TileName.SAND_MIDDLE_MIDDLE, ...new Array(14).fill(null), TileName.SAND_MIDDLE_MIDDLE, TileName.SAND_MIDDLE_RIGHT],
    [null, TileName.SAND_MIDDLE_LEFT, TileName.SAND_MIDDLE_MIDDLE, ...new Array(14).fill(null), TileName.SAND_MIDDLE_MIDDLE, TileName.SAND_MIDDLE_RIGHT],
    [null, TileName.SAND_MIDDLE_LEFT, TileName.SAND_MIDDLE_MIDDLE, ...new Array(14).fill(null), TileName.SAND_MIDDLE_MIDDLE, TileName.SAND_MIDDLE_RIGHT],
    [null, TileName.SAND_MIDDLE_LEFT, ...new Array(16).fill(TileName.SAND_MIDDLE_MIDDLE), TileName.SAND_MIDDLE_RIGHT],
    [null, TileName.SAND_BOTTOM_LEFT, ...new Array(16).fill(TileName.SAND_BOTTOM_MIDDLE), TileName.SAND_BOTTOM_RIGHT],
  ]

  const elevationMap = [
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [null, null, TileName.ELEVATION_BOTTOM_LEFT, ...new Array(14).fill(TileName.ELEVATION_BOTTOM_MIDDLE), TileName.ELEVATION_BOTTOM_RIGHT],
    [null, null, TileName.ELEVATION_EDGE_LEFT,   ...new Array(14).fill(TileName.ELEVATION_EDGE_MIDDLE),   TileName.ELEVATION_EDGE_RIGHT],
  ];

  const groundMap = [
    [],
    [],
    [null, null, TileName.GROUND_TOP_LEFT,    ...new Array(14).fill(TileName.GROUND_TOP_MIDDLE),    TileName.GROUND_TOP_RIGHT],
    [null, null, TileName.GROUND_MIDDLE_LEFT, ...new Array(14).fill(TileName.GROUND_MIDDLE_MIDDLE), TileName.GROUND_MIDDLE_RIGHT],
    [null, null, TileName.GROUND_MIDDLE_LEFT, ...new Array(14).fill(TileName.GROUND_MIDDLE_MIDDLE), TileName.GROUND_MIDDLE_RIGHT],
    [null, null, TileName.GROUND_MIDDLE_LEFT, ...new Array(14).fill(TileName.GROUND_MIDDLE_MIDDLE), TileName.GROUND_MIDDLE_RIGHT],
    [null, null, TileName.GROUND_MIDDLE_LEFT, ...new Array(14).fill(TileName.GROUND_MIDDLE_MIDDLE), TileName.GROUND_MIDDLE_RIGHT],
    [null, null, TileName.GROUND_MIDDLE_LEFT, ...new Array(14).fill(TileName.GROUND_MIDDLE_MIDDLE), TileName.GROUND_MIDDLE_RIGHT],
    [null, null, TileName.GROUND_MIDDLE_LEFT, ...new Array(14).fill(TileName.GROUND_MIDDLE_MIDDLE), TileName.GROUND_MIDDLE_RIGHT],
    [null, null, TileName.GROUND_BOTTOM_LEFT, ...new Array(14).fill(TileName.GROUND_BOTTOM_MIDDLE), TileName.GROUND_BOTTOM_RIGHT],
  ];

  const bridgeMap = [
    [],
    [],
    [],
    [],
    [TileName.BRIDGE_MIDDLE, TileName.BRIDGE_MIDDLE, TileName.BRIDGE_RIGHT],
    [TileName.BRIDGE_SHADOW, TileName.BRIDGE_SHADOW],
    [],
    [...new Array(17).fill(null), TileName.BRIDGE_LEFT, TileName.BRIDGE_MIDDLE, TileName.BRIDGE_MIDDLE],
    [...new Array(18).fill(null), TileName.BRIDGE_SHADOW, TileName.BRIDGE_SHADOW],
  ];

  const decoMap = [
    [],
    [],
    [...new Array(9).fill(null), TileName.DECO_MUSHROOM_L, TileName.DECO_MUSHROOM_M],
    [...new Array(10).fill(null), TileName.DECO_MUSHROOM_S, TileName.DECO_MUSHROOM_S],
    [...new Array(7).fill(null), TileName.DECO_STONE_S],
    [...new Array(4).fill(null), TileName.DECO_BUSH_M],
    [...new Array(5).fill(null), TileName.DECO_PUMPKIN_S, TileName.DECO_BUSH_L],
    [...new Array(5).fill(null), TileName.DECO_STONE_L, ...new Array(4).fill(null), TileName.DECO_WEED_M],
    [...new Array(9).fill(null), TileName.DECO_WEED_S, ...new Array(7).fill(null), TileName.DECO_BONE_S],
    [...new Array(7).fill(null), TileName.DECO_STONE_M, ...new Array(7).fill(null),  TileName.DECO_BONE_M],
  ];

  const boundaries = [
    [1, 1],
    [2, 1],
    [3, 1],
    [4, 1],
    [5, 1],
    [6, 1],
    [7, 1],
    [8, 1],
    [9, 1],
    [10, 1],
    [11, 1],
    [12, 1],
    [13, 1],
    [14, 1],
    [15, 1],
    [16, 1],
    [17, 1],
    [18, 1],

    [1, 2],

    [0, 3],
    [1, 3],

    [0, 5],
    [1, 5],

    [1, 6],
    [1, 7],
    [1, 8],
    [1, 9],
    [1, 10],

    [18, 2],
    [18, 3],
    [18, 4],
    [18, 5],

    [18, 6],
    [19, 6],

    [18, 8],
    [19, 8],

    [18, 9],
    [18, 10],

    [2, 10],
    [3, 10],
    [4, 10],
    [5, 10],
    [6, 10],
    [7, 10],
    [8, 10],
    [9, 10],
    [10, 10],
    [11, 10],
    [12, 10],
    [13, 10],
    [14, 10],
    [15, 10],
    [16, 10],
    [17, 10],
  ];

  const nextLevelArea = [
    [18, 7],
    [19, 7]
  ];

  function initGame(): void {
    const action$ = actions.initGame().pipe(filter(Boolean), tap(() => console.log('The game was created')));

    handleHeroMovement(action$);
  }

  function connectToMultipleGame(): void {
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
    const staticScene = new Renderer({
      canvas: document.getElementById('canvas') as HTMLCanvasElement,
      scale: SCALE,
      grid: grid64,
    });

    await staticScene.renderStaticLayer(waterMap);
    await staticScene.renderStaticLayer(foamMap);
    await staticScene.renderStaticLayer(sandMap);
    await staticScene.renderStaticLayer(elevationMap);
    await staticScene.renderStaticLayer(groundMap);
    await staticScene.renderStaticLayer(bridgeMap);
    await staticScene.renderStaticLayer(decoMap);

    /**
     * Рендер интерактивных элементов, которые будут в движении
     */
    interactiveScene = new Renderer({
      canvas: document.getElementById('canvas_interactive') as HTMLCanvasElement,
      scale: SCALE,
      grid: grid64,
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
          console.log('You won!');

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

<div class="container">
  <div class="content">
    <canvas id="canvas" width="1300" height="900" style="position: absolute; left: 0; top: 0;"></canvas>
    <canvas id="canvas_interactive" width="1280" height="832" style="position: absolute; left: 0; top: 0;"></canvas>
  </div>

  <div class="actions">
    <button on:click={initGame}>Новая Игра</button>
    <button on:click={connectToMultipleGame}>Сетевая Игра</button>
  </div>
</div>

<style lang="scss">
  .container {
    display: flex;
    flex-direction: column;
    gap: 10px;
  };

  .content {
    height: 900px;
  };

  .actions {
    display: flex;
    justify-content: center;
    gap: 8px;
  }
</style>

