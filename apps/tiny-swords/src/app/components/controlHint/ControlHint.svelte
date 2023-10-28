
<div class="hint-wrapper">
  <div class="hint">
    <div class="hint__control-item">
    <div>
      <span class="hint__title">
        Бег
      </span>
      <div class="hint__image">
        <img width="66" height="50" src="./img/UI/move.png" alt="move-hint">
      </div>
    </div>

     <table class="hint__controls">
      <tr class="hint__controls-row">
        <td>A</td>
        <td>W</td>
        <td>S</td>
        <td>D</td>
      </tr>
      <tr  class="hint__controls-row">
        <td class='arrow-left'><img height="20" width="20" src="./img/UI/arrow.png" alt="arrow"/></td>
        <td class='arrow-top'><img height="20" width="20" src="./img/UI/arrow.png" alt="arrow"/></td>
        <td class='arrow-bottom'><img height="20" width="20" src="./img/UI/arrow.png" alt="arrow"/></td>
        <td class='arrow-right'><img height="20" width="20" src="./img/UI/arrow.png" alt="arrow"/></td>
      </tr>
     </table>
     <div>
   
     </div>
    </div>
    <div class="hint__control-item">
     <div>
      <span class="hint__title">
        Атака
      </span>
      <div class="hint__image">
        <img width="66" height="50"  src="./img/UI/attack.png" alt="attack-hint">
      </div>
     </div>
     <table class="hint__controls">
      <tr  class="hint__controls-row">
        <td>C</td>
        <td>F</td>
      </tr>
     </table>
     <div>
   
     </div>
    </div>
   
   </div>
</div>

<style lang="scss">
  * {
    font-family: "Vinque", serif;
    font-size: 18px;
    color: #ccb88d;

  }
  .hint-wrapper {
    pointer-events: none;
    position: absolute;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);

    .hint {
      gap: 2rem;
      display: flex;

      &__control-item {
        gap: 1rem;
        align-items: center;
        display: flex;
        flex-direction: row;
      }

      &__image {
        display: flex;
        justify-content: center;
      }
    
      table {
        text-align: center;
        border-spacing: 2px;
        
      
        td {
          width: 20px;
          height: 20px;
          border: 2px solid #ccb88d;
          font-size: 14px;
        }
      }
      .arrows-wrapper {
        display: flex;
      }
      
      .arrow-bottom img {
        transform: rotate(90deg);
      }
    
      .arrow-left img {
        transform: rotate(180deg);
      }
      
      .arrow-top img {
        transform: rotate(270deg);
      }
  }
}
</style>
