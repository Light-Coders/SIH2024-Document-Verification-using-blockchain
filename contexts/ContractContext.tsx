// import React, { createContext, useState, useContext, useEffect } from 'react';
// import { ethers, Contract } from 'ethers';
// import CoinbaseWalletSDK from '@coinbase/wallet-sdk';
// import Web3Modal from 'web3modal'
// import { Web3Provider } from "@ethersproject/providers"
// import abi from '../abis/abi.json';


// type ContractContextType = {
//     contract: ethers.Contract | null;
//     connectedAddress: string | null;
//     connectWallet: () => Promise<void>;
//     disconnectWallet: () => Promise<void>;
//     connected: boolean;
// };

// const ContractContext = createContext<ContractContextType | undefined>(undefined);

// const providerOptions = {
//     walletlink: {
//         package: CoinbaseWalletSDK,
//         options: {
//             appName: "Web3 Modal",
//             infuraId: process.env.NEXT_PUBLIC_INFURA_ID
//         }
//     }
// };

// const contractAddress = "0x058494E08CD9ED411025D83E7Bc94B3a8b9FFec6";

// export function ContractProvider({ children }: { children: React.ReactNode }) {
//     const [contract, setContract] = useState<ethers.Contract | null>(null);
//     const [connectedAddress, setConnectedAddress] = useState<string | null>(null);
//     const [provider, setProvider] = useState(null);
//     const [signer, setSigner] = useState(null);
//     const [connected, setConnected] = useState(false);
//     useEffect(() => {
//         console.log("Updated contract state:", contract);
//         if (signer) {
//             const contractInstance = new ethers.Contract(contractAddress, abi, signer as any);
//             setContract(contractInstance);
//             console.log("contract", contractInstance);
//         }
//     }, [signer])
//     async function connectWallet() {
//         try {
//             const web3Modal = new Web3Modal({
//                 cacheProvider: false,
//                 providerOptions,
//             });
//             const web3ModalInstance = await web3Modal.connect();
//             const web3ModalProvider = new Web3Provider(web3ModalInstance);
//             const signer = web3ModalProvider.getSigner();
//             setProvider(web3ModalProvider as any);
//             setSigner(signer as any);
//             setConnected(true);
//             setConnectedAddress(await signer.getAddress());
//             console.log("contract", contract);

//             // setContract(contract);

//             console.log(connectedAddress);
//         } catch (error) {
//             console.log(error);
//         }
//     }


//     const disconnectWallet = async () => {
//         if (setContract) {
//             setProvider(null);
//             setSigner(null);
//             setConnected(false);
//             setConnectedAddress('');
//             setContract(null);
//         }
//     }

//     return (
//         <ContractContext.Provider value={{ connectWallet, connected, connectedAddress, contract, disconnectWallet }}>
//             {children}
//         </ContractContext.Provider>
//     );
// }

// export function useContract() {
//     const context = useContext(ContractContext);
//     if (context === undefined) {
//         throw new Error('useContract must be used within a ContractProvider');
//     }
//     return context;
// }

import React, { createContext, useState, useContext, useEffect } from 'react';
import { ethers, Contract } from 'ethers';
import CoinbaseWalletSDK from '@coinbase/wallet-sdk';
import Web3Modal from 'web3modal';
import { Web3Provider } from "@ethersproject/providers";
import abi from '../abis/abi.json';

type ContractContextType = {
    contract: ethers.Contract | null;
    connectedAddress: string | null;
    connectWallet: () => Promise<void>;
    disconnectWallet: () => Promise<void>;
    connected: boolean;
};

const ContractContext = createContext<ContractContextType | undefined>(undefined);

const providerOptions = {
    walletlink: {
        package: CoinbaseWalletSDK,
        options: {
            appName: "Web3 Modal",
            infuraId: process.env.NEXT_PUBLIC_INFURA_ID,
        },
    },
};

const contractAddress = "0x058494E08CD9ED411025D83E7Bc94B3a8b9FFec6";

export function ContractProvider({ children }: { children: React.ReactNode }) {
    const [contract, setContract] = useState<ethers.Contract | null>(null);
    const [connectedAddress, setConnectedAddress] = useState<string | null>(null);
    const [provider, setProvider] = useState<any | null>(null);
    const [signer, setSigner] = useState<ethers.Signer | null>(null);
    const [connected, setConnected] = useState(false);

    useEffect(() => {
        if (signer) {
            const contractInstance = new ethers.Contract(contractAddress, abi, signer);
            setContract(contractInstance);
            console.log("Contract initialized:", contractInstance);
        }
    }, [signer]);

    async function connectWallet() {
        try {
            const web3Modal = new Web3Modal({
                cacheProvider: false,
                providerOptions,
            });
            const web3ModalInstance = await web3Modal.connect();
            const web3ModalProvider = new Web3Provider(web3ModalInstance);
            const signerInstance = web3ModalProvider.getSigner();

            setProvider(web3ModalProvider);
            setSigner(signerInstance as any);
            setConnected(true);

            const address = await signerInstance.getAddress();
            setConnectedAddress(address);
            console.log("Connected address:", address);

        } catch (error) {
            console.error("Wallet connection failed:", error);
        }
    }

    const disconnectWallet = async () => {
        setProvider(null);
        setSigner(null);
        setConnected(false);
        setConnectedAddress(null);
        setContract(null);
    };

    return (
        <ContractContext.Provider value={{ connectWallet, connected, connectedAddress, contract, disconnectWallet }}>
            {children}
        </ContractContext.Provider>
    );
}

export function useContract() {
    const context = useContext(ContractContext);
    if (context === undefined) {
        throw new Error('useContract must be used within a ContractProvider');
    }
    return context;
}
