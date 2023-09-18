<script>
  import { nextLevelMenu } from "../../store/store";
</script>

<div>
  <div class="item-wrapper">
    <div class="ribbon">
      <img src="../../../public/img/UI/Ribbon_Blue_3Slides_1.png" width="120" alt="ribbon-img"/>
      <span class="ribbon-text">Жизнь</span>
    </div>
    <div class="banner">
      <img class="banner_img" src="../../../public/img/UI/Banner_Connection_Down.png" width="120" alt="banner-img"/>
      <div class="element">
        <img src="../../../public/img/UI/1.png" width="40" height="40" alt="item-img"/>
        <img class='lock' src="../../../public/img/UI/Regular_10.png" width="20" height="20" alt="lock-img"/>
      </div>
      <div class="price">
        <img src="../../../public/img/Resources/W_small_Idle.png" width="20" alt="resources-img"/>
        <span class="price-count">2500</span>
      </div>
    </div>
  </div>
  <button class="next-btn" on:click={()=>nextLevelMenu.set(false)}>
    <span class="text-btn">Далее</span>
  </button>
</div>

<style lang="scss">
  .next-btn {
    position: absolute;
    top: calc(100% - 50px);
    left: calc(100% - 115px);
    transform: translate(-100%, -100%);
    font-size: 16px;
    background: no-repeat url(img/UI/Button_Blue_3Slides_Pressed.png);
    background-size: cover;
    width: fit-content;
    font-family: "Vinque", serif;
    background-color: inherit;
    width: 128px;
    height: 43px;
    border: none;
    padding: 0;
    border: none;
    font: inherit;
    color: #000;

    .text-btn {
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
      width: fit-content;
      font-family: "Vinque", serif;
      background-color: inherit;
      width: 128px;
      height: 43px;
      
      .text-btn {
        top:15%
      }
    }
  }
  
  .item-wrapper {
    // opacity: 0.7;
    padding: 0 65px;
    &:hover {
      opacity: 1;
    }
  }
  
  .ribbon {
    display: flex;
    position: absolute;
    & span {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 3px;
    font-family: "Vinque", serif;
    }
  }
  
  .banner {
    position: absolute;
    & img.banner_img {
    position: absolute;
    top: -5px;
    }
  }

  .price {
    position: absolute;
    top: 95px;
    left: 30px;
    font-family: "Vinque" serif;
    display: flex;
    & span.price-count {
      font-size: 14px;
      font-family: "Vinque", serif;
    }
  } 
  
  .element {
    position: absolute;
    top: 40px;
    left: 40px;
    opacity: 0.5;
      & img.lock {
      position: absolute;
      top: 16%;
      left: 25%;
    }
  }
  </style>