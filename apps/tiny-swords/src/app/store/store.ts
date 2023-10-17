import { writable } from 'svelte/store';

const isActiveCloseButtonStore = writable(false);
const isActiveMenuItemStore = writable('');
const nextLevelMenu = writable(false);
const isMainMenuStore = writable(true);
const isMuttedStore = writable(false);

const endGameMenuStore = writable(false);

const multiplayerStore = writable(false);

export {
  multiplayerStore,
  isActiveCloseButtonStore,
  isActiveMenuItemStore,
  nextLevelMenu,
  isMainMenuStore,
  isMuttedStore,
  endGameMenuStore,
};
