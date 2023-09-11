import { TileName } from "../renderer/renderer.const"

export const enum RoleType {
  ENTER = 'enter',
  EXIT = 'exit',
}

export type LayerConditionType = {
  tile: TileName;
  coords: [number, number];
  role?: RoleType,
}