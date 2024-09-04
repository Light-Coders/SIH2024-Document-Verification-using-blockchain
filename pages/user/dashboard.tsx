import { Button, Container, Group } from '@mantine/core'
import { useRouter } from 'next/navigation'
import React from 'react'
import Navbar from '../../components/Navbar'
import CardComponent from '../../components/CardComponent'

const Page = () => {
	const router = useRouter()
	return (
		<>
			<Navbar />
			<Container>
				<Group gap="xs" style={{ paddingBottom: '2rem' }}>
					<Button radius="lg" variant="filled">
						My Documents
					</Button>
					<Button
						radius="lg"
						variant="outline"
						onClick={() => router.push('/user/verify')}
					>
						Verify Documents
					</Button>
				</Group>
				<CardComponent
					documentName="Aadhaar Card"
					documentIssuer="UIDAI"
					ethAddress="asdfadf"
					documentHolder="Akshat Patil"
				/>
			</Container>
		</>
	)
}

export default Page
