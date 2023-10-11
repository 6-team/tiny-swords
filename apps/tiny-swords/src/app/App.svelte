<script>

  import Generator from "./generator/Generator.svelte";
</script>

<Generator />

<style>
  :global(*) {
    font-family: "vinqueregular", serif;
    cursor: url('/img/UI/01.png') 20 20, auto !important;
  }
  :global(body) {
  background-color: rgba(71, 171, 169, 1);
}
@font-face {
		font-family: 'Vinque';
		src:  url("/fonts/vinque_rg.otf") format("opentype");
		font-style: normal;
	}
</style>
