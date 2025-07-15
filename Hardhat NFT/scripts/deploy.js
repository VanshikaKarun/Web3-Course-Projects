const hre = require('hardhat')

async function main(){
    const [deployer] = await hre.ethers.getSigners();
    const MyNFT = await hre.ethers.getContractFactory("MyNFT");
    const myNFT = await MyNFT.deploy();

    // Wait for deployment to finish
    await myNFT.waitForDeployment();

    console.log("MyNFT deployed to: ", myNFT.target);

    // Mint NFT
    const txn = await myNFT.mintNFT(deployer.address, "https://ipfs.io/ipfs/bafkreia6x7mlbamoax6pbnq7vttgajv7s37mdfipadgm25wkpy2ekiequu");
    await txn.wait();

    console.log("NFT Minted to: ", deployer.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });