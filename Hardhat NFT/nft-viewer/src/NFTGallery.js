import React, {useState, useEffect} from "react";
import { BrowserProvider, Contract } from "ethers";
import axios from "axios";
import contractJSOn from "./abi/MyNFT.json";
import "./NFTGallery.css"

const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const CONTRACT_ABI = contractJSOn.abi;

const NFTGallery = ()=> {
    const [nfts, setNFTs] = useState([]);
    const [walletAddress, setWalletAddress] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        fetchNFT()
    },[]);

    async function connectWallet(){
        if(!window.ethereum){
            alert("Please install Metamask");
            return;
        }
        try{
            const web3Provider = new BrowserProvider(window.ethereum);
            const signer = await web3Provider.getSigner();
            const walletAddr = await signer.getAddress();
            setWalletAddress(walletAddr);
            fetchNFT();
        }
        catch(error){
            console.log("Error connecting wallet", error);
        }
    }

    async function fetchNFT() {
        if(!window.ethereum){
            alert("Please install Metamask");
            return;
        }
        setLoading(true);
        setErrorMessage("");
        try{
            const web3Provider = new BrowserProvider(window.ethereum);
            const signer = await web3Provider.getSigner();
            const walletAddr = await signer.getAddress();
            setWalletAddress(walletAddr);

            const nftContract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
            const nftData = [];
            const maxTokens = 100;
            for(let tokenId=1; tokenId<=maxTokens; tokenId++){
                try{
                    const owner = await nftContract.ownerOf(tokenId);
                    if(owner.toLowerCase() === walletAddr.toLowerCase()){
                        let tokenURI = await nftContract.tokenURI(tokenId);
                        if(tokenURI.startsWith("ipfs://")){
                            tokenURI = tokenURI.replace("ipfs://", "https://ipfs.io/ipfs/")
                        }
                        const metadata = await axios.get(tokenURI);
                        let imageUrl = metadata.data.image || "";
                        
                        if(imageUrl.startsWith("ipfs://")){
                            imageUrl = imageUrl.replace("ipfs://", "https://ipfs.io/ipfs/");
                        }

                        nftData.push({
                            id:tokenId.toString(),
                            name:metadata.data.name || "Unknown NFT",
                            description: metadata.data.description || "No Description available",
                            image: imageUrl || "https://via.placeholder.com/250"
                        });
                    }
                    setNFTs(nftData);
                }
                catch(error){
                    console.log(error);
                }
            }
        }
        catch(error){
            console.log(error);
            setErrorMessage("Failed to fetch NFTs, try again later");
        }

        finally{
            setLoading(false);
        }
    }

    return(
        <div className="container">
            <h2 className="title">
                My NFT Collection
            </h2>
            {!walletAddress?(
                <button onClick={connectWallet} className="button">Connect Wallet</button>
            ):(
                <>
                <p className="wallet-text">
                    <strong>Wallet Address:</strong>
                    {walletAddress}
                </p>
                <div className="button-container">
                    <button onClick={fetchNFT} className="button">Refresh NFTs</button>
                </div>
                </>
            )}
            {loading && <p className="loading">Loading NFTs...</p>}
            {errorMessage && <p className="error">{errorMessage}</p>}
            <div className="gallery">
                {nfts.length>0 ? nfts.map((nft)=>(
                    <div key={nft.id} className="card">
                        <img src={nft.image} alt={nft.name} className="image"/>
                        <h3 className="nft-title">{nft.name}</h3>
                        <p className="nft-description">{nft.description}</p>
                    </div>
                )):!loading && <p className="no-nfts">No NFTs found</p>}
            </div>
        </div>
    )
}

export default NFTGallery;