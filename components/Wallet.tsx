import Link from 'next/link'
import { useListen } from '../hooks/useListen'
import { useMetamask } from '../hooks/useMetamask'
import { Loading } from './Loading'
import { Button } from '@mantine/core'

export default function Wallet() {
	const {
		dispatch,
		state: { status, isMetamaskInstalled, wallet, balance },
	} = useMetamask()
	const listen = useListen()

	const showInstallMetamask =
		status !== 'pageNotLoaded' && !isMetamaskInstalled
	const showConnectButton =
		status !== 'pageNotLoaded' && isMetamaskInstalled && !wallet

	const isConnected = status !== 'pageNotLoaded' && typeof wallet === 'string'

	const handleConnect = async () => {
		dispatch({ type: 'loading' })
		const accounts = await window.ethereum.request({
			method: 'eth_requestAccounts',
		})

		if (accounts.length > 0) {
			const balance = await window.ethereum!.request({
				method: 'eth_getBalance',
				params: [accounts[0], 'latest'],
			})
			dispatch({ type: 'connect', wallet: accounts[0], balance })

			// we can register an event listener for changes to the users wallet
			listen()
		}
	}

	const handleDisconnect = () => {
		dispatch({ type: 'disconnect' })
	}

	const handleAddUsdc = async () => {
		dispatch({ type: 'loading' })

		await window.ethereum.request({
			method: 'wallet_watchAsset',
			params: {
				type: 'ERC20',
				options: {
					address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
					symbol: 'USDC',
					decimals: 18,
					image: 'https://cryptologos.cc/logos/usd-coin-usdc-logo.svg?v=023',
				},
			},
		})
		dispatch({ type: 'idle' })
	}

	return (
		<>
			{wallet && balance && (
				<div className="px-4 py-5 sm:px-6">
					<h3 className="text-lg font-medium leading-6 text-white">
						Address:{' '}
						<span>
							{wallet.substring(0, 6)}...
							{wallet.substring(wallet.length - 4)}
						</span>
					</h3>
				</div>
			)}

			{showConnectButton && (
				<Button
					onClick={handleConnect}
					style={{ backgroundColor: '#4262FF' }}
				>
					{status === 'loading' ? <Loading /> : 'Connect Wallet'}
				</Button>
			)}

			{isConnected && (
				<div className="flex w-full justify-center space-x-2">
					<Button
						onClick={handleDisconnect}
						className="mt-8 inline-flex w-full items-center justify-center rounded-md border border-transparent bg-ganache text-white px-5 py-3 text-base font-medium  sm:w-auto"
					>
						Disconnect
					</Button>
				</div>
			)}
		</>
	)
}
