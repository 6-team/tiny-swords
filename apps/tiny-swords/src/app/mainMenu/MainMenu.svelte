<script lang="ts">
  import { navigate } from "svelte-routing";
  import Modal from '../Modals/Modal.svelte';
  import { isActiveCloseButton, isActiveMenuItem } from './store'

  let showModal = false;
  let menuLink = [
    {title: 'Новая игра', value: 'generator'}, 
    {title: 'Продолжить', value: 'continue'},
    {title: 'Сетевая игра', value: 'multi-player'}
  ];

  let menuIndex = 0
  let activeItem = ''
    
  function handleClick(item: string):void {
    if(item === 'multi-player') {
      showModal = true
    }else{
      navigate(`/${item}`)
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
  const expandedBg = expandBg(bgTiles, menuLink.length)

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
 
  isActiveMenuItem.subscribe( value => activeItem = value)

  </script>


    <div class="wrapper">
      <!-- <Router>   -->
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
              <button class={`menu-btn ${activeItem === value ? 'active': ''}`} on:click={()=>handleClick(value)}>
                <span class="menu-title"> {title}</span>
              </button>
            {/each}
          </div>
        </div>
        <img src="https://img.itch.zone/aW1nLzEwNDkxNTQ1LmdpZg==/original/k%2BhWls.gif" alt="main-menu"/>
      <!-- </Router> -->
    </div>

<Modal bind:showModal isActiveCloseButtonStore={isActiveCloseButton}>
  Hello
</Modal>

<style lang="scss">
  div.wrapper {
    height: 100vh;
    max-width: 100%;
    text-align: center;
    width: auto;
    position: relative;
    min-height: 788px;
    max-width: 1000px;
    margin: 0 auto;

    img {
    max-width: 100%;
  }
    .menu-wrapper {
      display: flex;
      justify-content: center;
      flex-direction: column;
      position: absolute;
      top: 51%;
      left: 50%;
      transform: translate(-50%,-50%);
      button {
      font-size: 16px;
      background: no-repeat url(img/UI/Button_Blue_3Slides_Pressed.png);
      background-size: cover;
      width: fit-content;
      font-family: "Vinque", serif;
      background-color: inherit;
      width: 128px;
      height: 43px;
      border: none;
      position: relative;
      padding: 0;
      border: none;
      font: inherit;
      color: #000;
      .menu-title {
        position: absolute;
        top: 20%;
        left: 50%;
        font-family: "Vinque", serif;
        font-size: 16px;
        transform: translate(-50%, 0);
        text-wrap: nowrap;
    }

   &.active, &:hover {
        background: no-repeat url(img/UI/Button_Blue_3Slides.png);
        background-size: cover;
        width: fit-content;
        font-family: "Vinque", serif;
        background-color: inherit;
        width: 128px;
        height: 43px;
        
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
        justify-content: center;
      }
    }
  }

  </style>
<svelte:window on:keydown|preventDefault={keyboardHandler} />