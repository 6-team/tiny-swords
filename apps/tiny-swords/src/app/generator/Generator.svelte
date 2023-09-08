<script lang="ts">
  import { onMount } from "svelte";
  import { Renderer } from '../entites/renderer/renderer';
  import { TileName } from "../entites/renderer/renderer.const";
  import { CoordinateSystem } from '../entites/coordinate-system/coordinate-system';
  import { DecoTile } from "../entites/deco/deco";
  import { Movable } from '../entites/abilities/movable/movable';
  import { Attacking } from '../entites/abilities/attacking/attacking';
  import { AttackingForce } from "../entites/abilities/attacking/attacking.types";
  import { DecoAnimation, DecoType } from "../entites/deco/deco.const";

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

  onMount(async () => {
    const TILE_SIZE = 64;
    const SCALE = 1;

    /**
     * Рендер статичной карты
     */
    const system = new CoordinateSystem({ tileSize: TILE_SIZE, maxX: 20, maxY: 20 });
    const staticScene = new Renderer({
      canvas: document.getElementById('canvas') as HTMLCanvasElement,
      scale: SCALE,
      coordinateSystem: system,
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
    const interactiveScene = new Renderer({
      canvas: document.getElementById('canvas_interactive') as HTMLCanvasElement,
      scale: SCALE,
      coordinateSystem: system,
    });

    const mushroom = new DecoTile() // Для примера будем управлять грибом
      .addAbility("movable", new Movable({ initialX: 1, initialY: 4, initialHeight: 1 }))
      .addAbility("attacking", new Attacking());
    const movable = mushroom.getAbility<Movable>("movable");
    const attacking = mushroom.getAbility<Attacking>("attacking");

    // Дальше проверка: если перс повернут к врагу и они в соседних клетках, то удар засчитан
    // ...

    interactiveScene.renderMovableLayer([mushroom]);

    document.addEventListener('keydown', (event) => {
      switch (event.key) {
        case "ArrowLeft":
        case "a":
          movable.setMovement(([prevX, prevY]) => [prevX - 1, prevY], DecoAnimation.BACKWARD);

          break;
        case "ArrowRight":
        case "d":
          movable.setMovement(([prevX, prevY]) => [prevX + 1, prevY], DecoAnimation.FORWARD);

          break;
        case "ArrowUp":
        case "w":
          movable.setMovement(([prevX, prevY]) => [prevX, prevY - 1]);

          break;
        case "ArrowDown":
        case "s":
          movable.setMovement(([prevX, prevY]) => [prevX, prevY + 1]);

          break;
        case "f":
          attacking.attack();

          break;
        case "g":
          attacking.attack(AttackingForce.STRONG);

          break;
        default:
          return;
      }

      for (const area of nextLevelArea) {
        const hasCollisionWithNextLevelArea = CoordinateSystem.checkCollision(
          system.transformToPixels(movable.coords[0], movable.coords[1], movable.sizes[0], movable.sizes[1]),
          system.transformToPixels(area[0], area[1], 1, 1),
        );

        if (hasCollisionWithNextLevelArea) {
          alert('You won!');
        }
      }

      for (const bound of boundaries) {
        const hasCollision = CoordinateSystem.checkCollision(
          system.transformToPixels(movable.coords[0], movable.coords[1], movable.sizes[0], movable.sizes[1]),
          system.transformToPixels(bound[0], bound[1], 1, 1),
        );

        if (hasCollision) {
          movable.back();

          break;
        }
      }

      requestAnimationFrame(() => interactiveScene.renderMovableLayer([mushroom]));
    });
  });
</script>

<div>
  <canvas id="canvas" width="1300" height="900" style="position: absolute; left: 0; top: 0;"></canvas>
  <canvas id="canvas_interactive" width="1300" height="900" style="position: absolute; left: 0; top: 0;"></canvas>
</div>
