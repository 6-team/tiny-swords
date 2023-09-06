<script lang="ts">
  import { onMount } from "svelte";
  import { Scene } from '../entites/scene/scene';
  import { TileName } from "../entites/scene/scene.const";
  import { WFC } from "../tools/wfc/wfc"
  import { RULES, TILE_TYPES } from "../tools/wfc/wfc.const"

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
  const map = wfc.map();

  onMount(async () => {
    const scene = new Scene({ tileSize: 64, scale: 0.75 });

    // await scene.renderLayer(waterMap);
    await scene.renderLayer(map);
  });
</script>

<div style='position: relative'>
  <canvas id="canvas" width="960" height="720"></canvas>
</div>
