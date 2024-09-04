import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';
import { Web3Provider } from "@ethersproject/providers";
import CoinbaseWalletSDK from '@coinbase/wallet-sdk';
import { Button } from '@mantine/core';
import { Loading } from './Loading';


const providerOptions = {
	walletlink: {
		package: CoinbaseWalletSDK,
		options: {
			appName: "Web3 Modal",
			infuraId: process.env.NEXT_PUBLIC_INFURA_ID
		}
	}
};

type WalletProps = {
	contract?: ethers.Contract | null
	setContract: Dispatch<SetStateAction<ethers.Contract | null>>
}

export default function Wallet({ contract, setContract }: WalletProps) {
	const [provider, setProvider] = useState<Web3Provider | null>(null);
	// const [contract, setContract] = useState<ethers.Contract | null>(null);
	const [signer, setSigner] = useState<ethers.Signer | null>(null);
	const [connected, setConnected] = useState(false);
	const [connectedAddress, setConnectedAddress] = useState('');
	const [loading, setLoading] = useState(false);

	const contractAddress = "0x058494E08CD9ED411025D83E7Bc94B3a8b9FFec6";

	useEffect(() => {
		if (signer && contractAddress) {
			import('../abis/abi.json').then((abiModule) => {
				const Contract = new ethers.Contract(contractAddress, abiModule.default, signer);
				setContract(Contract);
			});
		}
	}, [signer]);

	useEffect(() => {
		console.log("Updated contract state:", contract);
	}, [contract]);

	const handleConnect = async () => {
		setLoading(true);
		try {
			const web3Modal = new Web3Modal({
				cacheProvider: false,
				providerOptions,
			});
			const web3ModalInstance = await web3Modal.connect();
			const web3ModalProvider = new Web3Provider(web3ModalInstance);
			const signer = web3ModalProvider.getSigner();
			setProvider(web3ModalProvider);
			setSigner(signer as any);
			setConnected(true);
			const address = await signer.getAddress();
			setConnectedAddress(address);
		} catch (error) {
			console.log(error);
		}
		setLoading(false);
	}

	const handleDisconnect = async () => {
		setProvider(null);
		setSigner(null);
		setConnected(false);
		setConnectedAddress('');
		setContract(null);
	}

	return (
		<>
			{connected && connectedAddress && (
				<div className="px-4 py-5 sm:px-6">
					<h3 className="text-lg font-medium leading-6 text-white">
						Address:{' '}
						<span>
							{connectedAddress.substring(0, 6)}...
							{connectedAddress.substring(connectedAddress.length - 4)}
						</span>
					</h3>
				</div>
			)}

			{!connected && (
				<Button
					onClick={handleConnect}
					style={{ backgroundColor: '#4262FF' }}
				>
					{loading ? <Loading /> : 'Connect Wallet'}
				</Button>
			)}

			{connected && (
				<div className="flex w-full justify-center space-x-2">
					<Button
						onClick={handleDisconnect}
						className="mt-8 inline-flex w-full items-center justify-center rounded-md border border-transparent bg-ganache text-white px-5 py-3 text-base font-medium sm:w-auto"
					>
						Disconnect
					</Button>
				</div>
			)}
		</>
	)
}