<script lang="ts">
	import Web3 from 'web3';
	let contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;

	let walletBalance = '';
	let numOfTickets;
	let files: FileList;

	const ABI = [
		{
			inputs: [
				{
					internalType: 'string',
					name: '_name',
					type: 'string'
				},
				{
					internalType: 'string',
					name: '_symbol',
					type: 'string'
				},
				{
					internalType: 'uint8',
					name: '_decimals',
					type: 'uint8'
				},
				{
					internalType: 'uint256',
					name: 'initialSupply',
					type: 'uint256'
				}
			],
			stateMutability: 'nonpayable',
			type: 'constructor'
		},
		{
			anonymous: false,
			inputs: [
				{
					indexed: true,
					internalType: 'address',
					name: 'owner',
					type: 'address'
				},
				{
					indexed: true,
					internalType: 'address',
					name: 'spender',
					type: 'address'
				},
				{
					indexed: false,
					internalType: 'uint256',
					name: 'value',
					type: 'uint256'
				}
			],
			name: 'Approval',
			type: 'event'
		},
		{
			inputs: [
				{
					internalType: 'address',
					name: 'spender',
					type: 'address'
				},
				{
					internalType: 'uint256',
					name: 'amount',
					type: 'uint256'
				}
			],
			name: 'approve',
			outputs: [
				{
					internalType: 'bool',
					name: '',
					type: 'bool'
				}
			],
			stateMutability: 'nonpayable',
			type: 'function'
		},
		{
			inputs: [],
			name: 'buyToken',
			outputs: [],
			stateMutability: 'payable',
			type: 'function'
		},
		{
			inputs: [
				{
					internalType: 'address',
					name: 'recipient',
					type: 'address'
				},
				{
					internalType: 'uint256',
					name: 'amount',
					type: 'uint256'
				}
			],
			name: 'transfer',
			outputs: [
				{
					internalType: 'bool',
					name: '',
					type: 'bool'
				}
			],
			stateMutability: 'nonpayable',
			type: 'function'
		},
		{
			anonymous: false,
			inputs: [
				{
					indexed: true,
					internalType: 'address',
					name: 'from',
					type: 'address'
				},
				{
					indexed: true,
					internalType: 'address',
					name: 'to',
					type: 'address'
				},
				{
					indexed: false,
					internalType: 'uint256',
					name: 'value',
					type: 'uint256'
				}
			],
			name: 'Transfer',
			type: 'event'
		},
		{
			inputs: [
				{
					internalType: 'address',
					name: 'sender',
					type: 'address'
				},
				{
					internalType: 'address',
					name: 'recipient',
					type: 'address'
				},
				{
					internalType: 'uint256',
					name: 'amount',
					type: 'uint256'
				}
			],
			name: 'transferFrom',
			outputs: [
				{
					internalType: 'bool',
					name: '',
					type: 'bool'
				}
			],
			stateMutability: 'nonpayable',
			type: 'function'
		},
		{
			inputs: [
				{
					internalType: 'address',
					name: 'owner',
					type: 'address'
				},
				{
					internalType: 'address',
					name: 'spender',
					type: 'address'
				}
			],
			name: 'allowance',
			outputs: [
				{
					internalType: 'uint256',
					name: '',
					type: 'uint256'
				}
			],
			stateMutability: 'view',
			type: 'function'
		},
		{
			inputs: [
				{
					internalType: 'address',
					name: 'account',
					type: 'address'
				}
			],
			name: 'balanceOf',
			outputs: [
				{
					internalType: 'uint256',
					name: '',
					type: 'uint256'
				}
			],
			stateMutability: 'view',
			type: 'function'
		},
		{
			inputs: [],
			name: 'decimals',
			outputs: [
				{
					internalType: 'uint8',
					name: '',
					type: 'uint8'
				}
			],
			stateMutability: 'view',
			type: 'function'
		},
		{
			inputs: [],
			name: 'name',
			outputs: [
				{
					internalType: 'string',
					name: '',
					type: 'string'
				}
			],
			stateMutability: 'view',
			type: 'function'
		},
		{
			inputs: [],
			name: 'symbol',
			outputs: [
				{
					internalType: 'string',
					name: '',
					type: 'string'
				}
			],
			stateMutability: 'view',
			type: 'function'
		},
		{
			inputs: [],
			name: 'totalSupply',
			outputs: [
				{
					internalType: 'uint256',
					name: '',
					type: 'uint256'
				}
			],
			stateMutability: 'view',
			type: 'function'
		}
	];
	// CORS proxy https://rpc2.sepolia.org
	var web3 = new Web3('http://localhost:8010/proxy/');
	let privateKey = '';
	// let walletAddress = '';
	let recipientAddress = '';
	let walletAddressError = '';
	let privateKeyError = '';
	let keystoreError = '';

	let loading = false;

	const onType = () => {
		privateKeyError = '';
	};

	const onClick = async () => {
		// var wallet = web3.eth.accounts.privateKeyToAccount(privateKey);

		var contract = new web3.eth.Contract(ABI, contractAddress);

		if (privateKey == '') {
			privateKeyError = 'Please enter your private key';
		}

		var wallet = web3.eth.accounts.privateKeyToAccount(privateKey);

		var transaction = contract.methods.transfer(recipientAddress, 1);

		var account = web3.eth.accounts.privateKeyToAccount(privateKey);

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
			});
		});
		// var accountAddress = wallet.address;
		// await getWalletBalance();

		loading = false;
	};

	// async function getWalletBalance() {
	// 	await web3.eth.getBalance(walletAddress).then(function (balanceETH) {
	// 		const balanceInEther = web3.utils.fromWei(balanceETH, 'ether');
	// 		walletBalance = balanceInEther.slice(0, 7) + ' SETH';
	// 	});
	// }

	async function getNoOfTickets() {}
</script>

<h1 class="text-4xl font-bold pt-8 pb-10">Check your balance</h1>
<div class="flex flex-col h-[400px] gap-8 justify-start items-center">
	<div>
		<div class="pb-8">
			<label class="text-left w-full" for="wallet_address">Private Key</label>
			<input
				id="private_key"
				bind:value={privateKey}
				on:input={onType}
				placeholder="0x12345678901234567..."
				class="w-full px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 duration-200"
			/>
			<p class="text-sm text-red-500">{privateKeyError}</p>
		</div>
		<div class="pb-8">
			<label class="text-left w-full" for="wallet_address">Recipient Address</label>
			<input
				id="recipient_address"
				bind:value={recipientAddress}
				placeholder="0x12345678901234567..."
				class="w-full px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 duration-200"
			/>
			<p class="text-sm text-red-500">{privateKeyError}</p>
		</div>
		<!-- <div class="pb-6">
			<label class="text-left w-full" for="keystore">Keystore</label>
			<input
				id="keystore"
				type="file"
				bind:files
				class="px-1 py-1 file:cursor-pointer file:hover:scale-105 file:duration-200 file:font-medium file:text-gray-600 block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
			/>
			<p class="text-sm text-red-500">{keystoreError}</p>
		</div> -->
		{#if loading}
			<button
				on:click={onClick}
				class="px-4 py-2 w-full text-white font-bold rounded-lg bg-gray-200 hover:bg-gray-300 hover:scale-105 active:scale-125 duration-200 bg-[linear-gradient(to_right,theme(colors.indigo.400),theme(colors.sky.400),theme(colors.fuchsia.400),theme(colors.sky.400),theme(colors.indigo.400))] bg-[length:200%_auto] animate-gradient"
			>
				Checking
			</button>
		{:else}
			<button
				on:click={onClick}
				class="px-4 py-2 w-full font-bold rounded-lg bg-gray-200 hover:bg-gray-300 hover:scale-105 duration-200"
			>
				Check
			</button>
		{/if}
	</div>
	<div class="flex flex-col">
		<h1 class="text-3xl text-center font-bold">Wallet Balance: {walletBalance}</h1>
		<h1 class="text-3xl text-center font-bold">No. of Tickets: {walletBalance}</h1>
	</div>
</div>
<p></p>
