import { writable } from 'svelte/store';

const isActiveCloseButtonStore = writable(false);
const isActiveMenuItemStore = writable('');
const isNextLevelMenuStore = writable(false);
const isMainMenuStore = writable(true);
const isMuttedStore = writable(false);

export { isActiveCloseButtonStore, isActiveMenuItemStore, isNextLevelMenuStore, isMainMenuStore, isMuttedStore };
