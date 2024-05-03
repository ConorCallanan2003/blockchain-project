var TicketToken = artifacts.require('TicketToken');

module.exports = function (deployer) {
	deployer.deploy(
		TicketToken,
		'Weezer Concert',
		'WEE',
		33271000000000000n,
		500,
		'0xf4f279710dbb5b66bd08c7c65db67e25891e2930',
		1714739663
	);
};
