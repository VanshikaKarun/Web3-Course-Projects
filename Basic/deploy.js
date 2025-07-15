const ethers = require("ethers");
const fs = require("fs");

async function main() {
    const provider = new ethers.JsonRpcProvider("http://127.0.0.1:7545"); // Ganache
    const privateKey = "0x841e7ee56fc76acb56b7db6fcd9209b8e3f31afcc996122d4d1e174a0c9a80a4"; // Check this matches Ganache

    const wallet = new ethers.Wallet(privateKey, provider);

    const abi = fs.readFileSync("SimpleStorage_sol_SimpleStorage.abi", "utf8");
    const binary = fs.readFileSync("SimpleStorage_sol_SimpleStorage.bin", "utf8");

    const factory = new ethers.ContractFactory(abi, binary, wallet);
    console.log("Deploying contract...");
    console.log("BIN length:", binary.length);

    const contract = await factory.deploy(); // No constructor args
    await contract.deployed();

    console.log("Contract deployed to:", contract.target); // ethers v6

    // nonce uniquely identify the txn

    /*
    let nonce = await provider.getTransactionCount(wallet.address);
    tx = {
        nonce:nonce,
        gasPrice:20000000000,
        garLimit:6721975,
        to:null,
        value:0,
        data:"0x60806040525f5f553480156011575f5ffd5b506101d08061001f5f395ff3fe608060405234801561000f575f5ffd5b5060043610610034575f3560e01c80632e64cec114610038578063dde0f41314610056575b5f5ffd5b610040610072565b60405161004d91906100a7565b60405180910390f35b610070600480360381019061006b91906100ee565b61007a565b005b5f5f54905090565b80826100869190610159565b5f819055505050565b5f819050919050565b6100a18161008f565b82525050565b5f6020820190506100ba5f830184610098565b92915050565b5f5ffd5b6100cd8161008f565b81146100d7575f5ffd5b50565b5f813590506100e8816100c4565b92915050565b5f5f60408385031215610104576101036100c0565b5b5f610111858286016100da565b9250506020610122858286016100da565b9150509250929050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52601160045260245ffd5b5f6101638261008f565b915061016e8361008f565b92508282019050828112155f8312168382125f8412151617156101945761019361012c565b5b9291505056fea2646970667358221220eb29a7d7863f1aa3f9cd93076b9b7dc4c1a2b844914a9e636ca68de7ffdac7c364736f6c634300081e0033",
        chainId:5777
    }

    console.log("Deploying another contract...");
    let resp = await wallet.signTransaction(tx);
    const sendTxResponse = await wallet.sendTransaction(tx);
    console.log(resp);
    */
    let cres = await contract.retrieve();
    console.log(cres);

    console.log("Adding...");
    console.log(`Current value of res: ${cres}`);
    let store = await contract.store(2,9);
    let res = await contract.retrieve();
    console.log(`New value of res: ${res}`);
}

main().catch((error) => {
    console.error("Error:", error);
    process.exit(1);
});
