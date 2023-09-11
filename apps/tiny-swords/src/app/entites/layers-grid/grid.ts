/* eslint-disable @typescript-eslint/no-explicit-any */
import { Matrix } from "../../tools/matrix/matrix";
import { RoleType } from "../layers/layers.types";
import { TileName } from "../renderer/renderer.const";
import { IGridCell } from "./grid.types";

export class Grid {
  #grid;
  #initGrid;
  #gridX: number;
  #gridY: number;
  #tileTypes;
  #tileMapToWeight;
  #enter;
  #exit;

	constructor(gridX: number, gridY: number) {
		this.#gridX = gridX;
    this.#gridY = gridY;
    this.#enter = null;
    this.#exit = null;
    this.#grid = new Matrix<IGridCell>(gridX, gridY);

    // заполняем сетку
    for (let i = 0; i < this.#grid.array.length; i++) {
      const x = i % this.#gridX;
      const y = Math.floor(i / this.#gridX);

      this.#grid.set({ x, y }, {
        collapsed: false,
        coords: [x, y],
        options: [],
      });
    }
  }

  get array() {
    return this.#grid.array;
  }

  fill(templates, grid = null) {
    templates.forEach((template) => {
      const conditions = template.create({
        grid: grid ? grid : this.#grid,
        gridX: this.#gridX,
        gridY: this.#gridY,
        enter: this.#enter,
        exit: this.#exit,
      });

      conditions.forEach(({ tile, coords, role }) => {
        if (role) {
          this.#setRoles(role, coords);
        }

        this.#grid.set({ x: coords[0], y: coords[1] }, {
          collapsed: true,
          coords,
          options: [tile],
        });
      });
    });

    return this; 
  }

  init(tileMapToWeight) {
    this.#tileMapToWeight = tileMapToWeight;
    this.#tileTypes = tileMapToWeight.reduce((acc, [tile]) => [...acc, tile], []);

    this.#grid.array.forEach(({ coords, options, collapsed }) => {
      if (!collapsed) {
        const [x, y] = coords;

        // если ячека пустая - ставим в ячейку все варианты
        this.#grid.set({ x, y }, {
          collapsed: false,
          coords,
          options: [...this.#tileTypes],
        });
      }
    });
  }

  mask(grid, conditions) {
    conditions.forEach(({ data, conditionFn, random }) => {
      if (!random) {
        grid.#grid.array.forEach((cell) => {
          if (conditionFn(cell.options[0])) {

            // добавляем правила
            data.forEach(({ tile, coords }) => {
              const { x, y } = coords ? coords({ x: cell.coords[0], y: cell.coords[1]}) : { x: cell.coords[0], y: cell.coords[1]};

              this.#grid.set({ x, y }, {
                collapsed: true,
                coords: [x, y],
                options: [tile]
              });
            });
          }
        });
      } else {
        const availableCells = grid.#grid.array.filter(({ coords, options }) => {
          return conditionFn({ x: coords[0], y: coords[1], options });
        });

        if (availableCells.length) {
          for (let i = 0; i < random; i++) {
            const { coords } = availableCells[Math.floor(Math.random() * availableCells.length)];
      
            this.#grid.set({ x: coords[0], y: coords[1] }, { 
              collapsed: true,
              coords: [coords[0], coords[1]],
              options: [this.weightedRandom(data)],
            });
          }
        }
      }
    });
  }

  wfc(rules) {
    console.time();

    // Обновляем энтропию
    this.#collapseCellOptions(rules);

    // Копируем стартовую сетку чтобы попробовать снова
    this.#initGrid = this.#grid;

    let j = 0;

    while (j < 10e6) {
      // Выбираем рандомную ячейку для коллапса по минимально возможным тайлам
      const cell = this.#defineCellToUpdate();

      // Устанавливаем ячейке рандомный тайл из доступных
      this.#setRandomTileByIndex(cell);

      try {
        // Обновляем энтропию
        this.#collapseCellOptions(rules);
      } catch (e) {
        console.log('Ошибка генерации, итераций: ', j);

        this.#grid = this.#initGrid;
      }

      // 6. Прерываем цикл
      if (this.#grid.array.every(({ collapsed }) => collapsed)) {
        console.log('Всего итераций: ', j);
        break;
      }

      j++;
    }

    console.timeEnd();
  }

  #setRoles(role, coords) {
    if (role === RoleType.ENTER) {
      this.#enter = coords;
    } else {
      this.#exit = coords;
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

  #defineCellToUpdate(): IGridCell {
    // сортируем нассив чтобы найти элементы с наименьшей энтропией
    let gridCopy = this.#grid.array.slice();

    gridCopy = gridCopy.filter((el: IGridCell) => !el.collapsed);

    gridCopy.sort((a: IGridCell, b: IGridCell) => {
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

    // выбираем рандомную ячейку
    return this.#random(gridCopy);
  }

  weightedRandom(items) {
    const table = items
      .flatMap(([item, weight]) => Array(weight).fill(item))
  
    return table[Math.floor(Math.random() * table.length)];
  }

  #setRandomTileByIndex({ coords, options }: IGridCell) {
    const optionsWeight = this.#tileMapToWeight.filter(([tile]) => options.includes(tile));
    const pick = this.weightedRandom(optionsWeight);

    this.#grid.set({ x: coords[0], y: coords[1] }, {
      coords,
      collapsed: true,
      options: [pick],
    });
  }

  #collapseCellOptions(rules) {
    const nextGrid = new Matrix<IGridCell>(this.#gridX, this.#gridY);

    for (let index = 0; index < this.#grid.array.length; index++) {
      const cell = this.#grid.array[index];
      let options = [...this.#tileTypes];

      // если ячейка заполнена
      const { coords } = cell;
      const [x, y] = coords;

      if (cell.collapsed) {
        nextGrid.set({ x, y }, cell);
      } else {
        // смотрим на верхнюю клетку
        if (y > 0) {
          const up = this.#grid.get({ x, y: y - 1 });            
          let validOptions = [];

          for (const option of up.options) {
            const valid = rules[option][2];
            validOptions = validOptions.concat(valid);
          }

          options = this.#checkValid(options, validOptions);
        }

        // смотрим на правую клетку
        if (x < this.#gridX - 1) {
          const right = this.#grid.get({ x: x + 1, y });
          let validOptions = [];

          for (const option of right.options) {
            const valid = rules[option][3];
            validOptions = validOptions.concat(valid);
          }
          options = this.#checkValid(options, validOptions);
        }

        // смотрим вниз
        if (y < this.#gridY - 1) {
          const down = this.#grid.get({ x, y: y + 1 });
          let validOptions = [];

          for (const option of down.options) {
            const valid = rules[option][0];
            validOptions = validOptions.concat(valid);
          }
          options = this.#checkValid(options, validOptions);
        }

        // смотрим влево
        if (x > 0) {
          const left = this.#grid.get({ x: x - 1, y });
          let validOptions = [];

          for (const option of left.options) {
            const valid = rules[option][1];
            validOptions = validOptions.concat(valid);
          }
          options = this.#checkValid(options, validOptions);
        }

        nextGrid.set({ x, y }, {
          collapsed: false,
          coords: [x, y],
          options,
        });
      }
    };

    this.#grid = nextGrid;
  }

  // #createGrid(width: number, height: number, empty = false) {
  //   const result = [];

  //   if (empty) {
  //     for (let i = 0; i < width * height; i++) {
  //       result[i] = {
  //         index: i,
  //         collapsed: false,
  //         options: [...this.#tileTypes],
  //       }
  //     }

  //     return result;
  //   }

  //   for (let i = 0; i < width * height; i++) {
  //     let tile = {
  //       index: i,
  //       collapsed: false,
  //       options: [...this.#tileTypes],
  //     };

  //     // Заполняем воду по периметру карты
  //     if (
  //       i < width                                    // первый ряд
  //       // i < width * 2                             // два ряда
  //         || i >= width * height - width - 1         // последний ряд ячеек
  //         // || i >= width * height - width * 2 - 1  // предпоследний ряд ячеек
  //         || i % width === 0                         // первая ячейка строки
  //         // || i % width === 1                      // вторая ячейка строки
  //         || i % width === width - 1                 // последняя ячейка строки 
  //         // || i % width === width - 2              // предпоследняя ячейка строки  
  //       ) {
  //       tile = {
  //         ...tile,
  //         collapsed: true,
  //         options: [TileName.WATER_MIDDLE_MIDDLE],
  //       }
  //     }

  //     // Добавляем полоску земли
  //     // const middleRow = width * Math.floor((height - 2) / 2);

  //     // if (
  //     //   (middleRow + 4) < i && i < (middleRow + width - 4)                    // середина
  //     //     // || (middleRow + width + 4) < i && i < (middleRow + width * 2 - 4)   // ряд вперед
  //     //     // || (middleRow - width + 4) < i && i < (middleRow - 4)               // ряд назад 
  //     // ) {
  //     //   tile = {
  //     //     ...tile,
  //     //     collapsed: true,
  //     //     options: [TileName.GROUND_MIDDLE_MIDDLE],
  //     //   }
  //     // }

  //     // мост по середине
  //     if (i === width * height / 2  + width) {
  //       tile = {
  //         ...tile,
  //         collapsed: true,
  //         options: [TileName.BRIDGE_MIDDLE],
  //       }
  //     }

  //     // Добавляем начало острова с мостом
  //     if (i === 62) {
  //       tile = {
  //         ...tile,
  //         collapsed: true,
  //         options: [TileName.GROUND_TOP_RIGHT],
  //       }
  //     }
  //     if (i === 82) {
  //       tile = {
  //         ...tile,
  //         collapsed: true,
  //         options: [TileName.GROUND_MIDDLE_RIGHT],
  //       }
  //     }
  //     if (i === 102) {
  //       tile = {
  //         ...tile,
  //         collapsed: true,
  //         options: [TileName.BRIDGE_LEFT],
  //       }
  //     }
  //     if (i === 122) {
  //       tile = {
  //         ...tile,
  //         collapsed: true,
  //         options: [TileName.GROUND_BOTTOM_RIGHT],
  //       }
  //     }

  //     result[i] = tile;
  //   }
  //   return result;
  // }

  map() {
    // Создаем матрицу для рендера
    const map = [];

    for (let y = 0; y < this.#gridY; y++) {
      const row = [];

      for (let x = 0; x < this.#gridX; x++) {
        const cell = this.#grid.array[this.#gridX * y + x];
        
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