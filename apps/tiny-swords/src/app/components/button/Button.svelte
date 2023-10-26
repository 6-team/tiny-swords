<script lang="ts">
  export let onClick: () => void
  export let onMouseEnter: () => void;
  export let onMouseLeave: () => void;
  export let title: string = null;
  export let className: string = ""
</script>

<button class={`btn ${className}`} on:click={onClick} on:mouseenter={onMouseEnter} on:mouseleave={onMouseLeave}>
  <span class="btn__title">{title}</span>
</button>

<style lang="scss">
  .btn {
    background: no-repeat url(/img/UI/Button_Blue_3Slides_Pressed.png) center center /cover;
    width: 128px;
    height: 43px;
    position: relative;
    border: none;

    &__title {
      position: absolute;
      top: 20%;
      left: 50%;
      font-family: "Vinque", serif;
      font-size: 16px;
      transform: translate(-50%, 0);
      white-space: nowrap;
    }

    &.active, &:hover {
      background: no-repeat url(/img/UI/Button_Blue_3Slides.png);
      background-size: cover;

      .btn__title {
        top:15%
      }
    }
  }
</style>
