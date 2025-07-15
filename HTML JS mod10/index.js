console.log("Hi");
import { ethers } from "https://cdn.jsdelivr.net/npm/ethers@5.7.2/dist/ethers.esm.min.js";
import {abi, contractAddress} from "./constants.js";

let connectButton = document.getElementById("connectButton");
connectButton.onclick = connect;

let fundButton = document.getElementById("fund");
fundButton.onclick = fund;

let getBalanceButton = document.getElementById("getBalance");
getBalanceButton.onclick = getBalance;

let withdrawButton = document.getElementById("withdraw");
withdrawButton.onclick = withdraw;

async function connect() {
    // ethereum object in the browser is required to connect to the blockchain
    // typeof returns a string indicating the type of a given operand
    // typeof "Hello" // "string"
    if (typeof window.ethereum !== "undefined") {
        try {
            await ethereum.request({ method: "eth_requestAccounts" });
        }
        catch (error) {
            console.log(error);
        }
        connectButton.innerHTML = "Connected";
        const accounts = await ethereum.request({ method: "eth_accounts" });
        console.log(accounts);
    }
    else {
        connectButton.innerHTML = "Please Install MetaMask";
    }
}

async function fund() {
    const ethAmount = document.getElementById("ethAmount").value;
    console.log(`Funding with ${ethAmount}....`);
    if(typeof window.ethereum !== "undefined"){
        // we need provider/connection to blockchain
        // signer/wallet/someone with the gas
        // contract
        // abi @ address
        
        // creating a web3 provider from metamask
        const provider = new ethers.providers.Web3Provider(window.ethereum); // here metamask is the provider

        // signer is the currently connected acc
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, abi, signer);
        try{
            const txnResp = await contract.fund({value:ethers.utils.parseEther(ethAmount)});
            await listenTxnMine(txnResp, provider);
        }
        catch(error){
            console.log(error);
        }
    }
    else{
        fundButton.innerHTML = "Please install metamask";
    }
}

function listenTxnMine(txnResp, provider){
    console.log(`Mining ${txnResp.hash}`);
    return new Promise((resolve, reject) => {
        try{
            provider.once(txnResp.hash, (txnReceipt) => {
                console.log(`Completed with ${txnReceipt.confirmations} confirmations`);
                resolve();
            });
        }
        catch(error){
            reject(error);
        }
    });
}

async function getBalance() {
    console.log("getBalance function called");
    if(typeof window.ethereum!=="undefined"){
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        
        const signer = provider.getSigner();

        const balanceAcc = await provider.getBalance(signer.getAddress());
        console.log(`Balance of Account connected: ${ethers.utils.formatEther(balanceAcc)} ETH`);

        const balanceContract = await provider.getBalance(contractAddress);
        console.log(`Balance of Account connected: ${ethers.utils.formatEther(balanceContract)} ETH`);
    }
    else {
        console.log("MetaMask not detected");
    }
}

async function withdraw() {
    if(typeof window.ethereum !== "undefined"){
        console.log("Withdrawing....");

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        const contract = new ethers.Contract(contractAddress, abi, signer);

        try{
            const txnResp = await contract.withdraw();

            await listenTxnMine(txnResp, provider);
        }
        catch(error){
            console.log(error);
        }
    }
    else {
        console.log("MetaMask not detected");
    }
}