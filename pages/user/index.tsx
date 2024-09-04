import { Button, Container, Group, TextInput } from '@mantine/core'
import React, { useState } from 'react'
import classes from './user.module.css'
import Navbar from '../../components/Navbar'

const Page = () => {
	const [value, setValue] = useState('')
	return (
		<div className={classes.background}>
			<Navbar />
			<Container style={{ paddingTop: '2rem' }}>
				<TextInput
					label="Document Owner ETH Address"
					radius="md"
					withAsterisk
					size="lg"
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
				<Group justify="center" mt="md">
					<Button
						style={{
							backgroundColor: '#050038',
							textAlign: 'center',
						}}
						radius="xl"
						size="lg"
					>
						LOGIN
					</Button>
				</Group>
			</Container>
		</div>
	)
}

export default Page
