<script lang="ts">
	import Web3 from 'web3';
	import { wallet_pk } from '../pk_store';
	import { ABI } from '../../abi';
	let contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;
	let address: string;

	let numOfTickets: number;

	var web3 = new Web3(import.meta.env.VITE_TESTNET_URL);

	let loading = false;

	const onClick = async () => {
		var contract = new web3.eth.Contract(ABI, contractAddress);

		loading = true;
		const walletBalanceWei = (await web3.eth.getBalance(address)).toString();

		const checkBalance = contract.methods.balanceOf(address);

		numOfTickets = await checkBalance.call();

		loading = false;
	};
</script>

<h1 class="text-4xl font-bold pt-8 pb-10">Check your balance</h1>
<div class="flex flex-col h-[400px] w-1/3 gap-8 justify-evenly items-center">
	<div class="flex flex-col w-full">
		<h1 class="text-3xl text-center font-bold">No. of Tickets: {numOfTickets ?? ''}</h1>
	</div>
	<div class="flex pt-2 w-full flex-col justify-between">
		<label class="text-lg" for="wallet-address">Wallet Public Key</label>
		<input
			class="px-4 py-2 text-lg border-2 border-gray-200 rounded-xl"
			bind:value={address}
			id="wallet-address"
			placeholder="0x93D7B98c1c7390A72c46Fd1017C311f248fF8787"
		/>
	</div>
	<div class="w-full">
		{#if loading}
			<button
				on:click={onClick}
				class="px-4 py-2 animate-loading-button w-full h-[60px] text-2xl text-white font-bold rounded-3xl bg-gray-200 hover:bg-gray-300 hover:scale-105 active:scale-125 bg-[linear-gradient(to_right,theme(colors.indigo.400),theme(colors.sky.400),theme(colors.fuchsia.400),theme(colors.sky.400),theme(colors.indigo.400))] bg-[length:200%_auto] animate-gradient"
			>
				Checking
			</button>
		{:else}
			<button
				on:click={onClick}
				class="px-4 py-2 w-full h-[60px] text-2xl font-bold rounded-3xl bg-gray-200 hover:bg-gray-300 hover:scale-105 duration-200"
			>
				Check
			</button>
		{/if}
	</div>
</div>
<p></p>
