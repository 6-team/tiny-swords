<script lang="ts">
  import { onMount } from "svelte";
  import { Scene } from '../entites/scene/scene';
  import {generate} from "./generate";

  let scene = null;


  const clickAction = async () => {
    await scene.renderLayer(generate());
  }

  onMount(async () => {
    scene = new Scene({ tileSize: 64, scale: 0.75 });
    await scene.renderLayer(generate());
  });
</script>

<div>
  <canvas id="canvas" width="960" height="720"></canvas>

  <button on:click={clickAction}>Re Render</button>
</div>
