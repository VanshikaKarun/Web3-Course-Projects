const hre = require("hardhat");

async function main(){
    const [deployer] = await hre.ethers.getSigners();
    console.log(`Deploying MyToken with owner: ${deployer.address}`);
    const MyToken = await hre.ethers.getContractFactory("MyToken");
    const myToken = await MyToken.deploy(deployer.address);

    console.log(`MyToken deployed at: ${myToken.target}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

/*
Deploying MyToken with owner: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
MyToken deployed at: 0x5FbDB2315678afecb367f032d93F642f64180aa3
*/