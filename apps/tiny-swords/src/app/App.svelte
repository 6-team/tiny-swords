<script>
  import { Router, links, Route } from "svelte-routing";

  import WFC_ref from "./generator/WFC_ref.svelte";
</script>

<div use:links>
  <Router url="">
    <Route path="/" component={WFC_ref} />
  </Router>
</div>
