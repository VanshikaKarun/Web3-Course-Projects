const {ethers} = require("hardhat");

async function main(){
    const FundMeContractFactory = await ethers.getContractFactory("Fundme");
    console.log("Deploying contract...");
    const contract = await FundMeContractFactory.deploy();
    console.log(`Deployed to: ${contract.target}`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });