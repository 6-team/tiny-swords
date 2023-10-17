import { Matrix } from "../../tools/matrix/matrix";
import { TileName } from "../renderer";
import { randomElement, weightedRandomElement } from "../layers/layers.utils";
import { LayerCell, LayerCondition } from "./layer.types";

export class Layer {
  #layer;
  #gridX: number;
  #gridY: number;

	constructor(gridX, gridY) {
		this.#gridX = gridX;
    this.#gridY = gridY;

    this.#layer = new Matrix<LayerCell>(gridX, gridY);

    for (let i = 0; i < this.#layer.array.length; i++) {
      const x = i % this.#gridX;
      const y = Math.floor(i / this.#gridX);

      this.#layer.set({ x, y }, {
        collapsed: false,
        coords: [x, y],
        options: [],
        boundary: false,
      });
    }
  }

  get array() {
    return this.#layer.array;
  }

  fill(conditionsList: LayerCondition[][]) {
    conditionsList.forEach((conditions: LayerCondition[]) => {
      conditions.forEach(({ tile, coords, boundary }) => {
        this.#layer.set({ x: coords[0], y: coords[1] }, {
          collapsed: true,
          coords,
          options: [tile],
          boundary,
        });
      });
    });

    return this; 
  }

  wfc(rules, tileOptions) {
    const tileTypes = tileOptions.reduce((acc, [tile]) => [...acc, tile], []);

    // заполняем все пустые ячейки
    this.#layer.array.forEach(({ coords, collapsed, boundary }) => {
      if (!collapsed) {
        const [x, y] = coords;

        // если ячека пустая - ставим в ячейку все варианты
        this.#layer.set({ x, y }, {
          collapsed: false,
          coords,
          options: [...tileTypes],
          boundary: false,
        });
      }
    });

    // Обновляем энтропию
    this.#collapseCellOptions(rules, tileTypes);

    // Копируем стартовую сетку чтобы попробовать снова
    const initLayer = this.#layer;

    let j = 0;

    while (j < 10e6) {
      // Выбираем рандомную ячейку для коллапса по минимально возможным тайлам
      const cell = this.#defineCellToUpdate();

      // Устанавливаем ячейке рандомный тайл из доступных
      this.#setRandomTileByIndex(cell, tileOptions);

      try {
        // Обновляем энтропию
        this.#collapseCellOptions(rules, tileTypes);
      } catch (e) {
        console.log('Ошибка генерации, итераций: ', j);

        this.#layer = initLayer;
      }

      // Прерываем цикл
      if (this.#layer.array.every(({ collapsed }) => collapsed)) {
        // console.log('Всего итераций: ', j);
        break;
      }

      j++;
    }

    return this;
  }

  #collapseCellOptions(rules, tileTypes) {
    const nextGrid = new Matrix<LayerCell>(this.#gridX, this.#gridY);

    for (let index = 0; index < this.#layer.array.length; index++) {
      const cell = this.#layer.array[index];
      let options = [...tileTypes];

      // если ячейка заполнена
      const { coords } = cell;
      const [x, y] = coords;

      if (cell.collapsed) {
        nextGrid.set({ x, y }, cell);
      } else {
        // смотрим на верхнюю клетку
        if (y > 0) {
          const up = this.#layer.get({ x, y: y - 1 });            
          let validOptions = [];

          for (const option of up.options) {
            const valid = rules[option][2];
            validOptions = validOptions.concat(valid);
          }

          options = this.#checkValid(options, validOptions);
        }

        // смотрим на правую клетку
        if (x < this.#gridX - 1) {
          const right = this.#layer.get({ x: x + 1, y });
          let validOptions = [];

          for (const option of right.options) {
            const valid = rules[option][3];
            validOptions = validOptions.concat(valid);
          }
          options = this.#checkValid(options, validOptions);
        }

        // смотрим вниз
        if (y < this.#gridY - 1) {
          const down = this.#layer.get({ x, y: y + 1 });
          let validOptions = [];

          for (const option of down.options) {
            const valid = rules[option][0];
            validOptions = validOptions.concat(valid);
          }
          options = this.#checkValid(options, validOptions);
        }

        // смотрим влево
        if (x > 0) {
          const left = this.#layer.get({ x: x - 1, y });
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
          boundary: false,
        });
      }
    };

    this.#layer = nextGrid;
  }

  #setRandomTileByIndex({ coords, options }: LayerCell, tileOptions) {
    const optionsWeight = tileOptions.filter(([tile]) => options.includes(tile));
    let tileName = null;
    
    if (optionsWeight.length) {
      tileName = weightedRandomElement(optionsWeight);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [_, __, boundary] = optionsWeight.find(([tile]) => tileName === tile);

      this.#layer.set({ x: coords[0], y: coords[1] }, {
        coords,
        collapsed: true,
        options: [tileName],
        boundary,
      });
    } else {
      this.#layer.set({ x: coords[0], y: coords[1] }, {
        coords,
        collapsed: true,
        options: [tileName],
        boundary: false,
      });
    }
  }

  #defineCellToUpdate(): LayerCell {
    // сортируем массив чтобы найти элементы с наименьшей энтропией
    let gridCopy = this.#layer.array.slice();

    gridCopy = gridCopy.filter((el: LayerCell) => !el.collapsed);

    gridCopy.sort((a: LayerCell, b: LayerCell) => {
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
    return randomElement(gridCopy);
  }

  #checkValid(options: TileName[], valid: TileName[]) {  
    const filteredOption = options.filter((option: number) => {
      return valid.includes(option);
    });

    return filteredOption;
  }
}