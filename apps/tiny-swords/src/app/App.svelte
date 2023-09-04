<script>
  import { Router, links, Route } from "svelte-routing";

  import Generator from "./generator/Generator.svelte";
  import MainMenu from "./mainMenu/MainMenu.svelte";
</script>

<div use:links>
  <Router url="">
    <!-- <Route path="/" component={Generator} /> -->
    <Route path="/" component={MainMenu} />
    <Route path="/generator" component={Generator} />
  </Router>
</div>

<style>
  :global(*) {
    font-family: "vinqueregular", serif;
    cursor: url('images/01.png') 20 20, auto !important;
  }
  :global(body) {
  background-color: rgba(71, 171, 169, 1);
}
@font-face {
		font-family: 'Vinque';
		src:  url("fonts/vinque_rg.otf") format("opentype");
		font-style: normal;
	}
</style>