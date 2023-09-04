<script>
    import Modal from '../Modals/Modal.svelte';
    import { Router, Link, Route } from "svelte-routing";
      import {isActiveCloseButton} from './store'
    let showModal = false;
    let menuLink = [{title: 'Новая игра', value: 'newGame'}, {title: 'Продолжить', value: 'continue'},{title: 'Сетевая игра', value: 'multiPlayer'}]
    function handleClick(e, item) {
      if(item === 'multiPlayer') {
        showModal = true
      }
    }
  </script>


    <div class="wrapper">
      <Router>  
      <div class="menu-wrapper">
            <div>
              {#each menuLink as { title, value } }
               <button class="menu-btn" on:click={(e)=>handleClick(e, value)}>
                <span class="menu-title"> {title}</span>
              </button>
            {/each}
            </div>
        </div>
        <img src="https://img.itch.zone/aW1nLzEwNDkxNTQ1LmdpZg==/original/k%2BhWls.gif" alt="main-menu"/>
      </Router>
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
  }
  div.wrapper img {
    max-width: 100%;
  }
  
  div.menu-wrapper {
    position: absolute;
    top: 75%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: no-repeat url(images/svg.svg);
    background-size: contain;
    width: 200px;
    height: 182px;
    display: flex;
    justify-content: center;
    padding-top: 17px;
  }
  button.menu-btn {
    position: relative;
    padding: 0;
    border: none;
    font: inherit;
    .menu-title {
      position: absolute;
    top: 15%;
    left: 50%;
    font-family: "Vinque", serif;
    font-size: 16px;
    transform: translate(-50%, 0);
    text-wrap: nowrap;

    }
  }
  
  div.menu-wrapper button {
    font-size: 16px;
    background: no-repeat url(images/Button_Blue_3Slides.png);
    background-size: cover;
    width: fit-content;
    font-family: "Vinque", serif;
    background-color: inherit;
    width: 128px;
    height: 43px;
  }
  div.menu-wrapper button:active {
    background: no-repeat url(images/Button_Blue_3Slides_Pressed.png);
    background-size: cover;
    width: fit-content;
    font-family: "Vinque", serif;
    background-color: inherit;
    width: 128px;
    height: 43px;
  }
  div.menu-wrapper button:active {
    .menu-title {
      top:20%
    }
    
  }
  </style>
