<script>
    import LifeItem from "./LifeItem.svelte";
</script>

<div style="height:60%; width:1300px; backgroundColor: 'rgba(71, 171, 169, 1);' position: absolute; left: 50%; top: 120px; transform: translateX(-50%);" class="next-level-menu-wrapper">
    <LifeItem />
</div>

<style>
    .next-level-menu-wrapper {
      height: 60%; 
      width:1300px; 
      background-color: rgba(71, 171, 169, 1);
      position: absolute; 
      left: 50%; 
      top: 120px; 
      transform: translateX(-50%);
      padding: 50px;
    }
</style>