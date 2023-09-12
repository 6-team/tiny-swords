import { Layers } from "../layers/layers";
import { LAYER_MAIN_RULES, LAYER_MAIN_WEIGHT } from "../layers/rules/ground";
import { LAYER_ADDITIONAL_BOUNDARY_CONDITIONS, LAYER_ADDITIONAL_EMPTY_CONDITIONS, LAYER_ADDITIONAL_HOUSE_CONDITIONS, LAYER_ADDITIONAL_SIGN_CONDITIONS, LAYER_ADDITIONAL_TREE_BOTTOM_CONDITIONS, LAYER_ADDITIONAL_WATER_CONDITIONS } from "../layers/templates/additional";
import { LAYER_DECO_GROUND_CONDITIONS, LAYER_DECO_WATER_CONDITIONS } from "../layers/templates/deco";
import { LAYER_FOREGROUND_HOUSE_CONDITIONS, LAYER_FOREGROUND_TREE_TOP_CONDITIONS } from "../layers/templates/foreground";
import { LAYER_MAIN_TEMPLATE_BRIDGE_CENTER, LAYER_MAIN_TEMPLATE_LEFT_HOUSE, LAYER_MAIN_TEMPLATE_RIGHT_HOUSE, LAYER_MAIN_TEMPLATE_WATER_BORDER_1 } from "../layers/templates/main";
import { LAYERS, LAYERS_LIST, SIZE_X, SIZE_Y } from "./level.const";

export class Level {
  #layersGrid;
  #level = 1;

  constructor() {
    this.#layersGrid = new Layers(SIZE_X, SIZE_Y, LAYERS_LIST);
  }

  init() {
    console.time();

    /**
     * Создаем основную структуру карты со слоями
     */

    this.#layersGrid
      .fill([LAYER_ADDITIONAL_WATER_CONDITIONS])            // заполняем ячейки слоя water тайлами воды
      .switch(LAYERS.MAIN)                                  // переключаемся на слой main
      .fill([
        LAYER_MAIN_TEMPLATE_WATER_BORDER_1,                 // заполняем ячейки слоя main тайлами воды по границе карты
        LAYER_MAIN_TEMPLATE_LEFT_HOUSE,                     // ставим поверхность для левого дома
        LAYER_MAIN_TEMPLATE_RIGHT_HOUSE,                    // ставим поверхность для правого дома
        LAYER_MAIN_TEMPLATE_BRIDGE_CENTER,                  // ставим мост в середину
      ])
      .wfc(LAYER_MAIN_RULES, LAYER_MAIN_WEIGHT)             // заполняем остальные ячейки алгоритмом wfc
      .switch(LAYERS.SHADOW)                                // переключаемся на слой shadow
      .fill([
        LAYER_ADDITIONAL_EMPTY_CONDITIONS                   // заполняем ячейки под мостами тайлами тени и земли
      ], LAYERS.MAIN)
      .switch(LAYERS.DECO)                                  // переключаемся на слой deco
      .fill([
        LAYER_DECO_WATER_CONDITIONS,                        // заполняем ячейки тайлами декораций
        LAYER_DECO_GROUND_CONDITIONS,                       // заполняем ячейки тайлами поверхности
      ], LAYERS.MAIN)
      .switch(LAYERS.ADD)                                   // переключаемся на слой additional
      .fill([
        LAYER_ADDITIONAL_HOUSE_CONDITIONS,                  // заполняем ячейки тайлами нижней части дома
        LAYER_ADDITIONAL_TREE_BOTTOM_CONDITIONS,            // заполняем ячейки тайлами нижней части дерева
      ])
      .switch(LAYERS.SIGN)                                  // переключаемся на слой sign
      .fill([LAYER_ADDITIONAL_SIGN_CONDITIONS])             // заполняем ячейки тайлами знаков
      .switch(LAYERS.FOREG)                                 // переключаемся на слой foreground
      .fill([
        LAYER_FOREGROUND_HOUSE_CONDITIONS,                  // заполняем ячейки тайлами верхней части дома
        LAYER_FOREGROUND_TREE_TOP_CONDITIONS,               // заполняем ячейки тайлами верхней части дерева
      ], LAYERS.ADD)
      .switch(LAYERS.BOUND)
      .fill([LAYER_ADDITIONAL_BOUNDARY_CONDITIONS]);        // заполняем границы

    console.timeEnd();

    const {
      options,                           
      maps,                                                 // карты для рендера
      boundaries,                                           // границы
    } = this.#layersGrid;

    return {
      maps,
      boundaries,
      layers: LAYERS,
      ...options,
    };
  }

  next() {
    this.#layersGrid = new Layers(SIZE_X, SIZE_Y, LAYERS_LIST);

    return this.init();
  }
}