<script lang="ts">
  import { ResourcesType } from "../../entities/resource";
  export let buyImprovements: (resource: {[K in ResourcesType]?: number}) => void;
  export let availableResourcesCheck: (resource: {[K in ResourcesType]?: number}) => boolean;
  

  const lifeData = {name: "Жизнь", cost: {[ResourcesType.WOOD]: 3} }
  let isEnoughResources = availableResourcesCheck(lifeData.cost);
  
</script>
  
  
  <div class="power-up-wrapper">
    <button class="power-up" class:available={isEnoughResources} on:click={()=>buyImprovements(lifeData.cost)}>
      <div class="power-up__ribbon">
        <img class="power-up__ribbon-img" src="../../../public/img/UI/Ribbon_Blue_3Slides_1.png" alt="ribbon-img"/>
        <span class="power-up__ribbon-text">{lifeData.name}</span>
      </div>
      <div class="power-up__banner">
        <img class="power-up__banner-img" src="../../../public/img/UI/Banner_Connection_Down.png" alt="banner-img"/>
        <div class="power-up__sign">
          <img class="power-up__sign-img" src="../../../public/img/UI/1.png" alt="item-img"/>
          {#if !isEnoughResources}
            <img class='power-up__lock' src="../../../public/img/UI/Regular_10.png" alt="lock-img"/>
          {/if}
        </div>
        <div class="power-up__price">
          <img class="power-up__price-img" src="../../../public/img/Resources/W_Idle.png" alt="resources-img"/>
          <span class="power-up__price-count">{Object.values(lifeData.cost)[0]}</span>
        </div>
      </div>
    </button>
  </div>


<style lang="scss">
  .power-up-wrapper {
    padding: 0 20px;
  }

  .power-up {
    position: relative;
    box-sizing: border-box;
    width: 132px;
    border: none;
    background: inherit;

    &__ribbon {
      display: flex;
      top: 8px;
      left: 0;
      right: 0;
      position: absolute;
      z-index: 1;
    }

    &__ribbon-img {
      width: 103%; // 3%, пока у картинки есть непонятный отступ справа
    }

    &__ribbon-text {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: 3px;
      font-family: "Vinque", serif;
    }

    &__banner {
      position: relative;
      width: 90%;
      margin: 0 auto;
    }

    &__banner-img {
      width: 100%;
    }

    &__sign {
      position: absolute;
      top: 38%;
      left: 50%;
      width: 40px;
      transform: translateX(-50%);
      opacity: 0.5;
    }

    &__sign-img {
      width: 100%;
    }

    &__lock {
      position: absolute;
      top: 40%;
      left: 50%;
      width: 40%;
      transform: translate(-50%, -50%);
    }

    &__price {
      position: absolute;
      bottom: 5px;
      left: 50%;
      display: flex;
      transform: translateX(-50%);
    }

    &__price-img {
      width: 20px;
      margin-left: -2px;
    }

    &__price-count {
      font-size: 14px;
      font-family: "Vinque", serif;
    }
  }
  .power-up.available {
    &:hover {
      .power-up__sign {
        opacity: 1;
      }
    }
  }
</style>
