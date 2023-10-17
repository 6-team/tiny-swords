<script lang="ts">
  import {Button} from '../../components'
  export let onClick: () => void;
  export let isMultiplayer: boolean;
</script>

<div>
  <div class="overlay"></div>
  <div class="wrapper">
    <div class="container">
      <div class="dead">
        <img class="dead__sign" src="/img/Factions/Dead.gif" alt="Dead" />
        <div class="dead__text">Вы пали смертью храбрых!</div>
      </div>
      <div class="button-container">
        <Button title={isMultiplayer ? "Продолжить" : "Новая игра"} onClick={onClick} />
      </div>
    </div>
  </div>
</div>


<style lang="scss">
  .wrapper {
    width: 560px;
    position: absolute;
    aspect-ratio: 4 / 3;
    left: 50%;
    top: 120px;
    background: url('/img/UI/level_results.png') center center /contain no-repeat;
    transform: translateX(-50%);
    padding: 50px;
  }

  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 100%;
  }

  .overlay {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0,0,0, 0.5);
  }

  .dead {
    display: flex;
    flex-direction: column;
    align-items: center;

    &__sign {
      width: 200px;
      margin-right: 20px;
    }

    &__text {
      font-family: "Vinque", serif;
      font-size: 32px;
    }
  }

  .button-container {
    margin-bottom: 20px;
  }

</style>
