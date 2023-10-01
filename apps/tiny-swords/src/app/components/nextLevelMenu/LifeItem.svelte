<script lang="ts">
  import { nextLevelMenu } from "../../store/store";

  export let createNewLevel: () => void;

  function next() {
    createNewLevel();
    nextLevelMenu.set(false)
  }

</script>

<div class="next-level-menu">
  <div class="power-up-wrapper">
    <div class="power-up">
      <div class="power-up__ribbon">
        <img class="power-up__ribbon-img" src="../../../public/img/UI/Ribbon_Blue_3Slides_1.png" alt="ribbon-img"/>
        <span class="power-up__ribbon-text">Жизнь</span>
      </div>
      <div class="power-up__banner">
        <img class="power-up__banner-img" src="../../../public/img/UI/Banner_Connection_Down.png" alt="banner-img"/>
        <div class="power-up__sign">
          <img class="power-up__sign-img" src="../../../public/img/UI/1.png" alt="item-img"/>
          <img class='power-up__lock' src="../../../public/img/UI/Regular_10.png" alt="lock-img"/>
        </div>
        <div class="power-up__price">
          <img class="power-up__price-img" src="../../../public/img/Resources/W_small_Idle.png" alt="resources-img"/>
          <span class="power-up__price-count">2500</span>
        </div>
      </div>
    </div>
  </div>
  <button class="button next-level-menu__next" on:click={()=>next()}>
    <span class="button__text">Далее</span>
  </button>
</div>

<style lang="scss">
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

    &__next {
      position: absolute;
      bottom: 76px;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  .power-up-wrapper {
    padding: 0 20px;
  }

  .power-up {
    position: relative;
    box-sizing: border-box;
    width: 132px;

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
</style>
