const {ethers, getNamedAccounts} = require("hardhat");

async function main(){
    const {deployer} = await getNamedAccounts();
    const fundme = await ethers.getContractAt("Fundme", "0x9A0670AAa1bDE6e4b6E09f1d5f2880f977B49F1B");

    console.log(`Interacting with Fundme at ${fundme.target}`);

    const tx = await fundme.fund({value:ethers.parseEther("0.001")}); // to convert in ethers

    await tx.wait();

    console.log("funded");

    const balance = await ethers.provider.getBalance(fundme.target);
    console.log(`Contract balance: ${ethers.formatEther(balance)} ETH`);

    console.log("Withdraw funds...");

    const withdrawTx = await fundme.withdraw();

    await withdrawTx.wait();

    console.log("Withdraw successfull");
    const bal = await ethers.provider.getBalance(fundme.target);

    console.log(`Contract Balance: ${ethers.formatEther(bal)} ETH`);
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});