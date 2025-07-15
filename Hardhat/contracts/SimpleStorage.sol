// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0;

contract SimpleStorage {
    int public num;

    function store(int _num) public {
        num = _num;
    }

    function retrieve() public view returns(int){
        return num;
    }
}