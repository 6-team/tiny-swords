<script>
  import { Router, links, Route } from "svelte-routing";

  import Generator from "./generator/Generator.svelte";
</script>

<div use:links>
  <Router url="">
    <Route path="/" component={Generator} />
  </Router>
</div>
