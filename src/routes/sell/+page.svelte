<script lang="ts">
	import Web3 from 'web3';
	import { wallet_pk } from '../pk_store';
	import Dialog from '../components/Dialog.svelte';
	import { ABI } from '../../abi';
	let dialog: any;

	let contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;
	let tokenCost = import.meta.env.VITE_TOKEN_COST;

	let quantity: number;

	var web3 = new Web3(import.meta.env.VITE_TESTNET_URL);

	let loading = false;

	let privateKey: string;

	wallet_pk.subscribe((newVal) => (privateKey = newVal));

	const onClick = async () => {
		loading = true;

		var wallet = web3.eth.accounts.privateKeyToAccount(privateKey);

		var contract = new web3.eth.Contract(ABI, contractAddress);

		var transaction = contract.methods.sell(quantity);

		var encodedABI = transaction.encodeABI();

		var tx = {
			from: wallet.address,
			to: contractAddress,
			data: encodedABI,
			gas: 2000000,
			gasPrice: await web3.eth.getGasPrice()
		};

		web3.eth.accounts.signTransaction(tx, privateKey).then(function (signedTx) {
			console.log('Transaction signed...');
			web3.eth.sendSignedTransaction(signedTx.rawTransaction).on('receipt', function (receipt) {
				console.log(receipt);
				dialog.showModal();
				loading = false;
			});
		});
	};

	const closeDialog = () => {
		dialog.close();
		loading = false;
	};
</script>

<div class="flex flex-col px-8 py-16 w-full h-[700px] justify-start items-center">
	<Dialog bind:dialog on:close={() => console.log('closed')}>
		<div class="flex p-4 flex-col justify-between">
			<h1 class="text-3xl font-bold pb-4">Success!</h1>
			<h2>You have sold {quantity} tokens!</h2>
			<div class="flex pt-4 justify-end">
				<button
					on:click={closeDialog}
					class="px-4 py-2 text-lg rounded-lg bg-blue-500 hover:bg-blue-400 hover:scale-105 text-white font-bold duration-200"
					>Okay</button
				>
			</div>
		</div>
	</Dialog>
	<h1 class="text-5xl font-bold pb-10">Sell Ticket(s)</h1>
	<div
		class="w-[600px] h-[240px p-8 flex flex-col gap-4 border-lg border-2 border-gray-200 rounded-2xl"
	>
		<div class="flex flex-col">
			<label class="text-lg font-medium" for="quantity">Quantity</label>
			<input
				type="number"
				bind:value={quantity}
				class="px-4 py-2 border-2 border-gray-200 rounded-xl"
				id="quantity"
			/>
		</div>
		{#if quantity > 0}
			<p class="text-xl font-medium">
				Value: {web3.utils.fromWei(tokenCost * quantity, 'ether')} ETH
			</p>
		{/if}
		{#if loading}
			<button
				on:click={onClick}
				class="px-4 py-2 animate-loading-button w-full h-[60px] text-2xl text-white font-bold rounded-lg bg-gray-200 hover:bg-gray-300 hover:scale-105 active:scale-125 bg-[linear-gradient(to_right,theme(colors.indigo.400),theme(colors.sky.400),theme(colors.fuchsia.400),theme(colors.sky.400),theme(colors.indigo.400))] bg-[length:200%_auto] animate-gradient"
			>
				Selling
			</button>
		{:else}
			<button
				on:click={onClick}
				class="px-4 py-2 text-gray-800 w-full h-[60px] text-2xl font-bold rounded-lg bg-gray-200 hover:bg-gray-300 hover:scale-105 duration-200"
			>
				Sell
			</button>
		{/if}
	</div>
</div>
