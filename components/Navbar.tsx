import { Container, Group, Burger, Button } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import classes from './Navbar.module.css'
import { useRouter } from 'next/router'
import { useState, useEffect, Dispatch, SetStateAction } from 'react'
import Web3Modal from 'web3modal'
import { ethers } from 'ethers'
import { Web3Provider } from "@ethersproject/providers"
import { useContract } from '../contexts/ContractContext'
import CoinbaseWalletSDK from '@coinbase/wallet-sdk';

const providerOptions = {
	walletlink: {
		package: CoinbaseWalletSDK,
		options: {
			appName: "Web3 Modal",
			infuraId: process.env.NEXT_PUBLIC_INFURA_ID
		}
	}
};

type NavbarProps = {
	contract: ethers.Co
}

export default function Navbar({ contract, setContract }) {
	const [opened, { toggle }] = useDisclosure(false)
	const router = useRouter()
	const [web3Modal, setWeb3Modal] = useState<Web3Modal | null>(null)
	const [address, setAddress] = useState<string | null>(null)
	const [isConnecting, setIsConnecting] = useState(false)

	const [provider, setProvider] = useState<Web3Provider | null>(null);
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

	const connectWallet = async () => {
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
			setAddress(address); // Add this line
		} catch (error) {
			console.error("Failed to connect wallet:", error);
		}
		setLoading(false);
	}

	const disconnectWallet = async () => {
		setProvider(null);
		setSigner(null);
		setConnected(false);
		setConnectedAddress('');
		setContract(null);
	}

	return (
		<header className={classes.header}>
			<Container size="md" className={classes.inner}>
				<Button
					variant="transparent"
					color="#050038"
					onClick={() => router.push('/')}
				>
					DocuSign
				</Button>

				<Group gap={5} visibleFrom="xs">
					{connected ? (
						<div className="px-4 py-5 sm:px-6">
							<h3 className="text-lg font-medium leading-6 text-white">
								Address:{' '}
								<span>
									{connectedAddress.substring(0, 6)}...
									{connectedAddress.substring(connectedAddress.length - 4)}
								</span>
							</h3>
							<Button
								onClick={disconnectWallet}
								className="mt-8 inline-flex w-full items-center justify-center rounded-md border border-transparent bg-ganache text-white px-5 py-3 text-base font-medium sm:w-auto"
							>
								Disconnect
							</Button>
						</div>
					) : (
						<Button
							onClick={connectWallet}
							style={{ backgroundColor: '#4262FF' }}
							disabled={loading}
						>
							{loading ? 'Connecting...' : 'Connect Wallet'}
						</Button>
					)}
				</Group>
				<Burger
					opened={opened}
					onClick={toggle}
					hiddenFrom="xs"
					size="sm"
				/>
			</Container>
		</header>
	)
}