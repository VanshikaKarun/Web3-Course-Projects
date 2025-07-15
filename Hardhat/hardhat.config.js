require("@nomicfoundation/hardhat-toolbox");

require("dotenv").config();
require("hardhat-deploy");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  
  namedAccounts:
  {
    deployer:{
      default:0 // deploy with the first acc
    },
  },

  // hardhat has its own network but we can externally add more networks too

  networks: {
    sepolia:{ //  testnet (test network) for the Ethereum blockchain
      url: process.env.SEPOLIA_URL,
      accounts: [
        process.env.PRIVATE_KEY
      ],
      chainId: 11155111,
    }
  }
};
