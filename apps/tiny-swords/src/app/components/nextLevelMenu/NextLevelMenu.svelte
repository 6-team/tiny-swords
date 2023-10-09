<script lang="ts">
    import UpgradeItem from "./UpgradeItem.svelte";
    import { nextLevelMenu } from "../../store/store";
    import { ResourcesType } from "../../entities/resource";

    export let createNewLevel: () => void;
    export let buyImprovements: (resource: { type: ResourcesType; price: number }, type: string) => void;
    export let availableResourcesCheck: (resource: { type: ResourcesType, price: number}) => boolean;

    function next() {
        createNewLevel();
        nextLevelMenu.set(false)
    }

    const items = [
        {name: "Жизнь", type: 'life', cost: {type: ResourcesType.WOOD, price: 1}, icon: '../../../public/img/UI/1.png'},
        {name: "Жизнь", type: 'life', cost: {type: ResourcesType.GOLD, price: 100}, icon: '../../../public/img/UI/1.png'},
        {name: "Щит", type: 'shield',cost: {type: ResourcesType.GOLD, price: 300}, icon: '../../../public/img/UI/shield.png', styles: {icon_wrapper: 'top: 34%'}},
        {name: "Оружие", type: 'archer_bow',cost: {type: ResourcesType.WOOD, price: 20}, icon: '../../../public/img/UI/archer_bow.png', styles: {icon: 'scale: 1.2'}},
        {name: "Помощник", type: 'archer',cost: {type: ResourcesType.GOLD, price: 1000}, icon: '../../../public/img/UI/archer.png', styles: {icon: 'scale: 1.2'}},
        {name: "Динамит", type: 'tnt',cost: {type: ResourcesType.WOOD, price: 30}, icon: '../../../public/img/UI/tnt.png',styles: {icon_wrapper: 'top: 32%'}},
    ]
</script>

<div>
    <div class="overlay"></div>
    <div class="next-level-menu-wrapper">
        <div class="next-level-menu">
            {#each items as item}
                
                <UpgradeItem  {buyImprovements} {availableResourcesCheck} {item}/>
            {/each}
            <button class="button next-level-menu__next" on:click={()=>next()}>
                <span class="button__text">Далее</span>
            </button>
        </div>
    </div>
</div>

<style lang="scss">
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

    .button {
        position: relative;
        font-size: 16px;
        background: no-repeat url(img/UI/Button_Blue_3Slides_Pressed.png);
        background-size: cover;
        width: fit-content;
        font-family: "Vinque", serif;
        width: 128px;
        height: 43px;
        border: none;
        padding: 0;
        border: none;
        color: #000;

    &__text {
        position: absolute;
        top: 20%;
        left: 50%;
        font-family: "Vinque", serif;
        font-size: 16px;
        transform: translate(-50%, 0);
        text-wrap: nowrap;
    }

    &:hover{
        background: no-repeat url(img/UI/Button_Blue_3Slides.png);
        background-size: cover;

        .button__text {
            top: 15%
        }
    }
}

    .next-level-menu {
    display: flex;
    justify-content: flex-start;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-row-gap: 1em;

    &__next {
        position: absolute;
        bottom: 76px;
        left: 50%;
        transform: translateX(-50%);
    }
}
</style>
