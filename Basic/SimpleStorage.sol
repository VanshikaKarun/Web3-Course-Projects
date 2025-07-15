// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0;

contract SimpleStorage{
    int res=0;

    function store(int _a, int _b) public {
        res = _a + _b;
    }

    function retrieve() public view returns(int){
        return res;
    }
}