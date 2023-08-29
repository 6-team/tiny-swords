<script lang="ts">
  import { onMount } from "svelte";
  import { Scene } from '../entites/scene/scene';
  import { TileName } from "../entites/scene/scene.const";

  const waterMap = [
    [TileName.WATER_MIDDLE_MIDDLE, TileName.WATER_MIDDLE_MIDDLE, TileName.WATER_MIDDLE_MIDDLE, TileName.WATER_MIDDLE_MIDDLE, TileName.WATER_MIDDLE_MIDDLE, TileName.WATER_MIDDLE_MIDDLE],
    [TileName.WATER_MIDDLE_MIDDLE, TileName.WATER_MIDDLE_MIDDLE, TileName.WATER_MIDDLE_MIDDLE, TileName.WATER_MIDDLE_MIDDLE, TileName.WATER_MIDDLE_MIDDLE, TileName.WATER_MIDDLE_MIDDLE],
    [TileName.WATER_MIDDLE_MIDDLE, TileName.WATER_MIDDLE_MIDDLE, TileName.WATER_MIDDLE_MIDDLE, TileName.WATER_MIDDLE_MIDDLE, TileName.WATER_MIDDLE_MIDDLE, TileName.WATER_MIDDLE_MIDDLE],
    [TileName.WATER_MIDDLE_MIDDLE, TileName.WATER_MIDDLE_MIDDLE, TileName.WATER_MIDDLE_MIDDLE, TileName.WATER_MIDDLE_MIDDLE, TileName.WATER_MIDDLE_MIDDLE, TileName.WATER_MIDDLE_MIDDLE],
    [TileName.WATER_MIDDLE_MIDDLE, TileName.WATER_MIDDLE_MIDDLE, TileName.WATER_MIDDLE_MIDDLE, TileName.WATER_MIDDLE_MIDDLE, TileName.WATER_MIDDLE_MIDDLE, TileName.WATER_MIDDLE_MIDDLE],
    [TileName.WATER_MIDDLE_MIDDLE, TileName.WATER_MIDDLE_MIDDLE, TileName.WATER_MIDDLE_MIDDLE, TileName.WATER_MIDDLE_MIDDLE, TileName.WATER_MIDDLE_MIDDLE, TileName.WATER_MIDDLE_MIDDLE],
    [TileName.WATER_MIDDLE_MIDDLE, TileName.WATER_MIDDLE_MIDDLE, TileName.WATER_MIDDLE_MIDDLE, TileName.WATER_MIDDLE_MIDDLE, TileName.WATER_MIDDLE_MIDDLE, TileName.WATER_MIDDLE_MIDDLE],
    [TileName.WATER_MIDDLE_MIDDLE, TileName.WATER_MIDDLE_MIDDLE, TileName.WATER_MIDDLE_MIDDLE, TileName.WATER_MIDDLE_MIDDLE, TileName.WATER_MIDDLE_MIDDLE, TileName.WATER_MIDDLE_MIDDLE],
  ];

  const elevationMap = [
    [],
    [],
    [null, TileName.ELEVATION_TOP_LEFT,    TileName.ELEVATION_TOP_RIGHT],
    [null, TileName.ELEVATION_BOTTOM_LEFT, TileName.GROUND_MIDDLE_MIDDLE,     TileName.ELEVATION_HORIZONTAL_RIGHT],
    [null, TileName.ELEVATION_EDGE_LEFT,   TileName.GROUND_VERTICAL_MIDDLE,   TileName.ELEVATION_EDGE_RIGHT,                           null],
    [null, null,                           TileName.ELEVATION_VERTICAL_BOTTOM],
    [null, null,                           TileName.ELEVATION_VERTICAL_EDGE]
  ];

  const sandMap = [
    [],
    [null, null, TileName.SAND_TOP_LEFT,    TileName.SAND_TOP_RIGHT],
    [null, null, TileName.SAND_MIDDLE_LEFT, TileName.SAND_MIDDLE_RIGHT],
    [null, null, null,                      TileName.SAND_BOTTOM_RIGHT]
  ]

  const groundMap = [
    [],
    [],
    [null, TileName.GROUND_TOP_LEFT,    TileName.GROUND_TOP_RIGHT],
    [null, TileName.GROUND_BOTTOM_LEFT, TileName.GROUND_MIDDLE_MIDDLE,   TileName.GROUND_HORIZONTAL_RIGHT],
    [null, null,                        TileName.GROUND_VERTICAL_MIDDLE],
    [null, null,                        TileName.GROUND_VERTICAL_BOTTOM]
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
  <canvas id="canvas" width="800" height="500"></canvas>
</div>
