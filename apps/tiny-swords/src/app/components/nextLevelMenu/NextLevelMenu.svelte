<script lang="ts">
    import LifeItem from "./LifeItem.svelte";

    export let createNewLevel: () => void;
</script>

<div>
    <div class="overlay"></div>
    <div class="next-level-menu-wrapper">
        <LifeItem {createNewLevel} />
    </div>
</div>

<style>
    .next-level-menu-wrapper {
        width: 560px;
        position: absolute;
        aspect-ratio: 4 / 3;
        left: 50%;
        top: 120px;
        background: url('img/UI/level_results.png') center center /contain no-repeat;
        transform: translateX(-50%);
        padding: 50px;
    }

    .overlay {
        height: 100%;
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background-color: rgba(0,0,0, 0.5);
    }
</style>
