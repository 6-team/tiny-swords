<script>
  import { Router, links, Route } from "svelte-routing";

  import WFC from "./generator/WFC.svelte";
</script>

<div use:links>
  <Router url="">
    <Route path="/" component={WFC} />
  </Router>
</div>
