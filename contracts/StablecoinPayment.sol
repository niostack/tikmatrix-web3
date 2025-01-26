// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract StablecoinPayment {
    address public owner;
    IERC20 public stablecoin;
    string public deliveryLink;

    event PaymentReceived(
        address indexed from,
        uint256 amount,
        string deliveryLink
    );

    constructor(address stablecoinAddress, string memory _deliveryLink) {
        require(stablecoinAddress != address(0), "Invalid stablecoin address");
        require(bytes(_deliveryLink).length > 0, "Invalid delivery link");
        owner = msg.sender;
        stablecoin = IERC20(stablecoinAddress);
        deliveryLink = _deliveryLink;
    }

    function receivePayment(uint256 amount) public {
        require(amount > 0, "Amount must be greater than 0");
        stablecoin.transferFrom(msg.sender, owner, amount);
        emit PaymentReceived(msg.sender, amount, deliveryLink);
    }
}
