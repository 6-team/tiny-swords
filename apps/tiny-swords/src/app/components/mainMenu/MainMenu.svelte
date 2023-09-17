<script lang="ts">
  // получить экшены кнопок и передать в handleClick
  import Modal from '../../modals/Modal.svelte';
  import { isActiveCloseButton, isActiveMenuItem, isMainMenu } from '../../store/store';

  let showModal = false;
  let menuIndex = 0;
  let activeItem = '';

  let menuLink = [
    {title: 'Новая игра', value: 'generator'}, 
    {title: 'Сетевая игра', value: 'multi-player'}
  ];

 
  function handleClick(item: string):void {
    switch (item) {
      case 'multi-player':
        console.log('start multiplayer game');
        isMainMenu.set(false);
        break;
      case 'generator':
        console.log('start single game');
        isMainMenu.set(false);
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
      menuIndex = (menuIndex + 1) % menuLinkLength;
      break;

    case 'ArrowUp':
      menuIndex = (menuIndex - 1 + menuLinkLength) % menuLinkLength;
      break;

    case 'Escape':
      isActiveMenuItem.set('');
      return;

    case 'Enter':
      handleClick(activeItem);
      break;
  }

  isActiveMenuItem.set(menuLink[menuIndex].value);
}
 
  isActiveMenuItem.subscribe( value => activeItem = value);

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
              <button class={`menu-btn ${activeItem === value ? 'active': ''}`} on:click={()=>handleClick(value)} on:mouseenter={()=> isActiveMenuItem.set(value)} on:mouseleave={()=>isActiveMenuItem.set('') }>
                <span class="menu-title"> {title}</span>
              </button>
            {/each}
          </div>
        </div>
    </div>
    
<Modal bind:showModal isActiveCloseButtonStore={isActiveCloseButton}>
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