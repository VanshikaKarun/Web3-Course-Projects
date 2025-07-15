// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyNFT is ERC721URIStorage, Ownable {
    // to keep a track of total NFTs created
    uint256 private _tokenIds; 

    constructor() ERC721("MyNFT", "MFT") Ownable(msg.sender){}

    function mintNFT(address recipient, string memory tokenURI) public onlyOwner returns(uint256){
        _tokenIds++;
        uint256 newNFTId = _tokenIds;

        // these functions we can use directly cause we are using openzeppelin
        _mint(recipient, newNFTId);
        _setTokenURI(newNFTId, tokenURI); // linking
        return newNFTId;
    }
}