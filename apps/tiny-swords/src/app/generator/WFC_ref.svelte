<script lang="ts">
  import { onMount } from "svelte";
  import { Scene } from '../entites/scene/scene';
  import { TileName } from "../entites/scene/scene.const";
  import { WFC } from "../tools/wfc/wfc"
  import { RULES, TILE_DECO_WEIGHT, TILE_TYPES } from "../tools/wfc/wfc.const"
  import { Matrix } from '../tools/matrix/matrix';

  const waterMap = [
    new Array(20).fill(TileName.WATER_MIDDLE_MIDDLE),
    new Array(20).fill(TileName.WATER_MIDDLE_MIDDLE),
    new Array(20).fill(TileName.WATER_MIDDLE_MIDDLE),
    new Array(20).fill(TileName.WATER_MIDDLE_MIDDLE),
    new Array(20).fill(TileName.WATER_MIDDLE_MIDDLE),
    new Array(20).fill(TileName.WATER_MIDDLE_MIDDLE),
    new Array(20).fill(TileName.WATER_MIDDLE_MIDDLE),
    new Array(20).fill(TileName.WATER_MIDDLE_MIDDLE),
    new Array(20).fill(TileName.WATER_MIDDLE_MIDDLE),
    new Array(20).fill(TileName.WATER_MIDDLE_MIDDLE),
    new Array(20).fill(TileName.WATER_MIDDLE_MIDDLE),
    new Array(20).fill(TileName.WATER_MIDDLE_MIDDLE),
    new Array(20).fill(TileName.WATER_MIDDLE_MIDDLE),
  ];

  const wfc = new WFC(20, 13, RULES, TILE_TYPES);
  const map = wfc.map(wfc.grid, 20, 13);

  // декорации
  const decoGrid = new Matrix<{ collapsed: boolean, index: number, options: [number] }>(20, 13);
  const decoCount = 50;
  const availableCells = wfc.grid.filter(({ options }) => options[0] < 54);

  if (availableCells.length) {
    for (let i = 0; i < decoCount; i++) {
      const { index } = availableCells[Math.floor(Math.random() * availableCells.length)];

      const x = index % 20;
      const y = Math.floor(index / 20);

      decoGrid.set({ x, y }, { 
        collapsed: true,
        index,
        options: [wfc.weightedRandom(TILE_DECO_WEIGHT)]
      });
    }
  }
  const decoMap = wfc.map(decoGrid.array, 20, 13);

  // под мосты
  const bridgeGrid = new Matrix<{ collapsed: boolean, index: number, options: [number] }>(20, 13);

  wfc.grid.forEach(({ index, options }) => {
    const x = index % 20;
    const y = Math.floor(index / 20);

    if (options[0] === TileName.BRIDGE_LEFT) {
      bridgeGrid.set({ x, y }, { 
        collapsed: true,
        index,
        options: [TileName.GROUND_MIDDLE_RIGHT]
      });
    }
    if (options[0] === TileName.BRIDGE_RIGHT) {
      bridgeGrid.set({ x, y }, { 
        collapsed: true,
        index,
        options: [TileName.GROUND_MIDDLE_LEFT]
      });
    }
    if (options[0] === TileName.BRIDGE_MIDDLE) {
      bridgeGrid.set({ x, y }, { 
        collapsed: true,
        index,
        options: [TileName.BRIDGE_SHADOW]
      });
    }
  });

  const bridgeMap = wfc.map(bridgeGrid.array, 20, 13);

  onMount(async () => {
    const scene = new Scene({ tileSize: 64, scale: 0.75 });

    await scene.renderLayer(waterMap);
    await scene.renderLayer(bridgeMap);
    await scene.renderLayer(map);
    await scene.renderLayer(decoMap as any);
  });

  /*
  // Генерируем уровень
  const grid = new Grid(x, y, RULES, TILE_TYPES); // Матрица, в ячейках все типы
  grid.fillByTemplates([                          // Обновляем матрицу по шаблонам, например, шаблон с периметром воды
    [{
      coords: [2, 3],
      tile: 'water'
    }]
  ]);
  grid.fillByWFC();                               // Автоматически заполняем оставшиеся ячейки

  const map = grid.map();                         // Получаем хеш-таблицу для рендера

  // Создаем дополнительные тайлы под мосты
  const bridgeGrid = new Grid(x, y);
  decorationsGrid.fillMask(grid.array, [
    { tile: 'bridge_left', ground, randomCount: 0 },
    { tile: 'bridge_right', ground, randomCount: 0 }
  ]);
  const bridgeMap = bridgeGrid.map();

  // Генерируем декорации
  const decorationsGrid = new Grid(x, y);
  decorationsGrid.fillMask(grid.array, [
    { tile: 'water', stones, randomCount: 10 },
    { tile: 'ground', deco, randomCount: 20 }
  ]);
  const decorationsMap = decorationsGrid.map();   // Получаем хеш-таблицу для рендера

  // рендерим карту
  await scene.renderLayer(map);
  await scene.renderLayer(decorationsMap);
  */

</script>

<div style='position: relative'>
  <canvas id="canvas" width="960" height="720"></canvas>
</div>
