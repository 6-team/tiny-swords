<script lang="ts">
  import { onMount } from "svelte";


  onMount(() => {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const context = canvas.getContext('2d');

    console.log(canvas, context)
  });
</script>

<div>
  <canvas id="canvas" width="800" height="400"></canvas>
</div>
