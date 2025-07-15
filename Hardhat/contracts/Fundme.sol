// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0;

contract Fundme{
    address public owner;
    mapping(address=>uint256) public atf;
    constructor(){
        owner = msg.sender;
    }

    function fund() public payable{
        require(msg.value>0, "You neeed to send some ETH");
        atf[msg.sender] = atf[msg.sender]+msg.value;
    }

    function withdraw() public{
        require(msg.sender==owner, "Only owner can withdraw");
        (bool success,) = payable(owner).call{value:address(this).balance}("");
        require(success, "withdraw failed");
    }

    function getBalance() public view returns(uint256){
        return address(this).balance;
    }

    function getFunderContribution(address funder) public view returns(uint256){
        return atf[funder];
    }
}