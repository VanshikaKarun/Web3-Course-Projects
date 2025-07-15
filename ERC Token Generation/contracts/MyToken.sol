// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyToken is ERC20, Ownable {
    constructor(address initialOwner) ERC20("MyToken", "MTK") Ownable(initialOwner){
        _mint(initialOwner, 100000*10**decimals());
    }

    // earning
    function mint(address to, uint256 amount) public{
        _mint(to, amount);
    }

    // spending
    function burn(uint256 amount) public{
        _burn(msg.sender, amount);
    }
}