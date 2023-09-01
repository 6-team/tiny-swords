<script>
  import { Router, links, Route } from "svelte-routing";

  import Generator from "./generator/Generator.svelte";
  import MainMenu from "./mainMenu/MainMenu.svelte";
</script>

<div use:links>
  <Router url="">
    <!-- <Route path="/" component={Generator} /> -->
    <Route path="/" component={MainMenu} />
  </Router>
</div>
