// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

interface IERC20 {
	function totalSupply() external view returns (uint256);
	function balanceOf(address account) external view returns (uint256);
	function transfer(address recipient, uint256 amount) external returns (bool);
	function allowance(address owner, address spender) external view returns (uint256);
	function approve(address spender, uint256 amount) external returns (bool);
	function transferFrom(
		address sender,
		address recipient,
		uint256 amount
	) external returns (bool);

	event Transfer(address indexed from, address indexed to, uint256 value);
	event Approval(address indexed owner, address indexed spender, uint256 value);
}

contract TicketToken is IERC20 {
	string public event_name;
	string public symbol;
	uint256 private _totalSupply;
	mapping(address => uint256) private _balances;
	mapping(address => mapping(address => uint256)) private _allowances;

	uint256 private _tokenPrice;
	address private _event_owner;
	uint private _event_datetime_unix;

	constructor(
		string memory _event_name,
		string memory _symbol,
		uint256 tokenPriceWEI,
		uint256 initialSupply,
		address event_owner,
		uint event_datetime_unix
	) {
		event_name = _event_name;
		symbol = _symbol;
		_totalSupply = initialSupply;
		_balances[address(this)] = _totalSupply;
		_tokenPrice = tokenPriceWEI;
		_event_owner = event_owner;
		_event_datetime_unix = event_datetime_unix;
	}

	function totalSupply() external view override returns (uint256) {
		return _totalSupply;
	}

	function balanceOf(address account) external view override returns (uint256) {
		return _balances[account];
	}

	function transfer(address recipient, uint256 amount) external override returns (bool) {
		_transfer(msg.sender, recipient, amount);
		return true;
	}

	function allowance(address owner, address spender) external view override returns (uint256) {
		return _allowances[owner][spender];
	}

	function approve(address spender, uint256 amount) external override returns (bool) {
		_approve(msg.sender, spender, amount);
		return true;
	}

	function transferFrom(
		address sender,
		address recipient,
		uint256 amount
	) external override returns (bool) {
		_transfer(sender, recipient, amount);
		_approve(sender, msg.sender, _allowances[sender][msg.sender] - amount);
		return true;
	}

	function buy(uint256 _amount) external payable returns (bool) {
		require(msg.value == _amount * _tokenPrice, 'Need to send exact amount of wei');
		require(_balances[address(this)] >= _amount, 'Sorry - all sold out');

		_transfer(address(this), msg.sender, _amount);

		_balances[address(this)] -= _amount;

		return true;
	}

	function sell(uint256 _amount) external returns (bool) {
		require(_balances[msg.sender] >= _amount, "You don't have that many tickets!");
		_balances[msg.sender] -= _amount;
		_balances[address(this)] += _amount;
		payable(msg.sender).transfer(_amount * _tokenPrice);
		return true;
	}

	function withdraw() external returns (bool) {
		require(block.timestamp > _event_datetime_unix, 'Cannot withdraw until after event');
		require(msg.sender == _event_owner, 'Only owner can trigger withdrawal');
		payable(_event_owner).transfer(address(this).balance);
		return true;
	}

	function _transfer(address sender, address recipient, uint256 amount) internal {
		require(sender != address(0), 'ERC20: transfer from the zero address');
		require(recipient != address(0), 'ERC20: transfer to the zero address');
		require(_balances[sender] >= amount, 'ERC20: transfer amount exceeds balance');

		_balances[sender] -= amount;
		_balances[recipient] += amount;
		emit Transfer(sender, recipient, amount);
	}

	function _approve(address owner, address spender, uint256 amount) internal {
		require(owner != address(0), 'ERC20: approve from the zero address');
		require(spender != address(0), 'ERC20: approve to the zero address');

		_allowances[owner][spender] = amount;
		emit Approval(owner, spender, amount);
	}
}
