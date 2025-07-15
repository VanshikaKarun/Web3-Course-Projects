import './App.css';
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import RequestLetter from './components/RequestLetter';
import ApprovedLetter from './components/ApprovedLetter';
import GetDetails from './components/GetDetails';

import abi from "./contracts/LOR.json";

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });

  useEffect(() => {
    const connectWallet = async () => {
      const contractAddress = "0xcAc071128ec5822d505Ce23B5e441e9293395B99";

      const contractABI = abi.abi;

      try {
        const { ethereum } = window;

        if (ethereum) {
          const account = await ethereum.request({
            method: "eth_requestAccounts",
          });

          console.log(account[0]);

          const provider = new ethers.BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();

          const contract = new ethers.Contract(
            contractAddress,
            contractABI,
            signer
          );

          setState({ provider, signer, contract });
        }
        else {
          alert("Please install Metamask");
        }
      }
      catch (error) {
        console.log(error);
      }
    };
    connectWallet();
  }, []);

  return (
    <div>
      <RequestLetter state={state}/>
      <ApprovedLetter state={state}/>
      <GetDetails state={state}/>
    </div>
  );
}

export default App;
