const hre = require("hardhat");

async function main(){
    const [owner] = await hre.ethers.getSigners();
    const myToken = await hre.ethers.getContractAt("MyToken", "0x5FbDB2315678afecb367f032d93F642f64180aa3");

    console.log(`Buring 500 MTK tokens from ${owner.address}`);

    const txn = await myToken.burn(hre.ethers.parseUnits("500", 18));

    await txn.wait();

    console.log("Burnt successfully");
}

main().catch((error) => {
    console.error(error);
    process.exitCode(1);
})