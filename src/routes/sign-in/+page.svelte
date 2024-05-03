<script lang="ts" context="module">
	import { goto } from '$app/navigation';
	import Web3 from 'web3';
	import { wallet_pk } from '../pk_store';
	const web3 = new Web3(import.meta.env.VITE_TESTNET_URL);
	let privateKey = '';
	let error = '';

	const submitAddress = () => {
		let wallet;
		try {
			wallet = web3.eth.accounts.privateKeyToAccount(privateKey);
		} catch (e) {
			error = 'Please enter a valid wallet address';
			return;
		}
		if (wallet) {
			console.log(wallet);

			wallet_pk.set(wallet.privateKey);
			goto('/');
		} else {
			error = 'Please enter a valid wallet address';
		}
	};

	const clearError = () => {
		error = '';
	};
</script>

<div class="w-full h-full">
	<div class="flex flex-col pt-20 justify-center items-center">
		<div class="w-[400px] h-[280px] border-2 rounded-3xl px-8 flex flex-col justify-evenly">
			<h1 class="text-4xl text-center pt-2 font-bold">Add Wallet</h1>
			<div class="flex pt-2 flex-col justify-between">
				<label for="wallet-address">Wallet Private Key</label>
				<input
					on:input={clearError}
					class="px-4 py-2 border-2 border-gray-200 rounded-xl"
					bind:value={privateKey}
					id="wallet-address"
					placeholder="0x93D7B98c1c7390A72c46Fd1017C311f248fF8787"
				/>
				<p class="text-sm text-red-500">{error}</p>
			</div>
			<button
				on:click={submitAddress}
				class="w-full bg-gray-300 hover:scale-105 text-lg font-bold hover:bg-black duration-200 text-black hover:text-white rounded-2xl py-3 duration-200"
				>Submit</button
			>
		</div>
	</div>
</div>
