const {ethers} = require("hardhat")

// whenever we use await the function should be asyncronous
async function main(){
    // the abi and bytecode is automatically fetched from artifacts folder because we are using hardhat
    // hardhat provides us the development env
    // provides us configuration of the wallet

    const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
    const contract = await SimpleStorageFactory.deploy();

    console.log(`Deployed to: ${contract.target}`);
    // console.log(contract);

    console.log("Storing value 7...");
    const transactionResponse = await contract.store(7);
    console.log("Waiting for confirmation...");
    await transactionResponse.wait(1);
    console.log("Retrieving stored value...");
    const updatedVal = await contract.retrieve();
    console.log(`Current value: ${updatedVal}`);

}


// promise
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });