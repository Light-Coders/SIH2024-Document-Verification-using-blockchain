import React, { createContext, useState, useContext } from 'react';
import { ethers } from 'ethers';

type ContractContextType = {
    contract: ethers.Contract | null;
    setContract: React.Dispatch<React.SetStateAction<ethers.Contract | null>>;
    connectedAddress: string | null;
    setConnectedAddress: React.Dispatch<React.SetStateAction<string | null>>;
};

const ContractContext = createContext<ContractContextType | undefined>(undefined);

export function ContractProvider({ children }: { children: React.ReactNode }) {
    const [contract, setContract] = useState<ethers.Contract | null>(null);
    const [connectedAddress, setConnectedAddress] = useState<string | null>(null);

    return (
        <ContractContext.Provider value={{ contract, setContract, connectedAddress, setConnectedAddress }}>
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