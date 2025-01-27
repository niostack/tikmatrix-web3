// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract StablecoinPayment {
    address public owner;
    address public stablecoinAddress;
    string public deliveryLink;

    event PaymentReceived(
        address indexed from,
        uint256 amount,
        string deliveryLink
    );

    constructor(address _stablecoinAddress, string memory _deliveryLink) {
        require(_stablecoinAddress != address(0), "Invalid stablecoin address");
        require(bytes(_deliveryLink).length > 0, "Invalid delivery link");
        owner = msg.sender;
        stablecoinAddress = _stablecoinAddress;
        deliveryLink = _deliveryLink;
    }

    function receivePayment(uint256 amount) public {
        require(amount > 0, "Amount must be greater than 0");
        emit PaymentReceived(msg.sender, amount, deliveryLink);
    }
}
