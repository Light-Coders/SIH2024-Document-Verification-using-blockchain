import { ethers } from "ethers";
import ERC721_ABI from "../abis/erc721ABI.json";

async function fetchNFTsByAddress(
    provider: ethers.Provider,
    contractAddress: string,
    userAddress: string
) {
    const contract = new ethers.Contract(contractAddress, ERC721_ABI, provider);

    // Get the number of NFTs the user owns
    const balance = await contract.balanceOf(userAddress);
    console.log(`Address ${userAddress} owns ${balance.toString()} NFTs`);

    const nfts = [];

    for (let i = 0; i < balance; i++) {
        const tokenId = await contract.tokenOfOwnerByIndex(userAddress, i);
        const tokenURI = await contract.tokenURI(tokenId);
        nfts.push({ tokenId: tokenId.toNumber(), tokenURI });
    }

    return nfts;
}

async function main() {
    // Initialize provider (e.g., using Infura, Alchemy, or any other provider)
    const provider = new ethers.providers.JsonRpcProvider("https://sepolia.infura.io/v3/YOUR_INFURA_PROJECT_ID");

    // Replace with your NFT contract address and user address
    const contractAddress = "0xYourNFTContractAddress"; // Replace with the NFT contract address
    const userAddress = "0xUserAddress"; // Replace with the user's Ethereum address

    const nfts = await fetchNFTsByAddress(provider, contractAddress, userAddress);

    console.log("NFTs held by the user:");
    nfts.forEach((nft, index) => {
        console.log(`NFT ${index + 1}: Token ID = ${nft.tokenId}, Token URI = ${nft.tokenURI}`);
    });
}

main().catch(console.error);
