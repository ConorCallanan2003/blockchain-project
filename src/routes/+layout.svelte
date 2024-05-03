<script lang="ts">
	import '../app.css';
	import Navbar from './components/navbar.svelte';
	import Dialog from './components/Dialog.svelte';
	import Web3 from 'web3';
	import { wallet_pk } from './pk_store';
	import { ABI } from '../abi';
	let dialog: any;
	let loading = false;

	let contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;
	var web3 = new Web3(import.meta.env.VITE_TESTNET_URL);

	let privateKey: string;
	wallet_pk.subscribe((newVal) => (privateKey = newVal));

	const confirm = async () => {
		loading = true;

		var wallet = web3.eth.accounts.privateKeyToAccount(privateKey);

		var contract = new web3.eth.Contract(ABI, contractAddress);

		var transaction = contract.methods.withdraw();

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
				dialog.close();
				loading = false;
			});
		});
	};

	const closeDialog = () => {
		dialog.close();
	};
	const openDialog = () => {
		dialog.showModal();
	};
</script>

<svelte:head>
	<title>Home</title>
	<meta name="Buy my tocken pls" content="Web3 Project" />
</svelte:head>

<div class="app">
	<main>
		<section>
			<Dialog bind:dialog on:close={() => console.log('closed')}>
				<div class="flex p-4 flex-col justify-between">
					<h1 class="text-3xl font-bold pb-4">Are you sure?</h1>
					<h2>
						If you withdrawn funds customers will no longer be able to sell back their tickets.
					</h2>
					<div class="flex pt-4 gap-4 justify-end">
						{#if !loading}
							<button
								on:click={closeDialog}
								class="px-4 py-2 text-lg rounded-lg bg-gray-200 hover:bg-gray-300 text-black font-bold duration-200"
								>Cancel</button
							>
						{/if}
						{#if loading}
							<button
								disabled
								class="px-4 py-2 text-lg rounded-lg font-bold text-white animate-loading-button bg-[linear-gradient(to_right,theme(colors.indigo.400),theme(colors.sky.400),theme(colors.fuchsia.400),theme(colors.sky.400),theme(colors.indigo.400))] bg-[length:200%_auto] animate-gradient"
								>Withdrawing</button
							>
						{:else}
							<button
								on:click={confirm}
								class="px-4 py-2 text-lg rounded-lg bg-blue-500 hover:bg-blue-400 hover:scale-105 text-white font-bold duration-200"
								>Confirm</button
							>
						{/if}
					</div>
				</div>
			</Dialog>
			<div class="w-full h-[40px] flex justify-end px-4 pt-2">
				<button
					on:click={openDialog}
					class="text-xs hover:cursor-pointer underline text-blue-600 leading-none"
				>
					Withdraw ETH (admin only)
				</button>
			</div>
			<div class="w-full h-screen px-4 pb-10 flex flex-col justify-start items-center">
				<Navbar />
				<slot />
			</div>
		</section>
	</main>
</div>
