import { Container, Group, Burger, Button } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import classes from './Navbar.module.css'
import { useRouter } from 'next/router'
import Wallet from '../components/Wallet'
import { useMetamask } from '../hooks/useMetamask'
import { useListen } from '../hooks/useListen'
import { useEffect } from 'react'

export default function Navbar() {
	const [opened, { toggle }] = useDisclosure(false)
	const router = useRouter()
	const { dispatch } = useMetamask()
	const listen = useListen()

	useEffect(() => {
		if (typeof window !== undefined) {
			// start by checking if window.ethereum is present, indicating a wallet extension
			const ethereumProviderInjected =
				typeof window.ethereum !== 'undefined'
			// this could be other wallets so we can verify if we are dealing with metamask
			// using the boolean constructor to be explecit and not let this be used as a falsy value (optional)
			const isMetamaskInstalled =
				ethereumProviderInjected && Boolean(window.ethereum.isMetaMask)

			const local = window.localStorage.getItem('metamaskState')

			// user was previously connected, start listening to MM
			if (local) {
				listen()
			}

			// local could be null if not present in LocalStorage
			const { wallet, balance } = local
				? JSON.parse(local)
				: // backup if local storage is empty
				  { wallet: null, balance: null }

			dispatch({
				type: 'pageLoaded',
				isMetamaskInstalled,
				wallet,
				balance,
			})
		}
	}, [])

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
					<Wallet />
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
