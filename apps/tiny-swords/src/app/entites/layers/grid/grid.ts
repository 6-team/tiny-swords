import { Matrix } from "../../../tools/matrix/matrix";
import { randomElement, weightedRandomElement } from "../utils/layers.utils";
import { TileName } from "../../renderer/renderer.const";
import { ILayersGridCell, ILayersGridOptions, ILayersGridTemplate } from "./grid.types";

export class LayersGrid {
  #layersGrid;
  #gridX: number;
  #gridY: number;
  #layerNames: string[];
  #cursor: string;
  options: ILayersGridOptions;

	constructor(gridX: number, gridY: number, layerNames: string[]) {
		this.#gridX = gridX;
    this.#gridY = gridY;
    this.#layerNames = layerNames;

    this.#cursor = layerNames[0];
    this.#layersGrid = layerNames.reduce((acc, layerName) => {
      const layerGrid = new Matrix<ILayersGridCell>(gridX, gridY);

      for (let i = 0; i < layerGrid.array.length; i++) {
        const x = i % this.#gridX;
        const y = Math.floor(i / this.#gridX);

        layerGrid.set({ x, y }, {
          collapsed: false,
          coords: [x, y],
          options: [],
        });
      }

      return {
        ...acc,
        [layerName]: layerGrid,
      };
    }, {});

    this.options = {
      gridX,
      gridY,
      enter: [0, 0],
      exit: [0, 0],
    };
  }

  get currentLayerGrid() {
    return this.#layersGrid[this.#cursor];
  }

  set currentLayerGrid(grid: Matrix<ILayersGridCell>) {
    this.#layersGrid[this.#cursor] = grid;
  }

  get maps(): Record<string, TileName[][]> {
    let maps = {};

    this.#layerNames.forEach((layerName: string) => {
      const grid = this.#layersGrid[layerName];
      const map = [];

      for (let y = 0; y < this.#gridY; y++) {
        const row = [];

        for (let x = 0; x < this.#gridX; x++) {
          const cell = grid.array[this.#gridX * y + x];
          
          if (cell?.collapsed) {
            row.push(cell.options[0]);
          } else {
            row.push(null);
          }
        }

        map.push(row);
      }

      maps = {
        ...maps,
        [layerName] :map,
      };
    });

    return maps;
  }

  get boundaries() {
    const boundaries = [];

    this.#layersGrid['main'].array.forEach(({ coords, options }) => {
      if (options[0] === TileName.WATER_MIDDLE_MIDDLE || options[0] === TileName.TREE_STRUMP) {
        boundaries.push([coords[0], coords[1]]);
      }
    });

    return boundaries;
  }

  fill(templates: ILayersGridTemplate[], layerName?: string) {
    templates.forEach((template) => {
      const conditions = template.create({
        grid: layerName ? this.#layersGrid[layerName] : this.currentLayerGrid,
        ...this.options
      });

      conditions.forEach(({ tile, coords, role }) => {
        if (role) {
          this.#setOption(role, coords);
        }

        this.currentLayerGrid.set({ x: coords[0], y: coords[1] }, {
          collapsed: true,
          coords,
          options: [tile],
        });
      });
    });

    return this; 
  }

  switch(layerName: string) {
    this.#cursor = layerName;

    return this;
  }

  wfc(rules, tileMapToWeight) {
    console.time();

    const tileTypes = tileMapToWeight.reduce((acc, [tile]) => [...acc, tile], []);

    // заполняем все пустые ячейки
    this.currentLayerGrid.array.forEach(({ coords, collapsed }) => {
      if (!collapsed) {
        const [x, y] = coords;

        // если ячека пустая - ставим в ячейку все варианты
        this.currentLayerGrid.set({ x, y }, {
          collapsed: false,
          coords,
          options: [...tileTypes],
        });
      }
    });

    // Обновляем энтропию
    this.#collapseCellOptions(rules, tileTypes);

    // Копируем стартовую сетку чтобы попробовать снова
    const initGrid = this.currentLayerGrid;

    let j = 0;

    while (j < 10e6) {
      // Выбираем рандомную ячейку для коллапса по минимально возможным тайлам
      const cell = this.#defineCellToUpdate();

      // Устанавливаем ячейке рандомный тайл из доступных
      this.#setRandomTileByIndex(cell, tileMapToWeight);

      try {
        // Обновляем энтропию
        this.#collapseCellOptions(rules, tileTypes);
      } catch (e) {
        console.log('Ошибка генерации, итераций: ', j);

        this.currentLayerGrid = initGrid;
      }

      // 6. Прерываем цикл
      if (this.currentLayerGrid.array.every(({ collapsed }) => collapsed)) {
        console.log('Всего итераций: ', j);
        break;
      }

      j++;
    }

    console.timeEnd();

    return this;
  }

  #setOption(option: keyof ILayersGridOptions, value) {
    this.options = {...this.options, [option]: value }
  }

  #collapseCellOptions(rules, tileTypes) {
    const nextGrid = new Matrix<ILayersGridCell>(this.#gridX, this.#gridY);

    for (let index = 0; index < this.currentLayerGrid.array.length; index++) {
      const cell = this.currentLayerGrid.array[index];
      let options = [...tileTypes];

      // если ячейка заполнена
      const { coords } = cell;
      const [x, y] = coords;

      if (cell.collapsed) {
        nextGrid.set({ x, y }, cell);
      } else {
        // смотрим на верхнюю клетку
        if (y > 0) {
          const up = this.currentLayerGrid.get({ x, y: y - 1 });            
          let validOptions = [];

          for (const option of up.options) {
            const valid = rules[option][2];
            validOptions = validOptions.concat(valid);
          }

          options = this.#checkValid(options, validOptions);
        }

        // смотрим на правую клетку
        if (x < this.#gridX - 1) {
          const right = this.currentLayerGrid.get({ x: x + 1, y });
          let validOptions = [];

          for (const option of right.options) {
            const valid = rules[option][3];
            validOptions = validOptions.concat(valid);
          }
          options = this.#checkValid(options, validOptions);
        }

        // смотрим вниз
        if (y < this.#gridY - 1) {
          const down = this.currentLayerGrid.get({ x, y: y + 1 });
          let validOptions = [];

          for (const option of down.options) {
            const valid = rules[option][0];
            validOptions = validOptions.concat(valid);
          }
          options = this.#checkValid(options, validOptions);
        }

        // смотрим влево
        if (x > 0) {
          const left = this.currentLayerGrid.get({ x: x - 1, y });
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

    this.currentLayerGrid = nextGrid;
  }

  #setRandomTileByIndex({ coords, options }: ILayersGridCell, tileMapToWeight) {
    const optionsWeight = tileMapToWeight.filter(([tile]) => options.includes(tile));
    const pick = weightedRandomElement(optionsWeight);

    this.currentLayerGrid.set({ x: coords[0], y: coords[1] }, {
      coords,
      collapsed: true,
      options: [pick],
    });
  }

  #defineCellToUpdate(): ILayersGridCell {
    // сортируем нассив чтобы найти элементы с наименьшей энтропией
    let gridCopy = this.currentLayerGrid.array.slice();

    gridCopy = gridCopy.filter((el: ILayersGridCell) => !el.collapsed);

    gridCopy.sort((a: ILayersGridCell, b: ILayersGridCell) => {
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