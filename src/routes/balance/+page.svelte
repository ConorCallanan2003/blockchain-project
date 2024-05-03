<script lang="ts">
	import Web3 from 'web3';
	import { wallet_pk } from '../pk_store';
	import { ABI } from '../../abi';
	let contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;

	let walletBalance = '';
	let walletTicketBalance = '';

	var web3 = new Web3(import.meta.env.VITE_TESTNET_URL);

	let loading = false;

	let privateKey: string;

	wallet_pk.subscribe((newVal) => (privateKey = newVal));

	const onClick = async () => {
		var wallet = web3.eth.accounts.privateKeyToAccount(privateKey);

		var contract = new web3.eth.Contract(ABI, contractAddress);

		loading = true;
		const walletBalanceWei = (await web3.eth.getBalance(wallet.address)).toString();

		const checkBalance = contract.methods.balanceOf(wallet.address);

		walletTicketBalance = await checkBalance.call();

		walletBalance = web3.utils.fromWei(walletBalanceWei, 'ether') + 'ETH';

		loading = false;
	};
</script>

<h1 class="text-4xl font-bold pt-8 pb-10">Check your balance</h1>
<div class="flex flex-col h-[400px] gap-8 justify-evenly items-center">
	<div class="flex flex-col">
		<h1 class="text-3xl text-center font-bold">Wallet Balance: {walletBalance}</h1>
		<h1 class="text-3xl text-center font-bold">No. of Tickets: {walletTicketBalance}</h1>
	</div>
	<div>
		{#if loading}
			<button
				on:click={onClick}
				class="px-4 py-2 animate-loading-button w-[300px] h-[80px] text-3xl text-white font-bold rounded-3xl bg-gray-200 hover:bg-gray-300 hover:scale-105 active:scale-125 bg-[linear-gradient(to_right,theme(colors.indigo.400),theme(colors.sky.400),theme(colors.fuchsia.400),theme(colors.sky.400),theme(colors.indigo.400))] bg-[length:200%_auto] animate-gradient"
			>
				Checking
			</button>
		{:else}
			<button
				on:click={onClick}
				class="px-4 py-2 w-[300px] h-[80px] text-3xl font-bold rounded-3xl bg-gray-200 hover:bg-gray-300 hover:scale-105 duration-200"
			>
				Check
			</button>
		{/if}
	</div>
</div>
<p></p>
