import { writable } from 'svelte/store';

const isActiveCloseButton = writable(false);
export { isActiveCloseButton };
