import { Container, Group, Burger, Button } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import classes from './Navbar.module.css'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Web3Modal from 'web3modal'
import { ethers } from 'ethers'
import { Web3Provider } from "@ethersproject/providers"
import { useContract } from '../contexts/ContractContext'

const providerOptions = {
	// Add any additional wallet options here
}

export default function Navbar() {
	const [opened, { toggle }] = useDisclosure(false)
	const router = useRouter()
	const [web3Modal, setWeb3Modal] = useState<Web3Modal | null>(null)
	const [address, setAddress] = useState<string | null>(null)
	const [isConnecting, setIsConnecting] = useState(false)
	const { setContract } = useContract()

	useEffect(() => {
		const modal = new Web3Modal({
			network: "mainnet", // or your preferred network
			cacheProvider: true,
			providerOptions
		})
		setWeb3Modal(modal)
	}, [])

	const connectWallet = async () => {
		if (!web3Modal) return
		setIsConnecting(true)
		try {
			const instance = await web3Modal.connect()
			const provider = new Web3Provider(instance)
			const signer = provider.getSigner()
			const address = await signer.getAddress()
			setAddress(address)

			// Set up contract here if needed
			// const contractAddress = "YOUR_CONTRACT_ADDRESS"
			// const abi = // Your contract ABI
			// const contract = new ethers.Contract(contractAddress, abi, signer)
			// setContract(contract)
		} catch (error) {
			console.error(error)
		}
		setIsConnecting(false)
	}

	const disconnectWallet = async () => {
		if (!web3Modal) return
		await web3Modal.clearCachedProvider()
		setAddress(null)
		setContract(null)
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
					{address ? (
						<div className="px-4 py-5 sm:px-6">
							<h3 className="text-lg font-medium leading-6 text-white">
								Address:{' '}
								<span>
									{address.substring(0, 6)}...
									{address.substring(address.length - 4)}
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
							disabled={isConnecting}
						>
							{isConnecting ? 'Connecting...' : 'Connect Wallet'}
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