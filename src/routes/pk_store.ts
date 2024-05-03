import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export const wallet_pk = writable((browser && localStorage.getItem('store')) || '');

wallet_pk.subscribe((val) => {
	if (browser) return localStorage.setItem('store', val);
});
