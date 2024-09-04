import '../styles/globals.css'
import '@mantine/core/styles.css'
import { ContractProvider } from '../contexts/ContractContext';

import type { AppProps } from 'next/app'
import { MetamaskProvider } from '../hooks/useMetamask'
import { MantineProvider } from '@mantine/core'

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<MantineProvider>
			<ContractProvider>
				<Component {...pageProps} />
			</ContractProvider>
		</MantineProvider>
	)
}

export default MyApp
