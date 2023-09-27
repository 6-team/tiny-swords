<script lang="ts">
  import Modal from '../../modals/Modal.svelte';
  import { isActiveCloseButtonStore, isActiveMenuItemStore, isMainMenuStore, isMuttedStore } from '../../store/store';
  import {Sounds, SystemSoundsType} from '../../core/sounds'

  let showModal = false;
  let menuIndex = 0;
  let isActiveMenuItem = '';

  export let initGame: () => void;
  export let connectToMultipleGame: () => void;

  let menuLink = [
    {title: 'Новая игра', value: 'generator'},
    {title: 'Сетевая игра', value: 'multi-player'}
  ];



  const menuSound = new Sounds()
  menuSound.addSound(SystemSoundsType.START_GAME, 'sounds/sword.mp3')
  menuSound.addSound(SystemSoundsType.MENU_CLICK, 'sounds/click.mp3')

  isMuttedStore.subscribe( value => {
    if(value) {
      menuSound.muteSound()
    } else {
      menuSound.unmuteSound()
    }
  })

  function handleClick(item: string):void {
    menuSound.playSound(SystemSoundsType.START_GAME);
    switch (item) {
      case 'multi-player':
        isMainMenuStore.set(false);
        connectToMultipleGame();
        break;
      case 'generator':
        isMainMenuStore.set(false);
        initGame();
        break;
      default:
        console.log('other option');
        break;
    }
  }

  const bgTiles = [
    ["img/UI/cut_layout/1.png","img/UI/cut_layout/2.png","img/UI/cut_layout/3.png"],
    ["img/UI/cut_layout/4.png","img/UI/cut_layout/5.png","img/UI/cut_layout/6.png"],
    ["img/UI/cut_layout/7.png","img/UI/cut_layout/8.png","img/UI/cut_layout/9.png"]
  ]

  function expandBg(bgTiles: Array<Array<string>>, count:number):Array<Array<string>> {
    const createTile = (row:number):Array<string> => ([bgTiles[row][0], bgTiles[row][1], bgTiles[row][1], bgTiles[row][2]]);
    let result = [];

    if (count === 1) {
      result.push(createTile(0), createTile(2));
    } else if (count > 1) {
      result.push(createTile(0));

    for (let j = 0; j < count - 1; j++) {
      result.push(createTile(1));
    }

    result.push(createTile(2));
  }

  return result;
}
  const expandedBg = expandBg(bgTiles, menuLink.length);

  function keyboardHandler(e: KeyboardEvent): void {
  const menuLinkLength = menuLink.length;

  switch (e.code) {
    case 'ArrowDown':
      menuSound.playSound(SystemSoundsType.MENU_CLICK)
      menuIndex = (menuIndex + 1) % menuLinkLength;
      break;
      
    case 'ArrowUp':
      menuSound.playSound(SystemSoundsType.MENU_CLICK)
      menuIndex = (menuIndex - 1 + menuLinkLength) % menuLinkLength;
      break;

    case 'Escape':
      isActiveMenuItemStore.set('');
      return;

    case 'Enter':
      handleClick(isActiveMenuItem);
      break;
  }

  isActiveMenuItemStore.set(menuLink[menuIndex].value);
}

  isActiveMenuItemStore.subscribe( value => isActiveMenuItem = value);

  </script>

    <div class="wrapper">
        <div class="background-substrate">
          {#each expandedBg as row }
            <div class="bg-row">
              {#each row as col }
                <img src={col} alt='bg-tile'/>
              {/each}
            </div>
          {/each}
          <div class="menu-wrapper">
            {#each menuLink as { title, value } }
              <button class={`menu-btn ${isActiveMenuItem === value ? 'active': ''}`} on:click={()=>handleClick(value)} on:mouseenter={()=> {
                menuSound.playSound(SystemSoundsType.MENU_CLICK)
                isActiveMenuItemStore.set(value)
              }} on:mouseleave={()=>isActiveMenuItemStore.set('') }>
                <span class="menu-title"> {title}</span>
              </button>
            {/each}
          </div>
        </div>
    </div>

<Modal bind:showModal isActiveCloseButtonStore={isActiveCloseButtonStore}>
</Modal>

<style lang="scss">
  div.wrapper {
    .menu-wrapper {
      position: absolute;
      top: 51%;
      left: 50%;
      transform: translate(-50%,-50%);

      button {
      background: no-repeat url(img/UI/Button_Blue_3Slides_Pressed.png);
      background-size: cover;
      width: 128px;
      height: 43px;
      position: relative;
      border: none;

      .menu-title {
        position: absolute;
        top: 20%;
        left: 50%;
        font-family: "Vinque", serif;
        font-size: 16px;
        transform: translate(-50%, 0);
        text-wrap: nowrap;
      }

      &.active {
        background: no-repeat url(img/UI/Button_Blue_3Slides.png);
        background-size: cover;

        .menu-title {
          top:15%
        }
      }
    }
  }

  .background-substrate {
    position: absolute;
    left: 50%;
    top: 62%;
    transform: translate(-50%, 0);

    .bg-row {
      display: flex;
    }
  }
}
</style>

<svelte:window on:keydown|preventDefault={keyboardHandler} />
