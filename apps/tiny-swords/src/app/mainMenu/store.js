import { writable } from 'svelte/store';

const isActiveCloseButton = writable(false);
const isActiveMenuItem = writable('');
export { isActiveCloseButton, isActiveMenuItem };
