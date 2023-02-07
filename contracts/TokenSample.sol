// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TokenSample is ERC20, Ownable {
    constructor(
        address owner,
        uint256 initAmount
    ) ERC20("Token Sample", "TSC") {
        transferOwnership(owner);
        _mint(owner, initAmount);
    }

    function mint(uint256 amount) public onlyOwner {
        _mint(msg.sender, amount);
    }

    function burn(uint256 amount) public onlyOwner {
        _burn(msg.sender, amount);
    }
}
