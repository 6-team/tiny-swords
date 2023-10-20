<script lang="ts">
    import UpgradeItem from "./UpgradeItem.svelte";
    import { nextLevelMenu } from "../../store/store";
    import { ResourcesType } from "../../entities/resource";
    import {Button} from '../Button'
    import {  type ImprovementItemType, ImprovementTypes, type availableResourcesCheckType, type buyImprovementsType } from "../../common/common.types";

  export let createNewLevel: () => void;
    export let buyImprovements: buyImprovementsType;
    export let availableResourcesCheck: availableResourcesCheckType;

    function next() {
        createNewLevel();
        nextLevelMenu.set(false)
    }

    const items: Array<ImprovementItemType> = [
        {name: "Жизнь", type: ImprovementTypes.LIFE, cost: {type: ResourcesType.WOOD, price: 1}, icon: './img/UI/1.png', available: true},
        {name: "Слот", type: ImprovementTypes.LIFE_SLOT, cost: {type: ResourcesType.GOLD, price: 100}, icon: './img/UI/Regular_10.png', available: true},
        {name: "Щит", type: ImprovementTypes.SHIELD, cost: {type: ResourcesType.GOLD, price: 300}, icon: './img/UI/shield.png', styles: {icon_wrapper: 'top: 34%'}, available: false },
        {name: "Оружие", type: ImprovementTypes.ARCHER_BOW, cost: {type: ResourcesType.WOOD, price: 20}, icon: './img/UI/archer_bow.png', styles: {icon: 'scale: 1.2'}, available: false },
        {name: "Помощник", type: ImprovementTypes.ARCHER, cost: {type: ResourcesType.GOLD, price: 1000}, icon: './img/UI/archer.png', styles: {icon: 'scale: 1.2'}, available: false },
        {name: "Динамит", type: ImprovementTypes.TNT, cost: {type: ResourcesType.WOOD, price: 30}, icon: './img/UI/tnt.png',styles: {icon_wrapper: 'top: 32%'}, available: false },
    ]
</script>

<div>
    <div class="overlay"></div>
    <div class="next-level-menu-wrapper">
        <div class="next-level-menu">
            {#each items as item}
                <UpgradeItem  {buyImprovements} {availableResourcesCheck} {item}/>
            {/each}
        </div>
      <div class="next-level-menu__btn-container">
        <Button title="Далее" onClick={next} />
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
    background: url('/img/UI/level_results.png') center center /contain no-repeat;
    transform: translateX(-50%);
    padding: 50px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }

  .overlay {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0,0,0, 0.5);
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
    background: no-repeat url(/img/UI/Button_Blue_3Slides_Pressed.png);
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
      background: no-repeat url(/img/UI/Button_Blue_3Slides.png);
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

    &__btn-container {
      margin-bottom: 20px;
    }
  }

</style>
