<script lang="ts">
	import { getAllContexts, getContext } from 'svelte';
	import NavbarItem from './navbar-item.svelte';
	import { wallet_pk } from '../pk_store';

	let pk: string;
	wallet_pk.subscribe((newValue) => {
		pk = newValue;
	});

	const signOut = () => {
		wallet_pk.set('');
	};
</script>

<div class="w-full px-8 h-12 flex justify-between items-center">
	<h1 class="font-bold text-2xl select-none cursor-pointer">Web3 Bullshit™</h1>
	<div class="flex gap-6 [&_*]:select-none [&_*]:cursor-pointer justify-between items-center">
		{#if pk}
			<NavbarItem name="Home" path="/" />
			<NavbarItem name="Buy" path="/buy" />
			<NavbarItem name="Sell" path="/sell" />
			<NavbarItem name="Send" path="/send" />
			<NavbarItem name="Balance" path="/balance" />
			<button
				on:click={signOut}
				class="px-6 py-2 group hover:bg-gray-800 hover:scale-105 duration-200 rounded-lg"
			>
				<p class="font-medium text-black group-hover:text-white text-xl duration-200">Sign out</p>
			</button>
		{:else}
			<NavbarItem name="Check tickets" path="/check-tickets" />
			<NavbarItem name="Add Wallet" path="/sign-in" />
		{/if}
	</div>
</div>
