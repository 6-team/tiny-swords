<script>
    let menuLink = ['Новая игра', "Продолжить", 'Сетевая игра','Настройки']
    function handleClick(e){
        console.log(e)
    }
  </script>

<div class="container">
    <div class="wrapper">
        <div class="menu">
            {#each menuLink as item }
                <button on:click={handleClick}>{item}</button>
            {/each}
        </div>
        <img src="https://img.itch.zone/aW1nLzEwNDkxNTQ1LmdpZg==/original/k%2BhWls.gif" alt="main-menu"/>
    </div>
</div>

<style>
    :global(body) {
    background-color: rgba(71, 171, 169, 1);
    cursor: url("images/01.png"), auto;
  }
  div.wrapper {
    height: 100vh;
    max-width: 100%;
    text-align: center;
    width: auto;
    position: relative;
  }
  div.wrapper img {
    max-width: 100%;
  }
  div.container {
    min-height: 788px;
    max-width: 1000px;
    margin: 0 auto;
  }
  
  div.menu {
    font-size: 36px;
    font-family: "Vinque", serif;
    color: #885458;
    font-weight: 600;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  div.menu button {
    cursor: url("images/01.png"), auto;
    font-size: 36px;
    padding: 10px 20px;
    background: no-repeat url(images/Carved_3Slides.png);
    background-size: cover;
    width: fit-content;
    border: none;
    font-family: "Vinque", serif;
    color: #885458;
  }
  
  div.menu button:hover {
    cursor: url("images/01.png"), auto;
    padding: 10px 20px;
    font-size: 40px;
    background: no-repeat url(images/Carved_3Slides.png);
    background-size: cover;
  }
  </style>
