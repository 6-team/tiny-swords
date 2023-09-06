/* eslint-disable @typescript-eslint/no-explicit-any */
import { TileName } from "../../entites/scene/scene.const";
import { TILE_WEIGHT } from "./wfc.const";


// 1. Создаем матрицу по размеру
// 2. Предустанавливаем в нее какие-то тайлы, например, периметр воды
// 3. Отправляем в генератор матрицу, тайлы и правила
// 4. Рендерим слой по матрице


type Cell = {
  index: number;
  collapsed: boolean;
  options: TileName[];
}

export class WFC {
  #grid: Array<Cell>;
  #gridX: number;
  #gridY: number;
  #rules: any;
  #tileTypes: TileName[];

	constructor(gridX: number, gridY: number, rules: any, tileTypes: TileName[]) {
		this.#gridX = gridX;
    this.#gridY = gridY;
    this.#rules = rules;
    this.#tileTypes = tileTypes;

    console.time();

    // 1. Создаем сетку с тайлами пустая/с водой по периметру
    this.#grid = this.#createGrid(this.#gridX, this.#gridY);

    // 2. Если установили воду - нужно пересчитать обновить энтропию
    this.#collapseCellOptions();

    this.#generate();

    console.timeEnd();
  }

  get grid() {
    return this.#grid;
  }

  #generate() {
    let j = 0;

    while (j < 10e6) {
      // 3. Выбираем рандомную ячейку для коллапса по минимально возможным тайлам
      const cell = this.#defineCellToUpdate();

      // 4. Устанавливаем ячейке рандомный тайл из доступных
      this.#setRandomTileByIndex(cell);

      try {
        // 5. Обновляем энтропию
        this.#collapseCellOptions();
      } catch (e) {
        console.log('Ошибка генерации, итераций: ', j);

        this.#grid = this.#createGrid(this.#gridX, this.#gridY);
      }

      // 6. Прерываем цикл
      if (this.#grid.every(({ collapsed }) => collapsed)) {
        console.log('Всего итераций: ', j);
        break;
      }

      j++;
    }
  }

    #random<T>(array: Array<T>): T {
      return array[Math.floor(Math.random() * array.length)];
    }

    #checkValid(options: TileName[], valid: TileName[]) {  
      const filteredOption = options.filter((option: number) => {
        return valid.includes(option);
      });
  
      return filteredOption;
    }

    #defineCellToUpdate() {
      // сортируем нассив чтобы найти элементы с наименьшей энтропией
      let gridCopy = this.#grid.slice();
  
      gridCopy = gridCopy.filter((el: Cell) => !el.collapsed);
  
      gridCopy.sort((a: Cell, b: Cell) => {
        return a.options.length - b.options.length;
      });
  
      // если этих элелементов несколько создадим новый массив только с ними
      const len = gridCopy[0].options.length;
  
      let stopIndex = 0;
      for (let i = 1; i < gridCopy.length; i++) {
        if (gridCopy[i].options.length > len) {
          stopIndex = i;
          break;
        }
      }
  
      // режем массив до найденного индекса
      if (stopIndex > 0) gridCopy.splice(stopIndex);
  
      return this.#random(gridCopy);
    }

    weightedRandom(items) {
      const table = items
        .flatMap(([item, weight]) => Array(weight).fill(item))
    
      return table[Math.floor(Math.random() * table.length)];
    }

    #setRandomTileByIndex(cell: Cell) {
      const optionsWeight = TILE_WEIGHT.filter(([tile]) => cell.options.includes(tile));
      const pick = this.weightedRandom(optionsWeight);
  
      this.#grid[cell.index] = {
        index: cell.index,
        collapsed: true,
        options: [pick],
      };
    }

    #collapseCellOptions() {
      const nextGrid = [];
  
      for (let y = 0; y < this.#gridY; y++) {
        for (let x = 0; x < this.#gridX; x++) {
          const index = this.#gridX * y + x;
  
          if (this.#grid[index].collapsed) {
            nextGrid[index] = this.#grid[index];
          } else {
            let options = [...this.#tileTypes];
  

            // смотрим на верхнюю клетку
            if (y > 0) {
              const up = this.#grid[x + (y - 1) * this.#gridX];            
              let validOptions = [];
  
              for (const option of up.options) {
                const valid = this.#rules[option][2];
                validOptions = validOptions.concat(valid);
              }
  
              options = this.#checkValid(options, validOptions);
            }
  
            // смотрим на правую клетку
            if (x < this.#gridX - 1) {
              const right = this.#grid[x + 1 + y * this.#gridX];
              let validOptions = [];
  
              for (const option of right.options) {
                const valid = this.#rules[option][3];
                validOptions = validOptions.concat(valid);
              }
              options = this.#checkValid(options, validOptions);
            }
  
            // смотрим вниз
            if (y < this.#gridY - 1) {
              const down = this.#grid[x + (y + 1) * this.#gridX];
              let validOptions = [];
  
              for (const option of down.options) {
                const valid = this.#rules[option][0];
                validOptions = validOptions.concat(valid);
              }
              options = this.#checkValid(options, validOptions);
            }
  
            // смотрим влево
            if (x > 0) {
              const left = this.#grid[x - 1 + y * this.#gridX];
              let validOptions = [];
  
              for (const option of left.options) {
                const valid = this.#rules[option][1];
                validOptions = validOptions.concat(valid);
              }
              options = this.#checkValid(options, validOptions);
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
  
      this.#grid = nextGrid;
    }

    #createGrid(width: number, height: number, empty = false) {
      const result = [];
  
      if (empty) {
        for (let i = 0; i < width * height; i++) {
          result[i] = {
            index: i,
            collapsed: false,
            options: [...this.#tileTypes],
          }
        }
  
        return result;
      }
  
      for (let i = 0; i < width * height; i++) {
        let tile = {
          index: i,
          collapsed: false,
          options: [...this.#tileTypes],
        };
  
        // Заполняем воду по периметру карты
        if (
          i < width                                    // первый ряд
          // i < width * 2                             // два ряда
            || i >= width * height - width - 1         // последний ряд ячеек
            // || i >= width * height - width * 2 - 1  // предпоследний ряд ячеек
            || i % width === 0                         // первая ячейка строки
            // || i % width === 1                      // вторая ячейка строки
            || i % width === width - 1                 // последняя ячейка строки 
            // || i % width === width - 2              // предпоследняя ячейка строки  
          ) {
          tile = {
            ...tile,
            collapsed: true,
            options: [TileName.WATER_MIDDLE_MIDDLE],
          }
        }
  
        // Добавляем полоску земли
        const middleRow = width * Math.floor((height - 2) / 2);
  
        if (
          (middleRow + 4) < i && i < (middleRow + width - 4)                    // середина
            // || (middleRow + width + 4) < i && i < (middleRow + width * 2 - 4)   // ряд вперед
            // || (middleRow - width + 4) < i && i < (middleRow - 4)               // ряд назад 
        ) {
          tile = {
            ...tile,
            collapsed: true,
            options: [TileName.GROUND_MIDDLE_MIDDLE],
          }
        }

        // Добавляем начало острова с мостом
        if (i === 62) {
          tile = {
            ...tile,
            collapsed: true,
            options: [TileName.GROUND_TOP_RIGHT],
          }
        }
        if (i === 82) {
          tile = {
            ...tile,
            collapsed: true,
            options: [TileName.GROUND_MIDDLE_RIGHT],
          }
        }
        if (i === 102) {
          tile = {
            ...tile,
            collapsed: true,
            options: [TileName.BRIDGE_LEFT],
          }
        }
        if (i === 122) {
          tile = {
            ...tile,
            collapsed: true,
            options: [TileName.GROUND_BOTTOM_RIGHT],
          }
        }
  
        result[i] = tile;
      }
      return result;
    }

    map(grid, gridX, gridY) {
      // Создаем матрицу для рендера
      const map = [];

      for (let y = 0; y < gridY; y++) {
        const row = [];

        for (let x = 0; x < gridX; x++) {
          const cell = grid[gridX * y + x];
          
          if (cell?.collapsed) {
            row.push(cell.options[0]);
          } else {
            row.push(null);
          }
        }

        map.push(row);
      }

      return map;
    }
	}