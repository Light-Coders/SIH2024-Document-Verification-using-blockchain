import { Container, TextInput } from '@mantine/core'
import React, { useState } from 'react'
import { IconCurrencyEthereum } from '@tabler/icons-react'
import Navbar from '../components/Navbar'
import FileDrop from '../components/FileDrop'

const Page = () => {
	const [value, setValue] = useState('')
	return (
		<>
			<Navbar />
			<Container>
				<FileDrop />
				<TextInput
					label="Document Owner ETH Address"
					radius="md"
					withAsterisk
					leftSection={<IconCurrencyEthereum />}
					value={value}
					labelProps={{
						style: {
							paddingBottom: 15,
							color: '#676767',
							fontWeight: 600,
						},
					}}
					onChange={(event) => setValue(event.currentTarget.value)}
				/>
			</Container>
		</>
	)
}

export default Page
