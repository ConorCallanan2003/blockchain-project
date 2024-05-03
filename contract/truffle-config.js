module.exports = {
	networks: {
		development: {
			host: 'localhost',
			port: 8545,
			network_id: '*', // Match any network id
			gas: 5000000,
			gasPrice: 20000000000
		}
	},
	migrations_directory: './migrations',
	// Configure your compilers
	compilers: {
		solc: {
			version: '0.8.13'
		}
	}
};
