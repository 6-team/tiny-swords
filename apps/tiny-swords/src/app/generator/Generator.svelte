<script lang="ts">
  import { onMount } from "svelte";
  import { Scene } from '../entites/scene/scene';
  import { TileName } from "../entites/scene/scene.const";

  const waterMap = [
    new Array(15).fill(TileName.WATER_MIDDLE_MIDDLE),
    new Array(15).fill(TileName.WATER_MIDDLE_MIDDLE),
    new Array(15).fill(TileName.WATER_MIDDLE_MIDDLE),
    [...new Array(2).fill(TileName.WATER_MIDDLE_MIDDLE), ...new Array(11).fill(null), ...new Array(2).fill(TileName.WATER_MIDDLE_MIDDLE)],
    [...new Array(2).fill(TileName.WATER_MIDDLE_MIDDLE), ...new Array(11).fill(null), ...new Array(2).fill(TileName.WATER_MIDDLE_MIDDLE)],
    [...new Array(2).fill(TileName.WATER_MIDDLE_MIDDLE), ...new Array(11).fill(null), ...new Array(2).fill(TileName.WATER_MIDDLE_MIDDLE)],
    [...new Array(2).fill(TileName.WATER_MIDDLE_MIDDLE), ...new Array(11).fill(null), ...new Array(2).fill(TileName.WATER_MIDDLE_MIDDLE)],
    [...new Array(2).fill(TileName.WATER_MIDDLE_MIDDLE), ...new Array(11).fill(null), ...new Array(2).fill(TileName.WATER_MIDDLE_MIDDLE)],
    new Array(15).fill(TileName.WATER_MIDDLE_MIDDLE),
    new Array(15).fill(TileName.WATER_MIDDLE_MIDDLE),
  ];

  const sandMap = [
    [],
    [],
    [],
    [null, TileName.SAND_TOP_LEFT,    ...new Array(11).fill(null), TileName.SAND_TOP_RIGHT],
    [null, TileName.SAND_MIDDLE_LEFT, ...new Array(11).fill(null), TileName.SAND_MIDDLE_RIGHT],
    [null, TileName.SAND_MIDDLE_LEFT, ...new Array(11).fill(null), TileName.SAND_MIDDLE_RIGHT],
    [null, TileName.SAND_MIDDLE_LEFT, ...new Array(11).fill(null), TileName.SAND_MIDDLE_RIGHT],
    [null, TileName.SAND_MIDDLE_LEFT, ...new Array(11).fill(TileName.SAND_MIDDLE_MIDDLE), TileName.SAND_MIDDLE_RIGHT],
    [null, TileName.SAND_BOTTOM_LEFT, ...new Array(11).fill(TileName.SAND_BOTTOM_MIDDLE), TileName.SAND_BOTTOM_RIGHT],
  ]

  const elevationMap = [
    [],
    [],
    [],
    [],
    [],
    [],
    [null, null, TileName.ELEVATION_BOTTOM_LEFT, ...new Array(9).fill(TileName.ELEVATION_BOTTOM_MIDDLE), TileName.ELEVATION_BOTTOM_RIGHT],
    [null, null, TileName.ELEVATION_EDGE_LEFT,   ...new Array(9).fill(TileName.ELEVATION_EDGE_MIDDLE),   TileName.ELEVATION_EDGE_RIGHT],
  ];

  const groundMap = [
    [],
    [],
    [null, null, TileName.GROUND_TOP_LEFT,    ...new Array(9).fill(TileName.GROUND_TOP_MIDDLE),    TileName.GROUND_TOP_RIGHT],
    [null, null, TileName.GROUND_MIDDLE_LEFT, ...new Array(9).fill(TileName.GROUND_MIDDLE_MIDDLE), TileName.GROUND_MIDDLE_RIGHT],
    [null, null, TileName.GROUND_MIDDLE_LEFT, ...new Array(9).fill(TileName.GROUND_MIDDLE_MIDDLE), TileName.GROUND_MIDDLE_RIGHT],
    [null, null, TileName.GROUND_MIDDLE_LEFT, ...new Array(9).fill(TileName.GROUND_MIDDLE_MIDDLE), TileName.GROUND_MIDDLE_RIGHT],
    [null, null, TileName.GROUND_BOTTOM_LEFT, ...new Array(9).fill(TileName.GROUND_BOTTOM_MIDDLE), TileName.GROUND_BOTTOM_RIGHT],
  ];

  onMount(async () => {
    const scene = new Scene({ tileSize: 64, scale: 1 });

    await scene.renderLayer(waterMap);
    await scene.renderLayer(sandMap);
    await scene.renderLayer(elevationMap);
    await scene.renderLayer(groundMap);
  });
</script>

<div>
  <canvas id="canvas" width="1000" height="700"></canvas>
</div>
