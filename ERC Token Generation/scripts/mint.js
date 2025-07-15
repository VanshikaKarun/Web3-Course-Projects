const hre = require("hardhat");

async function main() {
    const [owner] = await hre.ethers.getSigners();
    const myToken = await hre.ethers.getContractAt("MyToken", "0x5FbDB2315678afecb367f032d93F642f64180aa3");
    console.log(`Minting 1000 MTK to: ${owner.address}`);

    const txn = await myToken.mint(owner, hre.ethers.parseUnits("1000", 18));

    await txn.wait();

    console.log("Miniting is successfull");
}

main().catch((error) => {
    console.error(error);
    process.exitCode(1);
})