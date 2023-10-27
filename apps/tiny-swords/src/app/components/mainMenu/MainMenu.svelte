<script lang="ts">
  import { isActiveMenuItemStore, isMainMenuStore, isMuttedStore } from '@store';
  import { Sounds, SystemSoundsType } from '@core/sounds'
  import { Button } from '@components'

  let menuIndex = 0;
  let isActiveMenuItem = '';

  export let initGame: () => void;
  export let connectToMultipleGame: () => void;

  let menuLink = [
    {title: 'Новая игра', value: 'generator'},
    {title: 'Сетевая игра', value: 'multi-player'}
  ];

  const menuSound = new Sounds()
  menuSound.addSound(SystemSoundsType.START_GAME, './sounds/sword.mp3')
  menuSound.addSound(SystemSoundsType.MENU_CLICK, './sounds/click.mp3')

  isMuttedStore.subscribe( value => {
    if(value) {
      menuSound.muteSound()
    } else {
      menuSound.unmuteSound()
    }
  })

  function handleClick(item: string):void {
    menuSound.playSound(SystemSoundsType.START_GAME, 0.3);
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

  const bgSprites = [
    ["./img/UI/cut_layout/1.png","./img/UI/cut_layout/2.png","./img/UI/cut_layout/3.png"],
    ["./img/UI/cut_layout/4.png","./img/UI/cut_layout/5.png","./img/UI/cut_layout/6.png"],
    ["./img/UI/cut_layout/7.png","./img/UI/cut_layout/8.png","./img/UI/cut_layout/9.png"]
  ]

  function expandBg(bgSprites: Array<Array<string>>, count:number):Array<Array<string>> {
    const createSprite = (row:number):Array<string> => ([bgSprites[row][0], bgSprites[row][1], bgSprites[row][1], bgSprites[row][2]]);
    let result = [];

    if (count === 1) {
      result.push(createSprite(0), createSprite(2));
    } else if (count > 1) {
      result.push(createSprite(0));

    for (let j = 0; j < count - 1; j++) {
      result.push(createSprite(1));
    }

    result.push(createSprite(2));
  }

  return result;
}
  const expandedBg = expandBg(bgSprites, menuLink.length);

  const playSystemSoundMenuClick = () =>  menuSound.playSound(SystemSoundsType.MENU_CLICK, 0.3)

  function keyboardHandler(e: KeyboardEvent): void {
  const menuLinkLength = menuLink.length;

  switch (e.code) {
    case 'ArrowDown':
      playSystemSoundMenuClick()
      menuIndex = (menuIndex + 1) % menuLinkLength;
      break;

    case 'ArrowUp':
      playSystemSoundMenuClick()
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
  <div class="container">
    <div class="background-substrate">
      {#each expandedBg as row }
        <div class="bg-row">
          {#each row as col }
            <img src={col} alt='bg-sprite'/>
          {/each}
        </div>
      {/each}
      <div class="menu-wrapper">
        {#each menuLink as { title, value } }
          <Button
            className={`${isActiveMenuItem === value ? 'active': ''}`}
            title={title}
            onClick={()=>handleClick(value)}
            onMouseEnter={() => {
              playSystemSoundMenuClick()
              isActiveMenuItemStore.set(value)
            }}
            onMouseLeave={() => isActiveMenuItemStore.set('')} />
        {/each}
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  div.wrapper {
    .container {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0,0,0, 0.5);
    }

    .menu-wrapper {
      position: absolute;
      top: 51%;
      left: 50%;
      transform: translate(-50%,-50%);
    }

    .background-substrate {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);

      .bg-row {
        display: flex;
      }
    }
  }
</style>

<svelte:window on:keydown={keyboardHandler} />
