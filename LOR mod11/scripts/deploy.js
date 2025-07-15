const {ethers} = require("hardhat");

async function main(){
    const LORContractFactory = await ethers.getContractFactory("LOR");
    console.log("Deploying contracts....");
    const contract = await LORContractFactory.deploy();
    console.log(`Deployed to: ${contract.target}`);
    // 0xcAc071128ec5822d505Ce23B5e441e9293395B99 sepolia
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exitCode = 1;
    });