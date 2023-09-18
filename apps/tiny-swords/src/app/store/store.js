import { writable } from 'svelte/store';

const isActiveCloseButton = writable(false);
const isActiveMenuItem = writable('');
const nextLevelMenu = writable(false);
const isMainMenu = writable(true);
export { isActiveCloseButton, isActiveMenuItem, nextLevelMenu, isMainMenu };
