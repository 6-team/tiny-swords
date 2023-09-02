<script lang="ts">
  import { onMount } from "svelte";
  import { Scene } from '../entites/scene/scene';
  import {generate} from "./generate";

  onMount(async () => {
    const scene = new Scene({ tileSize: 64, scale: 0.75 });

    const vector = generate()
    await scene.renderLayer(vector);
  });
</script>

<div>
  <canvas id="canvas" width="960" height="720"></canvas>
</div>
