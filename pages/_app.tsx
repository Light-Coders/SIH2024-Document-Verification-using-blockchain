import '../styles/globals.css'
import '@mantine/core/styles.css'

import type { AppProps } from 'next/app'
import { MetamaskProvider } from '../hooks/useMetamask'
import { MantineProvider } from '@mantine/core'

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<MantineProvider>
			<MetamaskProvider>
				<Component {...pageProps} />
			</MetamaskProvider>
		</MantineProvider>
	)
}

export default MyApp
