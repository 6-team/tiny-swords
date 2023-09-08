import { TileName } from "../../renderer/renderer.const";

export const LAYER_MAIN_TEMPLATE_BRIDGE_CENTER = [{
  tile: TileName.BRIDGE_MIDDLE,
  conditionFn: ({ x, y }) => {
    return x === 10 && y === 6;
  },
}];

export const LAYER_MAIN_TEMPLATE_GROUND_PLAYER = [{
  tile: TileName.GROUND_MIDDLE_LEFT,
  conditionFn: ({ x, y }) => {
    return x === 2 && y === 4;
  }
}];

export const LAYER_MAIN_TEMPLATE_WATER_BORDER_2 = [
  {
    tile: TileName.WATER_MIDDLE_MIDDLE,
    conditionFn: ({ x, y }) => {
      return x < 2 || x > 17 || y < 2 || y > 10;
    } 
  }
];

export const LAYER_MAIN_TEMPLATE_WATER_BORDER_3 = [
  {
    tile: TileName.WATER_MIDDLE_MIDDLE,
    conditionFn: ({ x, y }) => {
      return x < 3 || x > 16 || y < 3 || y > 9;
    } 
  }
];