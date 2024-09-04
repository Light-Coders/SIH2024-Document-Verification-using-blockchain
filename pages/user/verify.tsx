'use client'
import { Button, Container, Group } from '@mantine/core'
import Navbar from '../../components/Navbar'
import FileDrop from '../../components/FileDrop'

const Page = () => {
	return (
		<>
			<Navbar />
			<Container>
				<FileDrop />
				<Group justify="center" mt="md">
					<Button
						style={{
							backgroundColor: '#4262FF',
							textAlign: 'center',
							marginTop: '2rem',
						}}
					>
						VERIFY DOCUMENTS
					</Button>
				</Group>
			</Container>
		</>
	)
}

export default Page
