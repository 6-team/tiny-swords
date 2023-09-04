<script lang="ts">
  import { onMount } from "svelte";
  import { Scene } from '../entites/scene/scene';
  import { TileName } from "../entites/scene/scene.const";

  // Объект с возможными тайлами
  const tileTypes = [
    TileName.WATER_MIDDLE_MIDDLE,
    TileName.GROUND_TOP_LEFT,
    TileName.GROUND_TOP_MIDDLE,
    TileName.GROUND_TOP_RIGHT,
    TileName.GROUND_MIDDLE_LEFT,
    TileName.GROUND_MIDDLE_MIDDLE,
    TileName.GROUND_MIDDLE_RIGHT,
    TileName.GROUND_BOTTOM_LEFT,
    TileName.GROUND_BOTTOM_MIDDLE,
    TileName.GROUND_BOTTOM_RIGHT,
  ];

  const tileTypes2 = [
    TileName.WATER_MIDDLE_MIDDLE,
    TileName.GROUND_TOP_LEFT,
    TileName.GROUND_TOP_RIGHT,
    TileName.GROUND_BOTTOM_LEFT,
    TileName.GROUND_BOTTOM_RIGHT,
  ];

  // создаем правила для соединения плиток
  // const RULES = {
  //   [TileName.WATER_MIDDLE_MIDDLE]: [
  //     [
  //       TileName.WATER_MIDDLE_MIDDLE,
  //       TileName.GROUND_BOTTOM_LEFT,
  //       TileName.GROUND_BOTTOM_MIDDLE,
  //       TileName.GROUND_BOTTOM_RIGHT,
  //     ],
  //     [
  //       TileName.WATER_MIDDLE_MIDDLE,
  //       TileName.GROUND_TOP_LEFT,
  //       TileName.GROUND_MIDDLE_LEFT,
  //       TileName.GROUND_BOTTOM_LEFT,
  //     ],
  //     [
  //       TileName.WATER_MIDDLE_MIDDLE,
  //       TileName.GROUND_TOP_LEFT,
  //       TileName.GROUND_TOP_MIDDLE,
  //       TileName.GROUND_TOP_RIGHT,
  //     ],
  //     [
  //       TileName.WATER_MIDDLE_MIDDLE,
  //       TileName.GROUND_TOP_RIGHT,
  //       TileName.GROUND_MIDDLE_RIGHT,
  //       TileName.GROUND_BOTTOM_RIGHT,
  //     ],
  //   ],
  //   [TileName.GROUND_TOP_LEFT]: [
  //     [TileName.WATER_MIDDLE_MIDDLE],
  //     [TileName.GROUND_TOP_MIDDLE, TileName.GROUND_TOP_RIGHT],
  //     [TileName.GROUND_MIDDLE_LEFT, TileName.GROUND_BOTTOM_LEFT],
  //     [TileName.WATER_MIDDLE_MIDDLE],
  //   ],
  //   [TileName.GROUND_TOP_MIDDLE]: [
  //     [TileName.WATER_MIDDLE_MIDDLE],
  //     [TileName.GROUND_TOP_MIDDLE, TileName.GROUND_TOP_RIGHT],
  //     [TileName.GROUND_MIDDLE_MIDDLE],
  //     [TileName.GROUND_TOP_MIDDLE, TileName.GROUND_TOP_LEFT],
  //   ],
  //   [TileName.GROUND_TOP_RIGHT]: [
  //     [TileName.WATER_MIDDLE_MIDDLE],
  //     [TileName.WATER_MIDDLE_MIDDLE],
  //     [TileName.GROUND_MIDDLE_RIGHT, TileName.GROUND_BOTTOM_RIGHT],
  //     [TileName.GROUND_TOP_MIDDLE, TileName.GROUND_TOP_LEFT],
  //   ],
  //   [TileName.GROUND_MIDDLE_LEFT]: [
  //     [TileName.GROUND_MIDDLE_LEFT, TileName.GROUND_TOP_LEFT],
  //     [TileName.GROUND_MIDDLE_MIDDLE],
  //     [TileName.GROUND_MIDDLE_LEFT, TileName.GROUND_BOTTOM_LEFT],
  //     [TileName.WATER_MIDDLE_MIDDLE],
  //   ],
  //   [TileName.GROUND_MIDDLE_MIDDLE]: [
  //     [TileName.GROUND_MIDDLE_MIDDLE, TileName.GROUND_TOP_MIDDLE],
  //     [TileName.GROUND_MIDDLE_MIDDLE, TileName.GROUND_MIDDLE_RIGHT],
  //     [TileName.GROUND_MIDDLE_MIDDLE, TileName.GROUND_BOTTOM_MIDDLE],
  //     [TileName.GROUND_MIDDLE_MIDDLE, TileName.GROUND_MIDDLE_LEFT],
  //   ],
  //   [TileName.GROUND_MIDDLE_RIGHT]: [
  //     [TileName.GROUND_MIDDLE_RIGHT, TileName.GROUND_TOP_RIGHT],
  //     [TileName.WATER_MIDDLE_MIDDLE],
  //     [TileName.GROUND_MIDDLE_RIGHT, TileName.GROUND_BOTTOM_RIGHT],
  //     [TileName.GROUND_MIDDLE_MIDDLE],
  //   ],
  //   [TileName.GROUND_BOTTOM_LEFT]: [
  //     [TileName.GROUND_TOP_LEFT, TileName.GROUND_MIDDLE_LEFT],
  //     [TileName.GROUND_BOTTOM_MIDDLE, TileName.GROUND_BOTTOM_RIGHT],
  //     [TileName.WATER_MIDDLE_MIDDLE],
  //     [TileName.WATER_MIDDLE_MIDDLE],
  //   ],
  //   [TileName.GROUND_BOTTOM_MIDDLE]: [
  //     [TileName.GROUND_MIDDLE_MIDDLE],
  //     [TileName.GROUND_BOTTOM_MIDDLE, TileName.GROUND_BOTTOM_RIGHT],
  //     [TileName.WATER_MIDDLE_MIDDLE],
  //     [TileName.GROUND_BOTTOM_MIDDLE, TileName.GROUND_BOTTOM_LEFT],
  //   ],
  //   [TileName.GROUND_BOTTOM_RIGHT]: [
  //     [TileName.GROUND_MIDDLE_RIGHT, TileName.GROUND_TOP_RIGHT],
  //     [TileName.WATER_MIDDLE_MIDDLE],
  //     [TileName.WATER_MIDDLE_MIDDLE],
  //     [TileName.GROUND_BOTTOM_MIDDLE, TileName.GROUND_BOTTOM_LEFT],
  //   ],
  // };
  const RULES = {
    [TileName.WATER_MIDDLE_MIDDLE]: [
      [
        TileName.WATER_MIDDLE_MIDDLE,
        TileName.GROUND_BOTTOM_LEFT,
        TileName.GROUND_BOTTOM_MIDDLE,
        TileName.GROUND_BOTTOM_RIGHT,
      ],
      [
        TileName.WATER_MIDDLE_MIDDLE,
        TileName.GROUND_TOP_LEFT,
        TileName.GROUND_MIDDLE_LEFT,
        TileName.GROUND_BOTTOM_LEFT,
      ],
      [
        TileName.WATER_MIDDLE_MIDDLE,
        TileName.GROUND_TOP_LEFT,
        TileName.GROUND_TOP_MIDDLE,
        TileName.GROUND_TOP_RIGHT,
      ],
      [
        TileName.WATER_MIDDLE_MIDDLE,
        TileName.GROUND_TOP_RIGHT,
        TileName.GROUND_MIDDLE_RIGHT,
        TileName.GROUND_BOTTOM_RIGHT,
      ],
    ],
    [TileName.GROUND_TOP_LEFT]: [
      [TileName.WATER_MIDDLE_MIDDLE],
      [TileName.GROUND_TOP_MIDDLE, TileName.GROUND_TOP_RIGHT, TileName.GROUND_MIDDLE_MIDDLE],
      [TileName.GROUND_MIDDLE_LEFT, TileName.GROUND_BOTTOM_LEFT, TileName.GROUND_MIDDLE_MIDDLE],
      [TileName.WATER_MIDDLE_MIDDLE],
    ],
    [TileName.GROUND_TOP_MIDDLE]: [
      [TileName.WATER_MIDDLE_MIDDLE],
      [TileName.GROUND_TOP_MIDDLE, TileName.GROUND_TOP_RIGHT, TileName.GROUND_MIDDLE_MIDDLE],
      [TileName.GROUND_MIDDLE_MIDDLE],
      [TileName.GROUND_TOP_MIDDLE, TileName.GROUND_TOP_LEFT, TileName.GROUND_MIDDLE_MIDDLE],
    ],
    [TileName.GROUND_TOP_RIGHT]: [
      [TileName.WATER_MIDDLE_MIDDLE],
      [TileName.WATER_MIDDLE_MIDDLE],
      [TileName.GROUND_MIDDLE_RIGHT, TileName.GROUND_BOTTOM_RIGHT, TileName.GROUND_MIDDLE_MIDDLE],
      [TileName.GROUND_TOP_MIDDLE, TileName.GROUND_TOP_LEFT, TileName.GROUND_MIDDLE_MIDDLE],
    ],
    [TileName.GROUND_MIDDLE_LEFT]: [
      [TileName.GROUND_MIDDLE_LEFT, TileName.GROUND_TOP_LEFT, TileName.GROUND_MIDDLE_MIDDLE],
      [TileName.GROUND_MIDDLE_MIDDLE],
      [TileName.GROUND_MIDDLE_LEFT, TileName.GROUND_BOTTOM_LEFT, TileName.GROUND_MIDDLE_MIDDLE],
      [TileName.WATER_MIDDLE_MIDDLE],
    ],
    [TileName.GROUND_MIDDLE_MIDDLE]: [
      [TileName.GROUND_MIDDLE_MIDDLE, TileName.GROUND_TOP_MIDDLE, TileName.GROUND_TOP_LEFT, TileName.GROUND_TOP_RIGHT, TileName.GROUND_MIDDLE_LEFT, TileName.GROUND_MIDDLE_RIGHT],
      [TileName.GROUND_MIDDLE_MIDDLE, TileName.GROUND_MIDDLE_RIGHT, TileName.GROUND_TOP_RIGHT, TileName.GROUND_TOP_MIDDLE, TileName.GROUND_BOTTOM_RIGHT, TileName.GROUND_BOTTOM_MIDDLE],
      [TileName.GROUND_MIDDLE_MIDDLE, TileName.GROUND_BOTTOM_MIDDLE, TileName.GROUND_MIDDLE_LEFT, TileName.GROUND_MIDDLE_RIGHT, TileName.GROUND_BOTTOM_LEFT, TileName.GROUND_BOTTOM_RIGHT],
      [TileName.GROUND_MIDDLE_MIDDLE, TileName.GROUND_MIDDLE_LEFT, TileName.GROUND_TOP_LEFT, TileName.GROUND_TOP_MIDDLE, TileName.GROUND_BOTTOM_LEFT, TileName.GROUND_BOTTOM_MIDDLE],
    ],
    [TileName.GROUND_MIDDLE_RIGHT]: [
      [TileName.GROUND_MIDDLE_RIGHT, TileName.GROUND_TOP_RIGHT, TileName.GROUND_MIDDLE_MIDDLE],
      [TileName.WATER_MIDDLE_MIDDLE],
      [TileName.GROUND_MIDDLE_RIGHT, TileName.GROUND_BOTTOM_RIGHT, TileName.GROUND_MIDDLE_MIDDLE],
      [TileName.GROUND_MIDDLE_MIDDLE],
    ],
    [TileName.GROUND_BOTTOM_LEFT]: [
      [TileName.GROUND_TOP_LEFT, TileName.GROUND_MIDDLE_LEFT, TileName.GROUND_MIDDLE_MIDDLE],
      [TileName.GROUND_BOTTOM_MIDDLE, TileName.GROUND_BOTTOM_RIGHT, TileName.GROUND_MIDDLE_MIDDLE],
      [TileName.WATER_MIDDLE_MIDDLE],
      [TileName.WATER_MIDDLE_MIDDLE],
    ],
    [TileName.GROUND_BOTTOM_MIDDLE]: [
      [TileName.GROUND_MIDDLE_MIDDLE],
      [TileName.GROUND_BOTTOM_MIDDLE, TileName.GROUND_BOTTOM_RIGHT, TileName.GROUND_MIDDLE_MIDDLE],
      [TileName.WATER_MIDDLE_MIDDLE],
      [TileName.GROUND_BOTTOM_MIDDLE, TileName.GROUND_BOTTOM_LEFT, TileName.GROUND_MIDDLE_MIDDLE],
    ],
    [TileName.GROUND_BOTTOM_RIGHT]: [
      [TileName.GROUND_MIDDLE_RIGHT, TileName.GROUND_TOP_RIGHT, TileName.GROUND_MIDDLE_MIDDLE],
      [TileName.WATER_MIDDLE_MIDDLE],
      [TileName.WATER_MIDDLE_MIDDLE],
      [TileName.GROUND_BOTTOM_MIDDLE, TileName.GROUND_BOTTOM_LEFT, TileName.GROUND_MIDDLE_MIDDLE],
    ],
  };

  const RULES2 = {
    [TileName.WATER_MIDDLE_MIDDLE]: [
      [TileName.WATER_MIDDLE_MIDDLE, TileName.GROUND_BOTTOM_LEFT, TileName.GROUND_BOTTOM_RIGHT],
      [TileName.WATER_MIDDLE_MIDDLE, TileName.GROUND_TOP_LEFT, TileName.GROUND_BOTTOM_LEFT],
      [TileName.WATER_MIDDLE_MIDDLE, TileName.GROUND_TOP_LEFT, TileName.GROUND_TOP_RIGHT],
      [TileName.WATER_MIDDLE_MIDDLE, TileName.GROUND_TOP_RIGHT, TileName.GROUND_BOTTOM_RIGHT],
    ],
    [TileName.GROUND_TOP_LEFT]: [
      [TileName.WATER_MIDDLE_MIDDLE],
      [TileName.GROUND_TOP_RIGHT],
      [TileName.GROUND_BOTTOM_LEFT],
      [TileName.WATER_MIDDLE_MIDDLE],
    ],
    [TileName.GROUND_TOP_RIGHT]: [
      [TileName.WATER_MIDDLE_MIDDLE],
      [TileName.WATER_MIDDLE_MIDDLE],
      [TileName.GROUND_BOTTOM_RIGHT],
      [TileName.GROUND_TOP_LEFT],
    ],
    [TileName.GROUND_BOTTOM_LEFT]: [
      [TileName.GROUND_TOP_LEFT],
      [TileName.GROUND_BOTTOM_RIGHT],
      [TileName.WATER_MIDDLE_MIDDLE],
      [TileName.WATER_MIDDLE_MIDDLE],
    ],
    [TileName.GROUND_BOTTOM_RIGHT]: [
      [TileName.GROUND_TOP_RIGHT],
      [TileName.WATER_MIDDLE_MIDDLE],
      [TileName.WATER_MIDDLE_MIDDLE],
      [TileName.GROUND_BOTTOM_LEFT],
    ],
  };

  function createGrid(width: number, height: number, empty = false) {
    let result = [];

    if (empty) {
      for (let i = 0; i < width * height; i++) {
        result[i] = {
          index: i,
          collapsed: false,
          options: [...tileTypes],
        }
      }

      return result;
    }

    for (let i = 0; i < width * height; i++) {
      let tile = {
        index: i,
        collapsed: false,
        options: [...tileTypes],
      };

      // Заполняем воду по периметру карты
      if (
        i < width                             // первый ряд ячеек
          || i >= width * height - width - 1  // первая ячейка строки
          || i % width === 0                  // последняя ячейка строки
          || i % width === width - 1          // последний ряд ячеек
        ) {
        tile = {
          ...tile,
          collapsed: true,
          options: [TileName.WATER_MIDDLE_MIDDLE],
        }
      }

      // Добавляем полоску земли
      const middleRow = width * Math.floor(height / 2);

      if (
        (middleRow + 3) < i && i < (middleRow + width - 3)                    // середина
          ||  (middleRow - width + 3) < i && i < (middleRow - width * 2 - 3)  // ряд вперед
          ||  (middleRow + width + 3) < i && i < (middleRow + width * 2 - 3)  // ряд назад
      ) {
        tile = {
          ...tile,
          collapsed: true,
          options: [TileName.GROUND_MIDDLE_MIDDLE],
        }
      }

      result[i] = tile;
    }
    return result;
  }

  function random(array: any) {
    return array[Math.floor(Math.random() * array.length)];
  }

  function checkValid(options: any, valid: any) {
    // console.log('Сравниваем два массива - ', options, valid);

    const filteredOption = options.filter((option: number) => {
      return valid.includes(option);
    });

    // for (let i = options.length - 1; i >= 0; i--) {
    //   let element = options[i];

    //   if (!valid.includes(element)) {
    //     options.splice(i, 1);
    //   }
    // }

    // console.log('В итоге получаем - ', filteredOption);

    return filteredOption;
  }

  function defineCellToUpdate(grid: any) {
    // сортируем нассив чтобы найти элементы с наименьшей энтропией
    let gridCopy = grid.slice();

    gridCopy = gridCopy.filter((el: any) => !el.collapsed);

    if (gridCopy.length === 0) {
      return -1;
    }

    gridCopy.sort((a: any, b: any) => {
      return a.options.length - b.options.length;
    });

    // если этих элелементов несколько создадим новый массив только с ними
    let len = gridCopy[0].options.length;

    let stopIndex = 0;
    for (let i = 1; i < gridCopy.length; i++) {
      if (gridCopy[i].options.length > len) {
        stopIndex = i;
        break;
      }
    }

    // режем массив до найденного индекса
    if (stopIndex > 0) gridCopy.splice(stopIndex);

    return random(gridCopy);
  }

  function getRandomByWeights(options: number[]) {
    // если нет воды - выбераем случайный тайл
    if (!options.includes(TileName.WATER_MIDDLE_MIDDLE)) {
      return random(options);
    }

    // Если вариантов тайлов несколько выберем с большей долей не воду
    const chance = Math.random();
    
    // не работает =((((
    if (chance > 0.6) {
      return TileName.WATER_MIDDLE_MIDDLE;
    } else {
      return random(options.filter((tile: number) => tile !== TileName.WATER_MIDDLE_MIDDLE));
    }
  }

  function setRandomTileByIndex(grid: any, cell: any) {
    let pick;

    if (cell.options.length > 1) {
      pick = getRandomByWeights(cell.options);
    } else {
      pick = cell.options[0];
    }

    if (pick === undefined) {
      console.log('Error generate');
    }

    grid[cell.index] = {
      index: cell.index,
      collapsed: true,
      options: [pick],
    };

    return grid;
  }

  function collapseCellOptions(grid: any, gridX: number) {
    const nextGrid = [];

    for (let y = 0; y < gridY; y++) {
      for (let x = 0; x < gridX; x++) {
        let index = gridX * y + x;

        if (grid[index].collapsed) {
          nextGrid[index] = grid[index];
        } else {
          let options = [...tileTypes];

          // смотрим на верхнюю клетку
          if (y > 0) {
            let up = grid[x + (y - 1) * gridX];            
            let validOptions = [] as any;

            for (let option of up.options) {
              let valid = (RULES as any)[option][2];
              validOptions = validOptions.concat(valid);
            }

            options = checkValid(options, validOptions);
          }

          // смотрим на правую клетку
          if (x < gridX - 1) {
            let right = grid[x + 1 + y * gridX];
            let validOptions = [] as any;

            for (let option of right.options) {
              let valid = (RULES as any)[option][3];
              validOptions = validOptions.concat(valid);
            }
            options = checkValid(options, validOptions);
          }

          // смотрим вниз
          if (y < gridY - 1) {
            let down = grid[x + (y + 1) * gridX];
            let validOptions = [] as any;

            for (let option of down.options) {
              let valid = (RULES as any)[option][0];
              validOptions = validOptions.concat(valid);
            }
            options = checkValid(options, validOptions);
          }

          // смотрим влево
          if (x > 0) {
            let left = grid[x - 1 + y * gridX];
            let validOptions = [] as any;

            for (let option of left.options) {
              let valid = (RULES as any)[option][1];
              validOptions = validOptions.concat(valid);
            }
            options = checkValid(options, validOptions);
          }

          // console.log('Обновляю ячейку - ', grid[index], 'options - ', options);

          nextGrid[index] = {
            index,
            options,
            collapsed: false,
          };
        }
      }
    }

    return nextGrid;
  }

  // 0. Задаем размер сетки
  const gridX = 20;
  const gridY = 13;

  // 1. Создаем сетку с тайлами пустая/с водой по периметру
  let grid = createGrid(gridX, gridY);

  // 2. Если установили воду - нужно пересчитать обновить энтропию
  grid = collapseCellOptions(grid, gridX);

  let j = 0;

  while (j < gridX * gridY) {
    // 3. Выбираем рандомную ячейку для коллапса по минимально возможным тайлам
    const cell = defineCellToUpdate(grid);

    // 4. Устанавливаем ячейке рандомный тайл из доступных
    grid = setRandomTileByIndex(grid, cell);

    try {
      // 5. Обновляем энтропию
      grid = collapseCellOptions(grid, gridX);
    } catch (e) {
      console.log('Ошибка генерации, итераций: ', j);
    }

    // 6. Прерываем цикл
    if (grid.every(({ collapsed }) => collapsed)) {
      console.log('Всего итераций: ', j);
      break;
    }

    j++;
  }

  // 7. Создаем матрицу для рендера
  let map = [] as any;

  for (let y = 0; y < gridY; y++) {
    let row = [];

    for (let x = 0; x < gridX; x++) {
      let cell = grid[gridX * y + x];
      
      if (cell.collapsed) {
        row.push(cell.options[0]);
      } else {
        row.push(null);
      }
    }

    map.push(row);
  }

  onMount(async () => {
    const scene = new Scene({ tileSize: 64, scale: 0.75 });

    await scene.renderLayer(map);
  });
</script>

<div style='position: relative'>
  <canvas id="canvas" width="960" height="720"></canvas>
</div>
