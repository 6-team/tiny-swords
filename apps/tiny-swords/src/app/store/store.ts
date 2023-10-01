import { writable } from 'svelte/store';

const isActiveCloseButtonStore = writable(false);
const isActiveMenuItemStore = writable('');
const nextLevelMenu = writable(false);
const isMainMenuStore = writable(true);
const isMuttedStore = writable(false);

export { isActiveCloseButtonStore, isActiveMenuItemStore, nextLevelMenu, isMainMenuStore, isMuttedStore };
