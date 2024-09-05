// Setup: npm install alchemy-sdk
import { Alchemy, Network } from "alchemy-sdk";

const config = {
    apiKey: "ObRBmbXEtBVr6aVMb4XE4yPd7FajQh63",
    network: Network.ETH_MAINNET,
};
const alchemy = new Alchemy(config);

const main = async () => {
    // Get all NFTs
    const nfts = await alchemy.nft.getNftsForOwner("0xAB38Faa6aba27921E54Cf2E740B9BdE0d3Ee3994");
    // Print NFTs
    console.log(nfts);
};

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

runMain();