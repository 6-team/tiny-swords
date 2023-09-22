import { writable } from 'svelte/store';
import { Level } from '../core/level/level';

type LevelParts = ReturnType<Level['next']>;

export const boundariesStore = writable<LevelParts['boundaries']>(null);
export const startCoordsStore = writable<LevelParts['startCoords']>(null);
export const endCoordsStore = writable<LevelParts['endCoords']>(null);
export const mapsStore = writable<LevelParts['maps']>(null);
